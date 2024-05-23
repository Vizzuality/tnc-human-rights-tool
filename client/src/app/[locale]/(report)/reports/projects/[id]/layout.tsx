import { PropsWithChildren } from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/lib/getQueryClient";

import { getGetContextualRisksQueryOptions } from "@/types/generated/contextual-risk";
import { getGetContextualRiskCategoriesQueryOptions } from "@/types/generated/contextual-risk-category";
import { getGetPcbCategoriesQueryOptions } from "@/types/generated/pcb-category";
import { getGetProjectsIdQueryOptions } from "@/types/generated/project";

interface ReportsProjectsIdLayoutProps extends PropsWithChildren {
  params: {
    id: string;
  };
}

export default async function ReportsProjectsIdLayout({
  children,
  params,
}: ReportsProjectsIdLayoutProps) {
  const { id } = params;

  // Prefetch useGetProjectsId
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...getGetProjectsIdQueryOptions(+id),
  });

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
