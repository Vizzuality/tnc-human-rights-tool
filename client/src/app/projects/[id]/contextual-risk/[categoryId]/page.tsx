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
  const CATEGORY = await getContextualRiskCategory(categoryId);
  const ITEMS = await getContextualRisks(categoryId);

  return (
    <div className="-mt-5 space-y-5">
      <h1
        className={cn({
          "sticky left-0 top-0 space-y-5 bg-white py-5 text-3xl": true,
          "after:absolute after:inset-x-0 after:top-full after:z-10 after:block after:h-2.5 after:bg-gradient-to-b after:from-white after:to-white/0":
            true,
        })}
      >
        {CATEGORY.data.title}
      </h1>

      <div>
        <div className="prose -mt-5">{parse(CATEGORY.data.description)}</div>
      </div>

      <ul className="space-y-10 border-t border-gray-100 pt-5">
        {ITEMS.data
          .sort((a, b) => +a.id - +b.id)
          .map(({ id, title, description, indicator_code }) => (
            <li key={id} className="space-y-2">
              <h3 className="text-xl font-semibold">
                {indicator_code} {title}
              </h3>

              <div className="prose">{parse(description)}</div>

              <div className="prose mt-5 inline-block border-t border-primary/10 py-2.5">
                <RadioGroup className="flex space-x-2.5">
                  <div className="flex items-center">
                    <RadioGroupItem value="yes" id={`${id}-yes`} />
                    <Label className="cursor-pointer pl-2 font-normal" htmlFor={`${id}-yes`}>
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="no" id={`${id}-no`} />
                    <Label className="cursor-pointer pl-2 font-normal" htmlFor={`${id}-no`}>
                      No
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="more-research" id={`${id}-more-research`} />
                    <Label
                      className="cursor-pointer pl-2 font-normal"
                      htmlFor={`${id}-more-research`}
                    >
                      More research
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
