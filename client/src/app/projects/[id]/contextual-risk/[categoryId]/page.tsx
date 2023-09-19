import parse from "html-react-parser";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailForm from "@/containers/projects/detail/forms";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { getContextualRisks } from "@/data/contextual-risk";
import { getContextualRiskCategory } from "@/data/contextual-risk/categories";

interface ProjectsDetailContextualRiskCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailContextualRiskCategoryPage({
  params: { categoryId },
}: ProjectsDetailContextualRiskCategoryProps) {
  const CATEGORY = await getContextualRiskCategory(categoryId);
  const ITEMS = await getContextualRisks(categoryId);

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
