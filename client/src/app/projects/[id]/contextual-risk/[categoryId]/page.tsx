import parse from "html-react-parser";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import { getContextualRisks } from "@/data/contextual-risk";
import { getContextualRiskCategory } from "@/data/contextual-risk/categories";

interface ProjectsDetailContextualRiskCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailContextualRiskCategoryPage({
  params: { categoryId },
}: ProjectsDetailContextualRiskCategoryProps) {
  const category = await getContextualRiskCategory(categoryId);
  const items = await getContextualRisks(categoryId);

  return (
    <div className="space-y-5">
      <header className="prose">
        <h1>{category.data.title}</h1>
        <div className="prose">{parse(category.data.description)}</div>
      </header>

      <ul className="space-y-5">
        {items.data
          .sort((a, b) => +a.id - +b.id)
          .map(({ id, title, description, indicator_code }) => (
            <li key={id} className="space-y-2">
              <h3 className="text-xl">
                {indicator_code} {title}
              </h3>

              <div className="prose">{parse(description)}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
