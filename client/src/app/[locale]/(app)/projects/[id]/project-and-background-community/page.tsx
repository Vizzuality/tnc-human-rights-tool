import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";

import { getPcbCategories } from "@/types/generated/pcb-category";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Button } from "@/components/ui/button";
import Markdown from "@/components/ui/markdown";

import { Link } from "@/i18n";

export default async function ProjectsDetailResearchOverviewPage({
  params: { id },
}: ProjectsDetailPageProps) {
  const t = await getTranslations();
  const CATEGORIES = await getPcbCategories({
    sort: "display_order:asc",
  });

  if (!CATEGORIES?.data) return null;

  const [{ attributes }] = CATEGORIES.data;

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{t("project_and_background_community")}</ProjectsDetailTitle>

      <div>
        <Markdown className="-mt-5">{t("project_and_background_community_description")}</Markdown>
      </div>

      <div className="prose flex justify-end pt-5">
        <Link href={`/projects/${id}/project-and-background-community/${attributes?.slug}`}>
          <Button className="items-center">
            {attributes?.title}

            <ArrowRightIcon className="ml-2" />
          </Button>
        </Link>
      </div>
    </ProjectsDetailContent>
  );
}
