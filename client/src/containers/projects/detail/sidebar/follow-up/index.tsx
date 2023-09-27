"use client";

import { useParams } from "next/navigation";

import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import NavigationSidebar from "@/containers/navigation/sidebar";

import { PRIORIZATIONS } from "@/constants";

export default function FollowUpSidebar() {
  const { id } = useParams();

  const { data: projectIdData } = useGetProjectsId(+id);
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
      let count = 0;
      if (priority.value !== "more-research") {
        count = Object.values(RISKS).reduce((acc, risk) => {
          return (
            acc +
            Object.values(risk).reduce((acc2, risk2) => {
              if (risk2.proyect_risk_priorization === priority.value) {
                acc2 += 1;
              }
              return acc2;
            }, 0)
          );
        }, 0);
      }

      if (priority.value === "more-research") {
        count = Object.values(RISKS).reduce((acc, risk) => {
          return (
            acc +
            Object.values(risk).reduce((acc2, risk2) => {
              if (risk2.contextual_risk === "more-research") {
                acc2 += 1;
              }
              return acc2;
            }, 0)
          );
        }, 0);
      }

      return {
        href: `/projects/${id}/follow-up/${priority.value}`,
        label: priority.label,
        children: (
          <>
            <span>
              {priority.label} ({count})
            </span>
            {/* Draw a svg circle that I can control how much of the path is filled */}
            {/* <NavigationCircle percentage={0.35} /> */}
          </>
        ),
      };
    }),
  ];

  return <NavigationSidebar items={items} />;
}
