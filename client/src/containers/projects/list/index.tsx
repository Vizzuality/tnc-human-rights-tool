"use client";

import Link from "next/link";

import { PlusIcon } from "@radix-ui/react-icons";

import { Project, columns } from "@/containers/projects/list/columns";
import { ProjectsTable } from "@/containers/projects/list/table";
import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";

const data: Project[] = [
  {
    id: 1,
    name: "Project 1",
    description: "This is a description",
    status: "completed",
    dateUpdated: "2023-01-01",
  },
  {
    id: 2,
    name: "Project 2",
    description: "This is a description",
    status: "completed",
    dateUpdated: "2023-02-02",
  },
  {
    id: 3,
    name: "Project 3",
    description: "This is a description",
    status: "completed",
    dateUpdated: "2012-03-03",
  },
  {
    id: 4,
    name: "Project 4",
    description: "This is a description",
    status: "completed",
    dateUpdated: "2021-04-04",
  },
  {
    id: 5,
    name: "Project 5",
    description: "This is a description",
    status: "pending",
    dateUpdated: "2023-05-05",
  },
  {
    id: 6,
    name: "Project 6",
    description: "This is a description",
    status: "completed",
    dateUpdated: "2023-06-06",
  },
  {
    id: 7,
    name: "Project 7",
    description: "This is a description",
    status: "pending",
    dateUpdated: "2023-07-07",
  },
  {
    id: 8,
    name: "Project 8",
    description: "This is a description",
    status: "pending",
    dateUpdated: "2023-08-08",
  },
  {
    id: 9,
    name: "Project 9",
    description: "This is a description",
    status: "pending",
    dateUpdated: "2023-09-09",
  },
];

export default function Projects() {
  return (
    <Wrapper>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">Projects</h1>
          <Link href="/projects/new">
            <Button className="items-center space-x-2">
              <span>New Project</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
        <ProjectsTable columns={columns} data={data} />
      </div>
    </Wrapper>
  );
}