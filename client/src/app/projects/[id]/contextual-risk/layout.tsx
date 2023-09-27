import { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import { getGetContextualRisksQueryOptions } from "@/types/generated/contextual-risk";
import {
  getContextualRiskCategories,
  getGetContextualRiskCategoriesIdQueryOptions,
} from "@/types/generated/contextual-risk-category";

import getQueryClient from "@/app/getQueryClient";
import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ContextualRiskSidebar from "@/containers/projects/detail/sidebar/contextual-risk";
import Sidebar from "@/containers/sidebar";

interface ProjectsDetailContextualRiskLayoutProps
  extends ProjectsDetailPageProps,
    PropsWithChildren {}

export async function generateMetadata({ params }: ProjectsDetailPageProps): Promise<Metadata> {
  return {
    title: `Project ${params.id} | ContextualRisk | Human Rights Tool`,
    description: "Generated by create next app",
  };
}

export default async function ProjectsDetailContextualRiskLayout({
  children,
}: ProjectsDetailContextualRiskLayoutProps) {
  const CATEGORIES = await getContextualRiskCategories({
    sort: "display_order:asc",
  });

  // prefetch category id data
  const queryClient = getQueryClient();

  for (const c of CATEGORIES?.data ?? []) {
    if (!c.id) return;
    await queryClient.prefetchQuery(getGetContextualRiskCategoriesIdQueryOptions(c.id));
    await queryClient.prefetchQuery(
      getGetContextualRisksQueryOptions({
        filters: {
          contextual_risk_category: c.id,
        },
        populate: "*",
      }),
    );
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <section className="flex grow flex-col space-y-5">
        <div className="grid grid-cols-12 gap-20">
          <div className="col-span-4">
            <Sidebar>
              <ContextualRiskSidebar />
            </Sidebar>
          </div>
          <div className="col-span-8">{children}</div>
        </div>
      </section>
    </Hydrate>
  );
}
