"use client";
import { useParams } from "next/navigation";

import { useGetPcbCategoriesId } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface PCBSidebarItemProps {
  categoryId: number;
}

export default function PCBSidebarItem({ categoryId }: PCBSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: categoriesIdData } = useGetPcbCategoriesId(categoryId);
  const { attributes } = categoriesIdData?.data ?? {};

  const slug = attributes?.slug ?? "";
  const PCBS_DATA = (projectIdData?.data?.attributes?.pcbs ?? {}) as Record<string, unknown>;
  const PCB_DATA = (PCBS_DATA[slug] ?? {}) as Record<string, unknown> | string;
  const PCBS_VALUES = Object.values(PCB_DATA);

  const total = PCBS_VALUES.length;
  const completed = PCBS_VALUES.filter((value) => !!value).length;

  const percentage = !PCBS_VALUES.length ? 0 : total / completed;

  return <NavigationCircle percentage={percentage} />;
}
