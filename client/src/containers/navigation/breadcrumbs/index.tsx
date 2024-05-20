"use client";

import { Fragment, useMemo } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useTranslations } from "next-intl";

import { useGetContextualRisks } from "@/types/generated/contextual-risk";
import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";

import { usePathname } from "@/i18n";

export const BREADCRUMBS_DICTIONARY: Record<string, string> = {
  projects: "projects",
  "project-and-background-community": "project_and_background_community",
  "contextual-risk": "contextual_risk",
  "project-risk": "project_risk",
  "follow-up": "follow_up",
  escalate: "escalate",
  prioritize: "prioritize",
  watch: "watch",
  "more-research": "research",
};

export default function NavigationBreadcrumbs() {
  const { id, categoryId, ctxId } = useParams();
  const pathname = usePathname();
  const t = useTranslations();

  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: pcbCategoriesData } = useGetPcbCategories({
    sort: "display_order:asc",
  });
  const { data: contextualRiskCategoriesData } = useGetContextualRiskCategories({
    sort: "display_order:asc",
  });

  const { data: contextualRisksData } = useGetContextualRisks({
    populate: "*",
    "pagination[limit]": 100,
    sort: "contextual_risk_category.display_order:asc,display_order:asc",
  });

  const BREADCRUMBS = useMemo(() => {
    const PATH_SLICES = pathname.split("/").filter((slice) => slice !== "");

    return PATH_SLICES.map((slice, index) => {
      if (id && slice === id) {
        return {
          href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
          label: projectIdData?.data?.attributes?.name ?? "",
        };
      }

      if (
        categoryId &&
        slice === categoryId &&
        PATH_SLICES[index - 1] === "project-and-background-community"
      ) {
        return {
          href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
          label:
            pcbCategoriesData?.data?.find((c) => c.id === +categoryId)?.attributes?.title ?? "",
        };
      }

      if (categoryId && slice === categoryId && PATH_SLICES[index - 1] === "contextual-risk") {
        return {
          href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
          label:
            contextualRiskCategoriesData?.data?.find((c) => c.id === +categoryId)?.attributes
              ?.title ?? "",
        };
      }

      if (ctxId && slice === ctxId && PATH_SLICES[index - 1] === "project-risk") {
        return {
          href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
          label: contextualRisksData?.data?.find((c) => c.id === +ctxId)?.attributes?.title ?? "",
        };
      }

      return {
        href: `/${PATH_SLICES.slice(0, index + 1).join("/")}`,
        label: t(BREADCRUMBS_DICTIONARY[slice]) || slice,
      };
    }).filter((s) => !!s);
  }, [
    id,
    categoryId,
    ctxId,
    pathname,
    projectIdData,
    pcbCategoriesData,
    contextualRiskCategoriesData,
    contextualRisksData,
    t,
  ]);

  return (
    <ul className="flex space-x-1 text-sm">
      <li>{">"}</li>
      {BREADCRUMBS.map((props) => (
        <Fragment key={props?.href}>
          <li>
            <Link className="hover:text-primary hover:underline" href={props?.href || ""}>
              {props?.label}
            </Link>
          </li>
          {!(BREADCRUMBS[BREADCRUMBS.length - 1]?.href === props?.href) && <li>/</li>}
        </Fragment>
      ))}
    </ul>
  );
}
