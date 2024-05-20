import { getTranslations } from "next-intl/server";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import Markdown from "@/components/ui/markdown";

export default async function ProjectsDetailFollowUpPage() {
  const t = await getTranslations();

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{t("follow_up")}</ProjectsDetailTitle>

      <div>
        <Markdown className="-mt-5">{t("follow_up_description")}</Markdown>
      </div>
    </ProjectsDetailContent>
  );
}
