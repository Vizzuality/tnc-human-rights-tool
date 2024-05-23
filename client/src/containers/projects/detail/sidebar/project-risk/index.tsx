"use client";

import { useParams } from "next/navigation";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import NavigationSidebar from "@/containers/navigation/sidebar";
import ProjectRiskSidebarItem from "@/containers/projects/detail/sidebar/project-risk/item";

export default function ProjectRiskSidebar() {
  const { id } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);

  const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;

  const { data: contextualRisksData } = useGetContextualRisks({
    populate: "*",
    "pagination[limit]": 300,
    sort: "contextual_risk_category.display_order:asc,display_order:asc",
  });

  const items = [
    {
      href: `/projects/${id}/project-risk`,
      label: "Overview",
      className: "text-lg",
      children: <span className="text-lg">Overview</span>,
    },
    // Just testing
    ...(contextualRisksData?.data || [])
      ?.filter((item) => {
        const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
          return { ...acc, ...item };
        }, {});

        return RISKS_VALUES[`${item?.id}`]?.contextual_risk === "yes";
      })
      ?.map((item) => {
        return {
          href: `/projects/${id}/project-risk/${item.id}`,
          label: item.attributes?.title ?? "",
          children: (
            <>
              {typeof item.id !== "undefined" && <ProjectRiskSidebarItem {...item} />}

              <span>
                {item.attributes?.contextual_risk_category?.data?.attributes?.display_order}.
                {item.attributes?.display_order} {item.attributes?.title}
              </span>
            </>
          ),
        };
      }),
  ];

  return <NavigationSidebar items={items} />;
}
