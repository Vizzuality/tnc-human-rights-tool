import Markdown from "react-markdown";

import { getContextualRisks } from "@/types/generated/contextual-risk";
import { getContextualRiskCategoriesId } from "@/types/generated/contextual-risk-category";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ContextualRiskForm from "@/containers/projects/detail/forms/contextual-risk";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

interface ProjectsDetailContextualRiskCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailContextualRiskCategoryPage({
  params: { categoryId },
}: ProjectsDetailContextualRiskCategoryProps) {
  const CATEGORY = await getContextualRiskCategoriesId(+categoryId);
  const ITEMS = await getContextualRisks({
    filters: {
      contextual_risk_category: +categoryId,
    },
    populate: "*",
  });

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>
        {CATEGORY?.data?.attributes?.display_order}
        {". "}
        {CATEGORY?.data?.attributes?.title}
      </ProjectsDetailTitle>

      {!!CATEGORY?.data?.attributes?.description && (
        <div>
          <div className="prose -mt-5">
            <Markdown>{CATEGORY.data.attributes.description}</Markdown>
          </div>
        </div>
      )}

      <ContextualRiskForm items={ITEMS} />
    </ProjectsDetailContent>
  );
}
