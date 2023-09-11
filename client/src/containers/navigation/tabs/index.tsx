"use client";
import { useParams } from "next/navigation";

import TabsNavigationItem from "@/containers/navigation/tabs/item";

const LINKS = [
  {
    href: "/research",
    label: "1. Research",
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

  return (
    <ul className="relative flex justify-between">
      <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-slate-200" />
      {LINKS.map(({ href, label }) => (
        <li className="relative z-10" key={href}>
          <div className="absolute left-0 top-0 z-0 h-full w-full bg-white" />
          <TabsNavigationItem href={`/projects/${id}${href}`} className="relative z-10">
            {label}
          </TabsNavigationItem>
        </li>
      ))}
    </ul>
  );
}
