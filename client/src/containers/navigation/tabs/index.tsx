"use client";

import { useParams } from "next/navigation";

import { getProgress } from "@/lib/status";
import { cn } from "@/lib/utils";

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
    label: "Project and Community Background",
    slug: "pcb",
  },
  {
    href: "/contextual-risk",
    label: "Contextual Risk",
    slug: "contextual-risk",
  },
  {
    href: "/project-risk",
    label: "Project Risk",
    slug: "project-risk",
  },
  {
    href: "/follow-up",
    label: "Follow Up",
    slug: "follow-up",
  },
];

const GROUPS = [
  {
    label: "1. Research phase",
    slug: "research-phase",
    className: "col-span-3",
  },
  {
    label: "2. Screening Phase",
    slug: "screening-phase",
    className: "col-span-6",
  },
  {
    label: "3. Follow Up Phase",
    slug: "follow-up-phase",
    className: "col-span-3",
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
    <div className="space-y-2.5">
      <ul className="relative grid w-full grid-cols-12 gap-10">
        {GROUPS.map(({ label, slug, className }) => (
          <li
            className={cn({
              "relative w-full text-center text-xs": true,
              [`${className}`]: true,
            })}
            key={slug}
          >
            <div
              className={cn({
                "absolute left-0 top-1/2 z-0 h-0.5 w-full -translate-y-1/2 border-none": true,
                "z-10 before:absolute before:left-0 before:top-0 before:h-2 before:w-0.5 before:bg-[#222]":
                  true,
                "z-10 after:absolute after:right-0 after:top-0 after:h-2 after:w-0.5 after:bg-[#222]":
                  true,
              })}
              style={{
                background:
                  "linear-gradient(90deg, transparent, transparent 50%, #fff 50%, #fff 100%), linear-gradient(90deg, #222, #222, #222, #222, #222)",
                backgroundSize: "10px 1px, 100% 1px",
              }}
            />
            <span className="relative z-10 inline-block bg-white px-2">{label}</span>
          </li>
        ))}
      </ul>

      <ul className="relative grid w-full grid-cols-12 gap-10">
        <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-slate-500" />
        {LINKS.map(({ href, label, slug }) => (
          <li className="relative z-10 col-span-3" key={href}>
            <div className="absolute left-0 top-0 z-0 h-full w-full bg-white" />
            <TabsNavigationItem
              href={`/projects/${id}${href}`}
              className="relative z-10"
              slug={slug}
              progress={progress}
            >
              <span className="flex space-x-1">
                <span>{label}</span>{" "}
                <span className="absolute bottom-1.5 right-1.5 text-[10px] leading-none opacity-75">
                  {format(progress[`${slug}`])}
                </span>
              </span>
            </TabsNavigationItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
