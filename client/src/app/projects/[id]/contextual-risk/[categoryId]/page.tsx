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
    <div className="-mt-5 space-y-5">
      <h1 className="sticky left-0 top-0 space-y-5 bg-gradient-to-b from-white to-white/0 py-5 text-4xl font-semibold">
        {category.data.title}
      </h1>

      <div>
        <div className="prose -mt-5">{parse(category.data.description)}</div>
      </div>

      <ul className="space-y-5">
        {items.data
          .sort((a, b) => +a.id - +b.id)
          .map(({ id, title, description, indicator_code }) => (
            <li key={id} className="space-y-2">
              <h3 className="text-xl font-semibold">
                {indicator_code} {title}
              </h3>

              <div className="prose">{parse(description)}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
