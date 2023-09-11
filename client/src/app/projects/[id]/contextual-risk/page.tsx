import { redirect } from "next/navigation";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import { getContextualRiskCategories } from "@/data/contextual-risk/categories";

export default async function ProjectsDetailContextualRiskPage({
  params,
}: ProjectsDetailPageProps) {
  const CATEGORIES = await getContextualRiskCategories();
  const [{ id: categoryId }] = CATEGORIES.data;

  redirect(`/projects/${params.id}/contextual-risk/${categoryId}`);
}
