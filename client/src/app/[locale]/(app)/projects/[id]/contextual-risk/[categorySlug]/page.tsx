import Markdown from "react-markdown";

import { getLocale } from "next-intl/server";

import { getBySlugId } from "@/lib/locallizedQuery";

import { getContextualRisks } from "@/types/generated/contextual-risk";
import { ContextualRiskCategoryResponse } from "@/types/generated/strapi.schemas";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ContextualRiskForm from "@/containers/projects/detail/forms/contextual-risk";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

interface ProjectsDetailContextualRiskCategoryProps {
  params: {
    categorySlug: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailContextualRiskCategoryPage({
  params: { categorySlug },
}: ProjectsDetailContextualRiskCategoryProps) {
  const locale = await getLocale();

  const CATEGORY = await getBySlugId<ContextualRiskCategoryResponse>(
    `contextual-risk-category/${categorySlug}`,
    {
      locale,
    },
  );
  const ITEMS = await getContextualRisks({
    filters: {
      contextual_risk_category: {
        slug: categorySlug,
      },
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
