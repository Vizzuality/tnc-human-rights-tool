"use client";

import { Fragment, useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const BREADCRUMBS_DICTIONARY = {
  projects: "Projects",
  "project-and-background-community": "Project and Background Community",
  "contextual-risk": "Contextual Risk",
  "project-risk": "Project Risk",
  "follow-up": "Follow Up",
} as const;

export default function NavigationBreadcrumbs() {
  const pathname = usePathname();

  const BREADCRUMBS = useMemo(() => {
    const PATH_SLICES = pathname.split("/").filter((slice) => slice !== "");
    return PATH_SLICES.map((slice, index) => {
      return {
        href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
        label: slice as keyof typeof BREADCRUMBS_DICTIONARY,
      };
    });
  }, [pathname]);

  return (
    <ul className="flex space-x-1 text-sm">
      <li>{">"}</li>
      {BREADCRUMBS.map(({ href, label }) => (
        <Fragment key={href}>
          <li>
            <Link className="hover:text-primary hover:underline" href={href}>
              {BREADCRUMBS_DICTIONARY[label] || label}
            </Link>
          </li>
          {!(BREADCRUMBS[BREADCRUMBS.length - 1].href === href) && <li>/</li>}
        </Fragment>
      ))}
    </ul>
  );
}
