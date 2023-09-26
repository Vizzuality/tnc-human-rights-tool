"use client";
import { useParams } from "next/navigation";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetContextualRiskCategoriesId } from "@/types/generated/contextual-risk-category";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface ContextualRiskSidebarItemProps {
  categoryId: number;
}

export default function ContextualRiskSidebarItem({ categoryId }: ContextualRiskSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: ctxData } = useGetContextualRisks({
    filters: {
      contextual_risk_category: categoryId,
    },
    populate: "*",
  });
  const { data: categoriesIdData } = useGetContextualRiskCategoriesId(categoryId);
  const { attributes } = categoriesIdData?.data ?? {};

  const slug = attributes?.slug ?? "";
  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};

  const ctxIds = ctxData?.data?.map((item) => item?.id) ?? [];

  const total = ctxIds.length;
  const completed = ctxIds.filter((i) => !!CR_DATA[`${i}`]).length;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
