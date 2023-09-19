import parse from "html-react-parser";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailForm from "@/containers/projects/detail/forms";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { getPCBs } from "@/data/pcb";
import { getPCBCategory } from "@/data/pcb/categories";

interface ProjectsDetailPCBCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailPCBCategoryPage({
  params: { categoryId },
}: ProjectsDetailPCBCategoryProps) {
  const CATEGORY = await getPCBCategory(categoryId);
  const ITEMS = await getPCBs(categoryId);

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{CATEGORY.data.title}</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">{parse(CATEGORY.data.description)}</div>
      </div>

      <ProjectsDetailForm items={ITEMS} />
    </ProjectsDetailContent>
  );
}
