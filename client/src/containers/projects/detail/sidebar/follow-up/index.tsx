"use client";

import { useParams } from "next/navigation";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import NavigationSidebar from "@/containers/navigation/sidebar";
import FollowUpSidebarItem from "@/containers/projects/detail/sidebar/follow-up/item";

import { PRIORIZATIONS } from "@/constants";

export default function FollowUpSidebar() {
  const { id } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: contextualRisksData } = useGetContextualRisks({
    populate: "*",
    "pagination[limit]": 300,
    sort: "contextual_risk_category.display_order:asc,display_order:asc",
  });

  const RISKS = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;

  const items = [
    {
      href: `/projects/${id}/follow-up`,
      label: "Overview",
      className: "text-lg",
      children: <span className="text-lg">Overview</span>,
    },
    // Just testing
    ...PRIORIZATIONS.map((priority) => {
      const count = Object.values(RISKS).reduce((acc, risk) => {
        return (
          acc +
          Object.values(risk).reduce((acc2, risk2) => {
            if (
              risk2.proyect_risk_priorization === priority.value ||
              risk2.contextual_risk === priority.value
            ) {
              acc2 += 1;
            }
            return acc2;
          }, 0)
        );
      }, 0);

      const CTX_ITEMS = contextualRisksData?.data?.filter((item) => {
        const RISKS_VALUES = Object.values(RISKS).reduce((acc, item) => {
          return { ...acc, ...item };
        }, {});

        return (
          RISKS_VALUES[`${item?.id}`]?.proyect_risk_priorization === priority.value ||
          RISKS_VALUES[`${item?.id}`]?.contextual_risk === priority.value
        );
      });

      return {
        href: `/projects/${id}/follow-up/${priority.value}`,
        label: priority.label,
        children: (
          <>
            <FollowUpSidebarItem items={CTX_ITEMS} />
            <span>
              {priority.label} ({count})
            </span>
          </>
        ),
      };
    }),
  ];

  return <NavigationSidebar items={items} />;
}
