import Link from "next/link";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import { getContextualRiskCategories } from "@/types/generated/contextual-risk-category";

import { ProjectsDetailPageProps } from "@/app/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Button } from "@/components/ui/button";

export default async function ProjectsDetailContextualRiskPage({
  params: { id },
}: ProjectsDetailPageProps) {
  const CATEGORIES = await getContextualRiskCategories();

  if (!CATEGORIES?.data) return null;

  const [{ id: categoryId, attributes }] = CATEGORIES?.data;

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Contextual Risk</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          <p>
            The Contextual Risk Screen focuses on whether potential risks are present in the working
            geophysical and social environment, irrespective of links to the specific project. The
            reasons for this approach are described in the Introduction. Where a contextual risk is
            found, the Tool presumes (in the Project Risk Screen) that the project presents a
            potential impact unless the screening provides specific reasons why the risk is Not
            Applicable, Unlikely, or finds that there is Reliable Mitigation Already in place or
            Limited in scope to address the risk (collectively, the Project Risk Determination).
            Details on this determination are provided in the Part B guidance, below.
          </p>
          <p>
            The indicators below typically ask about the existence of political or social factors,
            or IPLC views or the existence of allegations of risk. Keep in mind:
          </p>
          <ul>
            <li>
              A “risk” is just a possibility that rights could be adversely impacted, even
              informally or unintentionally. Future risk can be drawn from past experience of
              violations, but also from contextual factors without any experience of problems.
            </li>
            <li>
              This screening does not result in findings or conclusions but rather directs our
              attention. It thus focuses as much on allegations and concerns as well as established
              facts.
            </li>
            <li>
              With respect to allegations, to not “weigh the evidence” or focus on whether the risk
              is linked to the specific project. That will be addressed in the next stage (Project
              Risk Screen).
            </li>
          </ul>
        </div>
      </div>

      <div className="prose flex justify-end pt-5">
        <Link href={`/projects/${id}/contextual-risk/${categoryId}`}>
          <Button className="items-center">
            {attributes?.title}

            <ArrowRightIcon className="ml-2" />
          </Button>
        </Link>
      </div>
    </ProjectsDetailContent>

    // <div>
    //   Contextual Risk Content to be added after it's been edited. The Contextual Risk Screen focuses
    //   on whether potential risks are present in the working geophysical and social environment,
    //   irrespective of links to the specific project. The reasons for this approach are described in
    //   the Introduction. Where a contextual risk is found, the Tool presumes (in the Project Risk
    //   Screen) that the project presents a potential impact unless the screening provides specific
    //   reasons why the risk is Not Applicable, Unlikely, or finds that there is Reliable Mitigation
    //   Already in place or Limited in scope to address the risk (collectively, the Project Risk
    //   Determination). Details on this determination are provided in the Part B guidance, below. The
    //   indicators below typically ask about the existence of political or social factors, or IPLC
    //   views or the existence of allegations of risk. Keep in mind: A “risk” is just a possibility
    //   that rights could be adversely impacted, even informally or unintentionally. Future risk can
    //   be drawn from past experience of violations, but also from contextual factors without any
    //   experience of problems. This screening does not result in findings or conclusions but rather
    //   directs our attention. It thus focuses as much on allegations and concerns as well as
    //   established facts. With respect to allegations, to not “weigh the evidence” or focus on
    //   whether the risk is linked to the specific project. That will be addressed in the next stage
    //   (Project Risk Screen).
    // </div>
  );
}
