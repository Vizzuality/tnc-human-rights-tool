"use client";

import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";

import NavigationSidebar, { NavigationSidebarProps } from "@/containers/navigation/sidebar";
import ContextualRiskSidebarItem from "@/containers/projects/detail/sidebar/contextual-risk/item";

export default function ContextualRiskSidebar() {
  const { id } = useParams();

  const queryContextualRiskCategories = useGetContextualRiskCategories({
    sort: "display_order:asc",
    locale: "all",
  });
  const { data: contextualRiskCategoriesData } = useGetLocalizedList(queryContextualRiskCategories);

  const items = [
    {
      href: `/projects/${id}/contextual-risk`,
      label: "Overview",
      children: <span className="text-lg">Overview</span>,
    },
    ...(contextualRiskCategoriesData?.data || [])
      ?.sort((a, b) => {
        if (a?.attributes?.display_order && b?.attributes?.display_order) {
          return +a.attributes.display_order - +b.attributes.display_order;
        }

        return 0;
      })
      ?.map(({ attributes }) => {
        return {
          href: `/projects/${id}/contextual-risk/${attributes?.slug}`,
          label: attributes?.title ?? "",
          children: (
            <>
              {typeof attributes?.slug !== "undefined" && (
                <ContextualRiskSidebarItem {...attributes} />
              )}

              <span>
                {`${attributes?.display_order}. `}
                {attributes?.title}
              </span>
            </>
          ),
        };
      }),
  ] satisfies NavigationSidebarProps["items"];

  return <NavigationSidebar items={items} />;
}
