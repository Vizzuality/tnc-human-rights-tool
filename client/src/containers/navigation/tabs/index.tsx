"use client";
import { useMemo } from "react";

import { useParams } from "next/navigation";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";
import { PCBs, Risks } from "@/types/project";

import TabsNavigationItem from "@/containers/navigation/tabs/item";

const LINKS = [
  {
    href: "/project-and-background-community",
    label: "1. Project and Background Community",
  },
  {
    href: "/contextual-risk",
    label: "2. Contextual Risk",
  },
  {
    href: "/project-risk",
    label: "3. Project Risk",
  },
  {
    href: "/follow-up",
    label: "4. Follow Up",
  },
];

export default function NavigationTabs() {
  const { id } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: pcbCategoriesData } = useGetPcbCategories({
    sort: "display_order:asc",
  });
  const { data: contextualRiskCategoriesData } = useGetContextualRiskCategories({
    sort: "display_order:asc",
  });

  const state = useMemo(() => {
    if (!projectIdData || !pcbCategoriesData || !contextualRiskCategoriesData) return 1;

    const PCBcompleted = pcbCategoriesData.data?.every((pcbCategory) => {
      const slug = pcbCategory.attributes?.slug;

      if (!slug) return false;

      const PCBS = (projectIdData?.data?.attributes?.pcbs ?? {}) as PCBs;
      return !!PCBS[slug];
    });

    const contextualRiskCompleted = contextualRiskCategoriesData.data?.every(
      (contextualRiskCategory) => {
        const slug = contextualRiskCategory.attributes?.slug;

        if (!slug) return false;

        const contextualRisks = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
        return !!contextualRisks[slug];
      },
    );

    if (!PCBcompleted) return 1;

    if (PCBcompleted && !contextualRiskCompleted) return 2;

    if (PCBcompleted && contextualRiskCompleted) return 3;

    return 1;
  }, [projectIdData, pcbCategoriesData, contextualRiskCategoriesData]);

  return (
    <ul className="relative flex justify-between">
      <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-slate-500" />
      {LINKS.map(({ href, label }, i) => (
        <li className="relative z-10" key={href}>
          <div className="absolute left-0 top-0 z-0 h-full w-full bg-white" />
          <TabsNavigationItem
            href={`/projects/${id}${href}`}
            disabled={i >= state}
            className="relative z-10"
          >
            {label}
          </TabsNavigationItem>
        </li>
      ))}
    </ul>
  );
}
