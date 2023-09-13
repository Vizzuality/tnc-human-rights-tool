import parse from "html-react-parser";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPCBs } from "@/data/pcb";
import { getPCBCategory } from "@/data/pcb/categories";

interface ProjectsDetailPCBCategoryProps {
  params: {
    categoryId: string;
  } & ProjectsDetailPageProps["params"];
}

export default async function ProjectsDetailPCBCategoryPage({
  params: { categoryId },
}: ProjectsDetailPCBCategoryProps) {
  const CATEGORY = await getPCBCategory(categoryId);
  const ITEMS = await getPCBs(categoryId);

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>{CATEGORY.data.title}</ProjectsDetailTitle>

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
    </ProjectsDetailContent>
  );
}
