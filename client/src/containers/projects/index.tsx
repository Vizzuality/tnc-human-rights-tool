"use client";

import { Project, columns } from "@/containers/projects/columns";
import { ProjectsTable } from "@/containers/projects/table";
import Wrapper from "@/containers/wrapper";

const data: Project[] = [
  {
    id: 1,
    name: "Project 1",
    status: "completed",
    dateUpdated: "2023-01-01",
  },
  {
    id: 2,
    name: "Project 2",
    status: "completed",
    dateUpdated: "2023-02-02",
  },
  {
    id: 3,
    name: "Project 3",
    status: "completed",
    dateUpdated: "2023-03-03",
  },
  {
    id: 4,
    name: "Project 4",
    status: "completed",
    dateUpdated: "2023-04-04",
  },
  {
    id: 5,
    name: "Project 5",
    status: "pending",

    dateUpdated: "2023-05-05",
  },
  {
    id: 6,
    name: "Project 6",
    status: "completed",
    dateUpdated: "2023-06-06",
  },
  {
    id: 7,
    name: "Project 7",
    status: "pending",
    dateUpdated: "2023-07-07",
  },
  {
    id: 8,
    name: "Project 8",
    status: "pending",
    dateUpdated: "2023-08-08",
  },
  {
    id: 9,
    name: "Project 9",
    status: "pending",
    dateUpdated: "2023-09-09",
  },
];

export default function Projects() {
  return (
    <Wrapper>
      <section className="flex max-w-6xl grow flex-col py-24">
        <ProjectsTable columns={columns} data={data} />
      </section>
    </Wrapper>
  );
}
