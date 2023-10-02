"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { getStatus } from "@/lib/status";

import { useGetProjectsId } from "@/types/generated/project";
import { PCBs, Risks } from "@/types/project";

export default function ProjectsDetailReport() {
  const { id } = useParams();
  const { data: projectsIdData } = useGetProjectsId(+id);

  const status = getStatus({
    pcbs: projectsIdData?.data?.attributes?.pcbs as PCBs,
    risks: projectsIdData?.data?.attributes?.risks as Risks,
  });

  if (status < 5) {
    return null;
  }

  return <Link href={`/reports/projects/${id}`}>Report</Link>;
}
