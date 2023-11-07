import Link from "next/link";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import { getContextualRiskCategories } from "@/types/generated/contextual-risk-category";

import { ProjectsDetailPageProps } from "@/app/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Button } from "@/components/ui/button";

export default async function ProjectsDetailContextualRiskPage({
  params: { id },
}: ProjectsDetailPageProps) {
  const CATEGORIES = await getContextualRiskCategories({
    sort: "display_order:asc",
  });

  if (!CATEGORIES?.data) return null;

  const [{ id: categoryId, attributes }] = CATEGORIES?.data;

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Contextual Risk</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          <p>
            The focus of the Contextual Risk Screen is to determine what risks exist in the
            geophysical and social working environment, regardless of links to the project, as
            described in the Introduction. If a contextual risk exists, it presents a potential
            impact unless assessed otherwise during the Project Risk Determination.
          </p>
          <p>
            The indicators below cover political and social factors, Community views and the
            existence of <b>allegations</b> of risk. Keep in mind:
          </p>
          <ul>
            <li>
              When we say “risk,” we mean “a possibility that rights could be adversely impacted.”
              Risk can come from intentional violation, unintentional consequences, or contextual
              factors without any experience of problems.
            </li>
            <li>This screening focuses on allegations and concerns as well as facts.</li>
            <li>
              At this phase, we are only focused on identification of risk. We don’t weigh the
              evidence or seek to determine connection to our project (yet).
            </li>
            <li>
              To help with prioritization, the indicators capture whether a risk is a salient issue,
              meaning an issue Communities are aware of and concerned about. A single occurrence of
              a violation will sometimes make it a salient issue, but other times not. Use your best
              judgment, and remember that these determinations should also be validated with
              Communities later in the process.
            </li>
            <li>
              If a question is framed to include alternatives (“or”), a yes answer to either one
              means that indicator should be marked a contextual risk.
            </li>
            <li>
              If a risk is presented only in part, it still should be marked as a contextual risk.
            </li>
            <li>
              The indicators will ask you to consider different geographies based on the question:
              Project Area, Project Region, and Project Country.
            </li>
            <li>
              If a government body or other party denies a risk or allegation, it must still be
              reported as a risk.
            </li>
            <li>
              If a proposed project could introduce an indicated risk that isn’t currently present,
              it should be marked as a contextual risk.
            </li>
            <li>
              If the team doesn’t feel comfortable making a judgment call, it can be marked “Needs
              more research.” The{" "}
              <a
                href="https://www.rightstracker.org/page/about"
                target="_blank"
                rel="noopener noreferer"
              >
                Rights Tracker
              </a>{" "}
              can be a helpful tool to start preliminary research.
            </li>
            <li>
              Be sure to include any notes that a future reviewer might find helpful to understand
              the decision on the indicator. You might also briefly describe the Specific Risk that
              triggered the indicator, especially if it is discrete or narrower than the
              description.
              <blockquote>
                SCENARIO: In one recent project, the team felt gender equity in the Community was
                strong with the exception of one government benefit that was only available because
                they occupied roles in a traditional arrangement. The team marked Indicator 3.1 —
                Gender and Identity Based Violence, and described the issue.
              </blockquote>
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
