import { PropsWithChildren } from "react";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import NavigationTabs from "@/containers/navigation/tabs";
import Wrapper from "@/containers/wrapper";

interface ProjectsDetailLayoutProps extends ProjectsDetailPageProps, PropsWithChildren {}

export default async function ProjectsDetailLayout({
  children,
  params,
}: ProjectsDetailLayoutProps) {
  const { id } = params;

  return (
    <Wrapper>
      <div className="space-y-8">
        <header className="grid grid-cols-12 items-center space-y-10 border-b border-gray-100 pb-8">
          <div className="col-span-12">
            <h1 className="text-4xl">Project with a long name {id}</h1>
          </div>

          <div className="col-span-10">
            <NavigationTabs />
          </div>
        </header>

        {children}
      </div>
    </Wrapper>
  );
}
