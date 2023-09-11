import { PropsWithChildren } from "react";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import Wrapper from "@/containers/wrapper";

interface ProjectsDetailLayoutProps extends ProjectsDetailPageProps, PropsWithChildren {}

export default async function ProjectsDetailLayout({
  children,
  params,
}: ProjectsDetailLayoutProps) {
  const { id } = params;
  return (
    <div className="space-y-5">
      <Wrapper>
        <header>
          <h1 className="text-4xl">Project {id}</h1>
        </header>

        {children}
      </Wrapper>
    </div>
  );
}
