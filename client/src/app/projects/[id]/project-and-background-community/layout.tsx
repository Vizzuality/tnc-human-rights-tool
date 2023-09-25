import { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import {
  getGetPcbCategoriesIdQueryOptions,
  getPcbCategories,
} from "@/types/generated/pcb-category";

import getQueryClient from "@/app/getQueryClient";
import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import NavigationSidebar, { NavigationSidebarProps } from "@/containers/navigation/sidebar";
import PCBSidebarItem from "@/containers/projects/detail/sidebar/pcb-item";
import Sidebar from "@/containers/sidebar";

interface ProjectsDetailPCBLayoutProps extends ProjectsDetailPageProps, PropsWithChildren {}

export async function generateMetadata({ params }: ProjectsDetailPageProps): Promise<Metadata> {
  return {
    title: `Project ${params.id} | PCB | Human Rights Tool`,
    description: "Generated by create next app",
  };
}

export default async function ProjectsDetailPCBLayout({
  children,
  params,
}: ProjectsDetailPCBLayoutProps) {
  const { id } = params;

  const CATEGORIES = await getPcbCategories();

  // prefetch category id data
  const queryClient = getQueryClient();

  for (const c of CATEGORIES?.data ?? []) {
    if (!c.id) return;
    await queryClient.prefetchQuery(getGetPcbCategoriesIdQueryOptions(c.id));
  }

  const dehydratedState = dehydrate(queryClient);

  const items = [
    {
      href: `/projects/${id}/project-and-background-community`,
      label: "Overview",
      children: <span className="text-lg">Overview</span>,
    },
    ...(CATEGORIES?.data || [])
      ?.sort((a, b) => {
        if (a?.attributes?.display_order && b?.attributes?.display_order) {
          return +a.attributes.display_order - +b.attributes.display_order;
        }

        return 0;
      })
      ?.map(({ id: categoryId, attributes }) => {
        return {
          href: `/projects/${id}/project-and-background-community/${categoryId}`,
          label: attributes?.title ?? "",
          children: (
            <>
              {typeof categoryId !== "undefined" && <PCBSidebarItem categoryId={categoryId} />}

              <span>{attributes?.title}</span>
            </>
          ),
        };
      }),
  ] satisfies NavigationSidebarProps["items"];

  return (
    <Hydrate state={dehydratedState}>
      <section className="flex grow flex-col space-y-5">
        <div className="grid grid-cols-12 gap-20">
          <div className="col-span-4">
            <Sidebar>
              <NavigationSidebar items={items} />
            </Sidebar>
          </div>
          <div className="col-span-8">{children}</div>
        </div>
      </section>
    </Hydrate>
  );
}
