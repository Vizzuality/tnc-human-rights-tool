"use client";
import { useParams } from "next/navigation";

import { useGetPcbCategories } from "@/types/generated/pcb-category";

import NavigationSidebar, { NavigationSidebarProps } from "@/containers/navigation/sidebar";
import PCBSidebarItem from "@/containers/projects/detail/sidebar/pcb/item";

export default function PcbSidebar() {
  const { id } = useParams();

  const { data: pcbCategoriesData } = useGetPcbCategories({
    sort: "display_order:asc",
  });

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
      ?.map(({ id: categoryId, attributes }) => {
        return {
          href: `/projects/${id}/project-and-background-community/${categoryId}`,
          label: attributes?.title ?? "",
          children: (
            <>
              {typeof categoryId !== "undefined" && <PCBSidebarItem categoryId={categoryId} />}

              <span>{attributes?.title}</span>
            </>
          ),
        };
      }),
  ] satisfies NavigationSidebarProps["items"];

  return <NavigationSidebar items={items} />;
}
