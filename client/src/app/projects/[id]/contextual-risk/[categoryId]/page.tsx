import parse from "html-react-parser";

import { cn } from "@/lib/utils";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      <h1
        className={cn({
          "sticky left-0 top-0 space-y-5 bg-white py-5 text-3xl": true,
          "after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-2.5 after:bg-gradient-to-b after:from-white after:to-white/0":
            true,
        })}
      >
        {category.data.title}
      </h1>

      <div>
        <div className="prose -mt-5">{parse(category.data.description)}</div>
      </div>

      <ul className="space-y-10 border-t border-gray-100 pt-5">
        {items.data
          .sort((a, b) => +a.id - +b.id)
          .map(({ id, title, description, indicator_code }) => (
            <li key={id} className="space-y-2">
              <h3 className="text-xl font-semibold">
                {indicator_code} {title}
              </h3>

              <div className="flex items-start justify-between divide-x">
                <div className="prose">{parse(description)}</div>

                <div className="mt-5 scale-125 py-2.5 pl-2.5">
                  <RadioGroup>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${id}-yes`} />
                      <Label className="cursor-pointer" htmlFor={`${id}-yes`}>
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${id}-no`} />
                      <Label className="cursor-pointer" htmlFor={`${id}-no`}>
                        No
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="more-research" id={`${id}-more-research`} />
                      <Label className="cursor-pointer" htmlFor={`${id}-more-research`}>
                        More research
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
