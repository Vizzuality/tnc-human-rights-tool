// import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectRiskForm from "@/containers/projects/detail/forms/project-risk";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

// interface ProjectsDetailProjectRiskIdProps {
//   params: {
//     ctxId: string;
//   } & ProjectsDetailPageProps["params"];
// }

export default async function ProjectsDetailProjectRiskIdPage() {
  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Contextual Risk Name</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident tempore maiores libero
          vitae in nulla officiis dignissimos, error non enim natus culpa, facere nemo accusamus ea
          repellendus vero. Ipsa, quae?
        </div>
      </div>

      <ProjectRiskForm />
    </ProjectsDetailContent>
  );
}
