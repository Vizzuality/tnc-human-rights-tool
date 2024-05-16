import Markdown from "react-markdown";

import { getPcbs } from "@/types/generated/pcb";
import { getPcbCategoriesId } from "@/types/generated/pcb-category";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import CarbonOffsetProjectControversiesForm from "@/containers/projects/detail/forms/pcb/carbon-offset-offset-controversies";
import GeographicScopeForm from "@/containers/projects/detail/forms/pcb/geographic-scope";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

interface ProjectsDetailPCBCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailPCBCategoryPage({
  params: { categoryId },
}: ProjectsDetailPCBCategoryProps) {
  const CATEGORY = await getPcbCategoriesId(+categoryId);
  const ITEMS = await getPcbs({
    filters: {
      pcb_category: categoryId,
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

      {categoryId === "1" && <GeographicScopeForm items={ITEMS} />}

      {categoryId === "3" && <CarbonOffsetProjectControversiesForm items={ITEMS} />}
    </ProjectsDetailContent>
  );
}
