"use client";
import { useParams } from "next/navigation";

import { useGetContextualRisksId } from "@/types/generated/contextual-risk";
import { useGetProjectsId } from "@/types/generated/project";
import { Risks } from "@/types/project";

import NavigationCircle from "@/containers/navigation/sidebar/circle";

interface ProjectRiskSidebarItemProps {
  ctxId: number;
}

export default function ProjectRiskSidebarItem({ ctxId }: ProjectRiskSidebarItemProps) {
  const { id } = useParams();
  const { data: projectIdData } = useGetProjectsId(+id);
  const { data: ctxIdData } = useGetContextualRisksId(ctxId, {
    populate: "*",
  });

  const slug = ctxIdData?.data?.attributes?.contextual_risk_category?.data?.attributes?.slug ?? "";
  const CRS_DATA = (projectIdData?.data?.attributes?.risks ?? {}) as Risks;
  const CR_DATA = CRS_DATA[slug] ?? {};
  const PR_DATA = CR_DATA[ctxId] ?? {};

  const percentage = !PR_DATA.proyect_risk_priorization ? 0 : 1;

  return <NavigationCircle percentage={percentage} />;
}
