"use client";

import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";

import NavigationSidebar, { NavigationSidebarProps } from "@/containers/navigation/sidebar";
import ContextualRiskSidebarItem from "@/containers/projects/detail/sidebar/contextual-risk/item";

export default function ContextualRiskSidebar() {
  const { id } = useParams();

  const queryCategoriesData = useGetContextualRiskCategories({
    sort: "display_order:asc",
    locale: "all",
  });

  const { data: categoriesData } = useGetLocalizedList(queryCategoriesData);

  const items = [
    {
      href: `/projects/${id}/contextual-risk`,
      label: "Overview",
      children: <span className="text-lg">Overview</span>,
    },
    ...(categoriesData?.data || [])
      ?.sort((a, b) => {
        if (a?.attributes?.display_order && b?.attributes?.display_order) {
          return +a.attributes.display_order - +b.attributes.display_order;
        }

        return 0;
      })
      ?.map(({ id: categoryId, attributes = {} }) => {
        return {
          href: `/projects/${id}/contextual-risk/${categoryId}`,
          label: attributes?.title ?? "",
          children: (
            <>
              {typeof categoryId !== "undefined" && (
                <ContextualRiskSidebarItem categoryId={categoryId} />
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
