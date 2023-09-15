import { PropsWithChildren } from "react";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import NavigationBreadcrumbs from "@/containers/navigation/breadcrumbs";
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
          <div className="col-span-12 space-y-2.5">
            <NavigationBreadcrumbs />
            <div className="prose">
              <h1>Project with a long name {id}</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex nisi omnis dignissimos
                at expedita repudiandae non voluptates inventore, commodi magni iure dolorum.
                Soluta, eum fuga. Expedita nam eos explicabo sit!
              </p>
            </div>
          </div>

          {/* {pathnameRegex.test(pathname) && ( */}
          <div className="col-span-10">
            <NavigationTabs />
          </div>
          {/* )} */}
        </header>

        {children}
      </div>
    </Wrapper>
  );
}
