"use client";
import { useParams } from "next/navigation";

import { useGetPcbs } from "@/types/generated/pcb";
import { useGetPcbCategoriesId } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";
import { PCBs } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface PCBSidebarItemProps {
  categoryId: number;
}

export default function PCBSidebarItem({ categoryId }: PCBSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: pcbData } = useGetPcbs({
    filters: {
      pcb_category: categoryId,
    },
    populate: "*",
  });
  const { data: categoriesIdData } = useGetPcbCategoriesId(categoryId);
  const { attributes } = categoriesIdData?.data ?? {};

  const c_display_order = attributes?.display_order ?? "";
  const slug = attributes?.slug ?? "";
  const PCBS_DATA = (projectIdData?.data?.attributes?.pcbs ?? {}) as PCBs;
  const PCB_DATA = PCBS_DATA[slug] ?? {};

  const pcbIds =
    pcbData?.data?.map((item) => `${c_display_order}-${item?.attributes?.display_order}`) ?? [];

  const total = pcbIds.length;
  const completed = pcbIds.filter((i) => !!PCB_DATA[`${i}`]).length;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
