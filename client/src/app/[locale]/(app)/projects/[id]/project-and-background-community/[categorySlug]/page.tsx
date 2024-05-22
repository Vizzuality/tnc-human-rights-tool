import Markdown from "react-markdown";

import { getLocale } from "next-intl/server";

import { getBySlugId } from "@/lib/locallizedQuery";

import { getPcbs } from "@/types/generated/pcb";
import { PcbCategoryResponse } from "@/types/generated/strapi.schemas";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import CarbonOffsetProjectControversiesForm from "@/containers/projects/detail/forms/pcb/carbon-offset-offset-controversies";
import GeographicScopeForm from "@/containers/projects/detail/forms/pcb/geographic-scope";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

interface ProjectsDetailPCBCategoryProps {
  params: {
    categorySlug: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailPCBCategoryPage({
  params: { categorySlug },
}: ProjectsDetailPCBCategoryProps) {
  const locale = await getLocale();
  const CATEGORY = await getBySlugId<PcbCategoryResponse>(`pcb-category/${categorySlug}`, {
    locale,
  });
  const ITEMS = await getPcbs({
    filters: {
      pcb_category: {
        slug: categorySlug,
      },
    },
    populate: "*",
  });

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{CATEGORY?.data?.attributes?.title}</ProjectsDetailTitle>

      {!!CATEGORY?.data?.attributes?.description && (
        <div>
          <div className="prose -mt-5">
            <Markdown>{CATEGORY?.data?.attributes?.description}</Markdown>
          </div>
        </div>
      )}

      {categorySlug === "geographic-scope" && <GeographicScopeForm items={ITEMS} />}

      {categorySlug === "carbon-offset-project-controversies" && (
        <CarbonOffsetProjectControversiesForm items={ITEMS} />
      )}
    </ProjectsDetailContent>
  );
}
