import { Metadata } from "next";

import ProjectsList from "@/containers/projects/list";

export const metadata: Metadata = {
  title: "Projects | Human Rights Tool",
  description: "Generated by create next app",
};

export default function ProjectsPage() {
  return <ProjectsList />;
}