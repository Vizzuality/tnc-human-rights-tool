import { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import NavigationSidebar from "@/containers/navigation/sidebar";
import NavigationCircle from "@/containers/navigation/sidebar/circle";
import Sidebar from "@/containers/sidebar";

import { getContextualRiskCategories } from "@/data/contextual-risk/categories";

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
  params,
}: ProjectsDetailContextualRiskLayoutProps) {
  const { id } = params;

  const CATEGORIES = await getContextualRiskCategories();

  const items = [
    {
      href: `/projects/${id}/contextual-risk`,
      label: "Overview",
      className: "text-lg",
      children: <span className="text-lg">Overview</span>,
    },
    ...CATEGORIES.data.map(({ id: categoryId, title }) => {
      const percentage = Math.random();

      return {
        href: `/projects/${id}/contextual-risk/${categoryId}`,
        label: title,
        children: (
          <>
            <span>{title}</span>
            {/* Draw a svg circle that I can control how much of the path is filled */}
            <NavigationCircle percentage={percentage} />
          </>
        ),
      };
    }),
  ];

  return (
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
  );
}
