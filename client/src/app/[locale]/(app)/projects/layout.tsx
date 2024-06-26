import { PropsWithChildren } from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/lib/getQueryClient";

import { getGetContextualRisksQueryOptions } from "@/types/generated/contextual-risk";
import { getGetContextualRiskCategoriesQueryOptions } from "@/types/generated/contextual-risk-category";
import { getGetPcbCategoriesQueryOptions } from "@/types/generated/pcb-category";

interface ProjectsLayoutProps extends PropsWithChildren {}

export default async function ProjectsLayout({ children }: ProjectsLayoutProps) {
  // Prefetch useGetProjectsId
  const queryClient = getQueryClient();

  // Prefetch useGetContextualRisksCategories
  await queryClient.prefetchQuery({
    ...getGetContextualRiskCategoriesQueryOptions({
      sort: "display_order:asc",
      locale: "all",
    }),
  });

  // Prefetch useGetPCBsCategories
  await queryClient.prefetchQuery({
    ...getGetPcbCategoriesQueryOptions({
      sort: "display_order:asc",
      locale: "all",
    }),
  });

  // Prefetch useGetContextualRisks
  await queryClient.prefetchQuery({
    ...getGetContextualRisksQueryOptions({
      populate: "*",
      sort: "contextual_risk_category.display_order:asc,display_order:asc",
      locale: "all",
      "pagination[limit]": 300,
    }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
