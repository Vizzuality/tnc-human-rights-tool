import ProjectsDetailContent from "@/containers/projects/detail/content";

import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectsDetailFollowUpOverviewLoading() {
  return (
    <div className="mt-8">
      <section className="flex grow flex-col space-y-5">
        <div className="grid grid-cols-12 gap-20">
          <div className="col-span-4">
            <Skeleton className="h-80 w-full" />
          </div>
          <div className="col-span-8">
            <ProjectsDetailContent>
              <Skeleton className="mt-5 h-10 w-2/3" />

              <Skeleton className="h-40 w-full" />

              <Skeleton className="h-80 w-full" />
            </ProjectsDetailContent>
          </div>
        </div>
      </section>
    </div>
  );
}
