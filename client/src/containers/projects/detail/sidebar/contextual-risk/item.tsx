"use client";
import { useParams } from "next/navigation";

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
  const { data: categoriesIdData } = useGetContextualRiskCategoriesId(categoryId);
  const { attributes } = categoriesIdData?.data ?? {};

  const slug = attributes?.slug ?? "";
  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};
  const CRS_VALUES = Object.values(CR_DATA);

  const total = CRS_VALUES.length;
  const completed = CRS_VALUES.filter((value) => !!value).length;

  const percentage = !CRS_VALUES.length ? 0 : total / completed;

  return <NavigationCircle percentage={percentage} />;
}
