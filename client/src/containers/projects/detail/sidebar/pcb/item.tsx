"use client";
import { useParams } from "next/navigation";

import { useLocale } from "next-intl";

import { useGetBySlug } from "@/lib/locallizedQuery";

import { useGetPcbs } from "@/types/generated/pcb";
import { useGetProjectsId } from "@/types/generated/project";
import { PcbCategoryResponse } from "@/types/generated/strapi.schemas";
import { PCBs } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface PCBSidebarItemProps {
  categorySlug: string;
}

export default function PCBSidebarItem({ categorySlug }: PCBSidebarItemProps) {
  const { id } = useParams();
  const locale = useLocale();
  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: pcbData } = useGetPcbs({
    filters: {
      pcb_category: {
        slug: categorySlug,
      },
    },
    populate: "*",
  });
  const { data: categoriesIdData } = useGetBySlug<PcbCategoryResponse>(
    `pcb-category/${categorySlug}`,
    {
      locale,
    },
  );
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
