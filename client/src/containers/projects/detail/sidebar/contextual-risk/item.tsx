"use client";
import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { ContextualRiskCategory } from "@/types/generated/strapi.schemas";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

export default function ContextualRiskSidebarItem({ slug = "" }: ContextualRiskCategory) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const queryContextualRisks = useGetContextualRisks({
    filters: {
      contextual_risk_category: {
        slug: slug,
      },
    },
    populate: "*",
    locale: "all",
  });

  const { data: ctxData } = useGetLocalizedList(queryContextualRisks);

  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};

  const ctxIds = ctxData?.data?.map((item) => item?.id) ?? [];

  const total = ctxIds.length;
  const completed = ctxIds.filter((i) => !!CR_DATA[`${i}`]?.contextual_risk).length;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
