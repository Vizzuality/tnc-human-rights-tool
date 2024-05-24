import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getLocale, getTranslations } from "next-intl/server";

import { getPcbCategories } from "@/types/generated/pcb-category";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import { defaultLocale } from "@/constants/navigation";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Button } from "@/components/ui/button";
import Markdown from "@/components/ui/markdown";

import { Link } from "@/i18n";

export default async function ProjectsDetailResearchOverviewPage({
  params: { id },
}: ProjectsDetailPageProps) {
  let CATEGORIES;
  let DEFAULT_CATEGORIES;
  const locale = await getLocale();

  try {
    CATEGORIES = await getPcbCategories({
      sort: "display_order:asc",
      locale: locale,
    });

    DEFAULT_CATEGORIES = await getPcbCategories({
      sort: "display_order:asc",
      locale: defaultLocale,
    });
  } catch (error) {}

  if (!DEFAULT_CATEGORIES?.data) return null;

  const [{ attributes }] = CATEGORIES?.data?.length ? CATEGORIES?.data : DEFAULT_CATEGORIES?.data;

  const t = await getTranslations();

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
