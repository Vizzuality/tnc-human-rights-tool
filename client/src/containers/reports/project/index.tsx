"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import PDFViewer from "@/containers/pdf-viewer";
import ReportsProjectIdItem from "@/containers/reports/project/item";

import { PRIORIZATIONS } from "@/constants";

export default function ReportsProjectId() {
  const { id } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);

  const { data: contextualRisksData } = useGetContextualRisks({
    populate: "*",
    "pagination[limit]": 100,
    sort: "contextual_risk_category.display_order:asc,display_order:asc",
  });

  const ITEMS = useMemo(() => {
    const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;

    const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

    return (contextualRisksData?.data ?? [])?.filter((item) => {
      return (
        PRIORIZATIONS.map((p) => p.value).includes(
          RISKS_VALUES[`${item?.id}`]?.proyect_risk_priorization,
        ) ||
        PRIORIZATIONS.map((p) => p.value).includes(RISKS_VALUES[`${item?.id}`]?.contextual_risk)
      );
    });
  }, [contextualRisksData, projectIdData]);

  const GROUPS = useMemo(() => {
    const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;

    const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

    // group by proyect_risk_priorization
    return ITEMS.reduce(
      (acc, item) => {
        const proyect_risk_priorization =
          RISKS_VALUES[`${item?.id}`]?.proyect_risk_priorization ?? "more-research";

        return {
          ...acc,
          [proyect_risk_priorization]: [...(acc[`${proyect_risk_priorization}`] ?? []), item],
        };
      },
      {} as Record<string, typeof ITEMS>,
    );
  }, [ITEMS, projectIdData]);

  const NO_DATA = useMemo(() => {
    return PRIORIZATIONS.every((priorization) => {
      return !GROUPS[priorization.value]?.length;
    });
  }, [GROUPS]);

  return (
    <PDFViewer filename={`${projectIdData?.data?.attributes?.name ?? "project"}-report.pdf`}>
      <div className="prose">
        <header>
          <h1>{projectIdData?.data?.attributes?.name}</h1>
          <p>{projectIdData?.data?.attributes?.description}</p>
        </header>
        <div className="mt-10">
          {!!NO_DATA && (
            <div className="prose">
              <h2>No data</h2>
              <p>
                Only contextual risks with a prioritization are shown. Please, go to the project
                detail page and add a prioritization to the contextual risks in the project risk
                section.
              </p>
            </div>
          )}

          {!NO_DATA &&
            PRIORIZATIONS.map((priorization) => {
              if (!GROUPS[priorization.value]?.length) return null;

              return (
                <div
                  key={priorization.value}
                  className="break-after-page pb-8 last-of-type:break-after-avoid last-of-type:pb-0"
                >
                  <h2>{priorization.label}</h2>
                  <div className="mt-8 divide-y">
                    {GROUPS[priorization.value]?.map((item) => {
                      if (!item?.id) return null;

                      return (
                        <div
                          key={item.id}
                          className="pb-10 pt-10 first-of-type:pt-0 last-of-type:pb-0"
                        >
                          <ReportsProjectIdItem {...item} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </PDFViewer>
  );
}
