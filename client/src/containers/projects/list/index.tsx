"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { useGetProjects } from "@/types/generated/project";

import { useColumns } from "@/containers/projects/list/columns";
import { ProjectsTable } from "@/containers/projects/list/table";
import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Link } from "@/i18n";

export default function Projects() {
  const { data, isFetching, isFetched } = useGetProjects();
  const columns = useColumns();
  const t = useTranslations();

  return (
    <Wrapper>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">{t("projects")}</h1>
          <Link href="/projects/new">
            <Button className="items-center space-x-2">
              <span>{t("new_project")}</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>

        {!isFetched && isFetching && <Skeleton className="h-96" />}

        {isFetched && (
          <div className="space-y-5">
            <ProjectsTable columns={columns} data={data?.data ?? []} />
            {isFetching && <div className="px-5 text-xs">Loading...</div>}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
