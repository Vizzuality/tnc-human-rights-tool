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

  return (
    <PDFViewer
      filename={`${projectIdData?.data?.attributes?.name ?? "project"}-report.pdf`}
      url={
        typeof window !== "undefined"
          ? `${window?.location.origin}${window?.location.pathname}?format=pdf`
          : ""
      }
    >
      <div className="prose">
        <header>
          <h1>{projectIdData?.data?.attributes?.name}</h1>
          <p>{projectIdData?.data?.attributes?.description}</p>
        </header>
        <div className="mt-10">
          {PRIORIZATIONS.map((priorization) => {
            return (
              <div
                key={priorization.value}
                className="break-after-page pb-8 last-of-type:break-after-avoid last-of-type:pb-0"
              >
                <h2 className="text-2xl">{priorization.label}</h2>
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
