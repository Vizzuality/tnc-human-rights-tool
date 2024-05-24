import { getTranslations } from "next-intl/server";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import Markdown from "@/components/ui/markdown";

export default async function ProjectsDetailProjectRiskPage() {
  const t = await getTranslations();

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{t("project_risk")}</ProjectsDetailTitle>

      <div>
        <Markdown className="-mt-5">{t("project_risk_description")}</Markdown>
      </div>
    </ProjectsDetailContent>
  );
}
