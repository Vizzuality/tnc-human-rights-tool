"use client";
import { useParams } from "next/navigation";

import { useGetLocalizedList } from "@/lib/locallizedQuery";

import { useGetPcbs } from "@/types/generated/pcb";
import { useGetProjectsId } from "@/types/generated/project";
import { PcbCategory } from "@/types/generated/strapi.schemas";
import { PCBs } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

export default function PCBSidebarItem({ slug = "", display_order }: PcbCategory) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const queryPcbs = useGetPcbs({
    filters: {
      pcb_category: {
        slug: slug,
      },
    },
    populate: "*",
    locale: "all",
  });

  const { data: pcbData } = useGetLocalizedList(queryPcbs);

  const c_display_order = display_order ?? "";
  const PCBS_DATA = (projectIdData?.data?.attributes?.pcbs ?? {}) as PCBs;
  const PCB_DATA = PCBS_DATA[slug] ?? {};

  const pcbIds =
    pcbData?.data?.map((item) => `${c_display_order}-${item?.attributes?.display_order}`) ?? [];

  const total = pcbIds.length;
  const completed = pcbIds.filter((i) => !!PCB_DATA[`${i}`]).length;

  const percentage = completed / total;

  return <NavigationCircle percentage={percentage} />;
}
