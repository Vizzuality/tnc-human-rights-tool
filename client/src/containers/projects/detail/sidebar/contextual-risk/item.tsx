"use client";
import { useParams } from "next/navigation";

import { useLocale } from "next-intl";

import { useGetBySlug } from "@/lib/locallizedQuery";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { ContextualRiskCategoryResponse } from "@/types/generated/strapi.schemas";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface ContextualRiskSidebarItemProps {
  categorySlug?: string;
}

export default function ContextualRiskSidebarItem({
  categorySlug,
}: ContextualRiskSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const locale = useLocale();
  const { data: ctxData } = useGetContextualRisks({
    filters: {
      contextual_risk_category: {
        slug: categorySlug,
      },
    },
    populate: "*",
  });

  const { data: categoriesIdData } = useGetBySlug<ContextualRiskCategoryResponse>(
    `contextual-risk-category/${categorySlug}`,
    { locale },
  );

  const { attributes } = categoriesIdData?.data ?? {};

  const slug = attributes?.slug ?? "";
  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};

  const ctxIds = ctxData?.data?.map((item) => item?.id) ?? [];

  const total = ctxIds.length;
  const completed = ctxIds.filter((i) => !!CR_DATA[`${i}`]?.contextual_risk).length;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
