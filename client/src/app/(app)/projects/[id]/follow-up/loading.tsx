import ProjectsDetailContent from "@/containers/projects/detail/content";

import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectsDetailFollowUpOverviewLoading() {
  return (
    <ProjectsDetailContent>
      <Skeleton className="mt-5 h-10 w-2/3" />

      <Skeleton className="h-40 w-full" />

      <Skeleton className="h-80 w-full" />
    </ProjectsDetailContent>
  );
}
