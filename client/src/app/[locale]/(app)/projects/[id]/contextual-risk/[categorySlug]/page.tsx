import Markdown from "react-markdown";

import { getLocale } from "next-intl/server";

import { getBySlugId } from "@/lib/locallizedQuery";

import { ContextualRiskCategoryResponse } from "@/types/generated/strapi.schemas";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import { defaultLocale } from "@/constants/navigation";

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

  let CATEGORY;
  try {
    CATEGORY = await getBySlugId<ContextualRiskCategoryResponse>(
      `contextual-risk-category/${categorySlug}`,
      {
        locale,
      },
    );
  } catch (error) {
    CATEGORY = await getBySlugId<ContextualRiskCategoryResponse>(
      `contextual-risk-category/${categorySlug}`,
      {
        locale: defaultLocale,
      },
    );
  }

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

      <ContextualRiskForm />
    </ProjectsDetailContent>
  );
}
