"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { getStatus } from "@/lib/status";

import { useGetContextualRiskCategories } from "@/types/generated/contextual-risk-category";
import { useGetPcbCategories } from "@/types/generated/pcb-category";
import { useGetProjectsId } from "@/types/generated/project";
import { PCBs, Risks } from "@/types/project";

export default function ProjectsDetailReport() {
  const { id } = useParams();
  const { data: projectsIdData } = useGetProjectsId(+id);
  const { data: pcbCategoriesData } = useGetPcbCategories({
    sort: "display_order:asc",
  });
  const { data: contextualRiskCategoriesData } = useGetContextualRiskCategories({
    sort: "display_order:asc",
  });

  const status = getStatus({
    pcbs: projectsIdData?.data?.attributes?.pcbs as PCBs,
    risks: projectsIdData?.data?.attributes?.risks as Risks,
    pcbCategories: pcbCategoriesData?.data,
    contextualRiskCategories: contextualRiskCategoriesData?.data,
  });

  if (status < 5) {
    return null;
  }

  return <Link href={`/reports/projects/${id}`}>Report</Link>;
}
