"use client";

import { useParams } from "next/navigation";

import { getStatus } from "@/lib/status";

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

  const status = getStatus({
    pcbs: projectIdData?.data?.attributes?.pcbs as PCBs,
    risks: projectIdData?.data?.attributes?.risks as Risks,
  });
  return (
    <ul className="relative flex justify-between">
      <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-slate-500" />
      {LINKS.map(({ href, label }, i) => (
        <li className="relative z-10" key={href}>
          <div className="absolute left-0 top-0 z-0 h-full w-full bg-white" />
          <TabsNavigationItem
            href={`/projects/${id}${href}`}
            disabled={i >= status}
            className="relative z-10"
          >
            {label}
          </TabsNavigationItem>
        </li>
      ))}
    </ul>
  );
}
