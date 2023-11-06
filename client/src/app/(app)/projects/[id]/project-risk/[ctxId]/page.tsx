// import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import Markdown from "react-markdown";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/lib/getQueryClient";

import {
  getContextualRisksId,
  getGetContextualRisksIdQueryOptions,
} from "@/types/generated/contextual-risk";

import { ProjectsDetailPageProps } from "@/app/(app)/projects/[id]/page";

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
  const queryClient = getQueryClient();

  const CTX_RISK = await getContextualRisksId(+ctxId);

  await queryClient.prefetchQuery({
    ...getGetContextualRisksIdQueryOptions(+ctxId, {
      populate: "*",
    }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ProjectsDetailContent>
        <ProjectsDetailTitle>{CTX_RISK.data?.attributes?.title}</ProjectsDetailTitle>

        <div>
          <div className="prose -mt-5">
            <Markdown>{CTX_RISK.data?.attributes?.project_risk_description}</Markdown>
          </div>
        </div>

        <ProjectRiskForm />
      </ProjectsDetailContent>
    </Hydrate>
  );
}
