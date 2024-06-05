// import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { getLocale, getTranslations } from "next-intl/server";

import getQueryClient from "@/lib/getQueryClient";
import { getBySlugId, getBySlugIdQueryOptions } from "@/lib/locallizedQuery";

import { ContextualRiskResponse } from "@/types/generated/strapi.schemas";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import { defaultLocale } from "@/constants/navigation";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectRiskForm from "@/containers/projects/detail/forms/project-risk";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Markdown from "@/components/ui/markdown";

interface ProjectsDetailProjectRiskIdProps {
  params: {
    ctxSlug: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailProjectRiskIdPage({
  params: { ctxSlug },
}: ProjectsDetailProjectRiskIdProps) {
  const queryClient = getQueryClient();
  const locale = await getLocale();
  const t = await getTranslations();

  let CTX_RISK;
  try {
    CTX_RISK = await getBySlugId<ContextualRiskResponse>(`contextual-risk/${ctxSlug}`, {
      locale,
      populate: "*",
    });
  } catch (error) {
    CTX_RISK = await getBySlugId<ContextualRiskResponse>(`contextual-risk/${ctxSlug}`, {
      locale: defaultLocale,
      populate: "*",
    });
  }

  await queryClient.prefetchQuery({
    ...getBySlugIdQueryOptions(`contextual-risk/${ctxSlug}`, {
      populate: "*",
      locale,
    }),
  });

  await queryClient.prefetchQuery({
    ...getBySlugIdQueryOptions(`contextual-risk/${ctxSlug}`, {
      populate: "*",
      locale: defaultLocale,
    }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ProjectsDetailContent>
        <ProjectsDetailTitle>
          {CTX_RISK.data?.attributes?.contextual_risk_category?.data?.attributes?.display_order}
          {"."}
          {CTX_RISK.data?.attributes?.display_order} {CTX_RISK.data?.attributes?.title}
        </ProjectsDetailTitle>

        <div>
          <div className="prose -mt-5">
            <Markdown>{CTX_RISK.data?.attributes?.project_risk_description}</Markdown>
            <Dialog>
              <DialogTrigger className="flex items-center space-x-2 hover:underline">
                <span>{t("the_minimum_core_risk_determination")}</span>
                <InfoCircledIcon className="inline-block h-4 w-4 text-primary hover:text-primary/50" />
              </DialogTrigger>

              <DialogContent className="max-h-[90svh] overflow-auto">
                <Markdown>{t.raw("the_minimum_core_risk_determination_description")}</Markdown>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <ProjectRiskForm />
      </ProjectsDetailContent>
    </Hydrate>
  );
}
