import { PropsWithChildren } from "react";

import { Hydrate, dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/lib/getQueryClient";

import { getGetProjectsIdQueryOptions, getProjectsId } from "@/types/generated/project";

import { ProjectsDetailPageProps } from "@/app/[locale]/(app)/projects/[id]/page";

import NavigationBreadcrumbs from "@/containers/navigation/breadcrumbs";
import NavigationTabs from "@/containers/navigation/tabs";
import ProjectsDetailReport from "@/containers/projects/detail/report";
import ScrollUp from "@/containers/scroll-up";
import Wrapper from "@/containers/wrapper";

interface ProjectsDetailLayoutProps extends ProjectsDetailPageProps, PropsWithChildren {}

export default async function ProjectsDetailLayout({
  children,
  params,
}: ProjectsDetailLayoutProps) {
  const { id } = params;

  const PROJECT = await getProjectsId(+id);

  // Prefetch useGetProjectsId
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    ...getGetProjectsIdQueryOptions(+id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ScrollUp />
      <Wrapper>
        <div className="space-y-8">
          <header className="grid grid-cols-12 items-center space-y-10 border-b border-gray-100 pb-8">
            <div className="col-span-12 space-y-2.5">
              <NavigationBreadcrumbs />

              <div className="flex justify-between">
                <div>
                  <div className="prose">
                    <h1>{PROJECT?.data?.attributes?.name}</h1>
                  </div>
                  <div className="prose">
                    <p>{PROJECT?.data?.attributes?.description}</p>
                  </div>
                </div>
                <ProjectsDetailReport />
              </div>
            </div>

            <div className="col-span-12">
              <NavigationTabs />
            </div>
          </header>

          {children}
        </div>
      </Wrapper>
    </Hydrate>
  );
}
