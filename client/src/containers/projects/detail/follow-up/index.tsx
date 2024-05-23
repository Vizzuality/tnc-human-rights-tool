"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import FollowUpForm from "@/containers/projects/detail/forms/follow-up";

export default function ProjectsDetailFollowUpIdPriorization() {
  const { id, priorizationId } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);

  const queryContextualRisksData = useGetContextualRisks({
    populate: "*",
    sort: "contextual_risk_category.display_order:asc,display_order:asc",
    locale: "all",
    "pagination[limit]": 300,
  });

  const { data: contextualRisksData } = useGetLocalizedList(queryContextualRisksData);

  const ITEMS = useMemo(() => {
    const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;

    const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
      return { ...acc, ...item };
    }, {});

    return (contextualRisksData?.data ?? [])?.filter((item) => {
      if (priorizationId === "more-research") {
        return RISKS_VALUES[`${item?.id}`]?.contextual_risk === priorizationId;
      }
      return RISKS_VALUES[`${item?.id}`]?.proyect_risk_priorization === priorizationId;
    });
  }, [contextualRisksData, priorizationId, projectIdData]);

  return (
    <div className="divide-y">
      {ITEMS.map((item) => {
        if (!item?.id) return null;

        return (
          <div key={item.id} className="pb-8 pt-10 first-of-type:pt-0">
            <FollowUpForm {...item} />
          </div>
        );
      })}
    </div>
  );
}
