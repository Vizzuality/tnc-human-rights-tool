// import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import parse from "html-react-parser";

import { getContextualRisksId } from "@/types/generated/contextual-risk";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectRiskForm from "@/containers/projects/detail/forms/project-risk";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

interface ProjectsDetailProjectRiskIdProps {
  params: {
    ctxId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailProjectRiskIdPage({
  params: { ctxId },
}: ProjectsDetailProjectRiskIdProps) {
  const CTX_RISK = await getContextualRisksId(+ctxId);

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{CTX_RISK.data?.attributes?.title}</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">{parse(CTX_RISK.data?.attributes?.description ?? "")}</div>
      </div>

      <ProjectRiskForm />
    </ProjectsDetailContent>
  );
}
