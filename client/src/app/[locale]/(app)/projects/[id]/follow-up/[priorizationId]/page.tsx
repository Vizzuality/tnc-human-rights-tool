import { getTranslations } from "next-intl/server";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
// import FollowUpForm from "@/containers/projects/detail/forms/follow-up";
import ProjectsDetailFollowUpIdPriorization from "@/containers/projects/detail/follow-up";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { PRIORIZATIONS } from "@/constants";

interface ProjectsDetailFollowUpIdProps {
  params: {
    priorizationId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailFollowUpIdPage({
  params: { priorizationId },
}: ProjectsDetailFollowUpIdProps) {
  const PRIORIZATION = PRIORIZATIONS.find(({ value }) => value === priorizationId)?.label;
  const t = await getTranslations();

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{t(PRIORIZATION)}</ProjectsDetailTitle>

      <ProjectsDetailFollowUpIdPriorization />
    </ProjectsDetailContent>
  );
}
