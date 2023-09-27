"use client";
import { useParams } from "next/navigation";

import { useGetProjectsId } from "@/types/generated/project";
import { ContextualRiskListResponseDataItem } from "@/types/generated/strapi.schemas";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

export default function ProjectRiskSidebarItem(props: ContextualRiskListResponseDataItem) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);

  const slug = props?.attributes?.contextual_risk_category?.data?.attributes?.slug ?? "";
  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};
  const PR_DATA = CR_DATA[`${props.id}`] ?? {};

  const percentage = !PR_DATA.proyect_risk_priorization ? 0 : 1;

  return <NavigationCircle percentage={percentage} />;
}
