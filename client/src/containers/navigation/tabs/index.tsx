"use client";

import { useParams } from "next/navigation";

import { getProgress } from "@/lib/status";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";
import { PCBs, Risks } from "@/types/project";

import TabsNavigationItem from "@/containers/navigation/tabs/item";

const LINKS: {
  href: string;
  label: string;
  slug: "pcb" | "contextual-risk" | "project-risk" | "follow-up";
}[] = [
  {
    href: "/project-and-background-community",
    label: "1. Project and Community Background",
    slug: "pcb",
  },
  {
    href: "/contextual-risk",
    label: "2. Contextual Risk",
    slug: "contextual-risk",
  },
  {
    href: "/project-risk",
    label: "3. Project Risk",
    slug: "project-risk",
  },
  {
    href: "/follow-up",
    label: "4. Follow Up",
    slug: "follow-up",
  },
];

export default function NavigationTabs() {
  const { id } = useParams();
  const { data: pcbCategoriesData } = useGetPcbCategories({
    sort: "display_order:asc",
  });
  const { data: contextualRiskCategoriesData } = useGetContextualRiskCategories({
    sort: "display_order:asc",
  });
  const { data: projectData } = useGetProjectsId(+id);

  const progress = getProgress({
    risks: projectData?.data?.attributes?.risks as Risks,
    pcbs: projectData?.data?.attributes?.pcbs as PCBs,
    pcbCategories: pcbCategoriesData?.data,
    contextualRiskCategories: contextualRiskCategoriesData?.data,
  });

  const { format } = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  });

  return (
    <ul className="relative flex justify-between">
      <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-slate-500" />
      {LINKS.map(({ href, label, slug }) => (
        <li className="relative z-10" key={href}>
          <div className="absolute left-0 top-0 z-0 h-full w-full bg-white" />
          <TabsNavigationItem href={`/projects/${id}${href}`} className="relative z-10">
            <span className="flex space-x-1">
              <span>{label}</span>{" "}
              <span className="text-xs opacity-75">({format(progress[`${slug}`])})</span>
            </span>
          </TabsNavigationItem>
        </li>
      ))}
    </ul>
  );
}
