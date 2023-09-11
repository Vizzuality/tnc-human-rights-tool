"use client";
import { useParams } from "next/navigation";

import TabsNavigationItem from "@/containers/navigation/tabs/item";

const LINKS = [
  {
    href: "/research",
    label: "Research",
  },
  {
    href: "/contextual-risk",
    label: "Contextual Risk",
  },
  {
    href: "/project-risk",
    label: "Project Risk",
  },
  {
    href: "/follow-up",
    label: "Follow Up",
  },
];

export default function NavigationTabs() {
  const { id } = useParams();

  return (
    <ul className="flex justify-between">
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <TabsNavigationItem href={`/projects/${id}${href}`}>{label}</TabsNavigationItem>
        </li>
      ))}
    </ul>
  );
}
