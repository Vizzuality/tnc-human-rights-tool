import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
// import FollowUpForm from "@/containers/projects/detail/forms/follow-up";
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

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{PRIORIZATION}</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident tempore maiores libero
          vitae in nulla officiis dignissimos, error non enim natus culpa, facere nemo accusamus ea
          repellendus vero. Ipsa, quae?
        </div>
      </div>

      {/* <FollowUpForm /> */}
    </ProjectsDetailContent>
  );
}
