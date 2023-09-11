import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

interface ProjectsDetailContextualRiskCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default function ProjectsDetailContextualRiskCategoryPage({
  params: { id, categoryId },
}: ProjectsDetailContextualRiskCategoryProps) {
  return (
    <h2>
      {id} - {categoryId}
    </h2>
  );
}
