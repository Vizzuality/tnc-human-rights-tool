"use client";
import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetPcbCategories } from "@/types/generated/pcb-category";

import NavigationSidebar, { NavigationSidebarProps } from "@/containers/navigation/sidebar";
import PCBSidebarItem from "@/containers/projects/detail/sidebar/pcb/item";

export default function PcbSidebar() {
  const { id } = useParams();

  const queryPcbCategoriesData = useGetPcbCategories({
    sort: "display_order:asc",
    locale: "all",
  });

  const { data: pcbCategoriesData } = useGetLocalizedList(queryPcbCategoriesData);

  const items = [
    {
      href: `/projects/${id}/project-and-background-community`,
      label: "Overview",
      children: <span className="text-lg">Overview</span>,
    },
    ...(pcbCategoriesData?.data || [])
      ?.sort((a, b) => {
        if (a?.attributes?.display_order && b?.attributes?.display_order) {
          return +a.attributes.display_order - +b.attributes.display_order;
        }

        return 0;
      })
      ?.map(({ attributes }) => {
        return {
          href: `/projects/${id}/project-and-background-community/${attributes?.slug}`,
          label: attributes?.title ?? "",
          children: (
            <>
              {typeof attributes?.slug !== "undefined" && <PCBSidebarItem {...attributes} />}

              <span>{attributes?.title}</span>
            </>
          ),
        };
      }),
  ] satisfies NavigationSidebarProps["items"];

  return <NavigationSidebar items={items} />;
}
