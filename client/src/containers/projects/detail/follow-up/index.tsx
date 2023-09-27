"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import FollowUpForm from "@/containers/projects/detail/forms/follow-up";

export default function ProjectsDetailFollowUpIdPriorization() {
  const { id, priorizationId } = useParams();

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
      if (priorizationId === "more-research") {
        return RISKS_VALUES[`${item?.id}`]?.contextual_risk === priorizationId;
      }
      return RISKS_VALUES[`${item?.id}`]?.proyect_risk_priorization === priorizationId;
    });
  }, [contextualRisksData, priorizationId, projectIdData]);

  return (
    <>
      {ITEMS.map((item) => {
        if (!item?.id) return null;

        return (
          <div key={item.id}>
            <FollowUpForm {...item} />
          </div>
        );
      })}
    </>
  );
}
