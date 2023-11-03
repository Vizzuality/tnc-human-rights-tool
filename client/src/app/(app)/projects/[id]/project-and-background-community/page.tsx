import Link from "next/link";

import { ArrowRightIcon } from "@radix-ui/react-icons";

import { getPcbCategories } from "@/types/generated/pcb-category";

import { ProjectsDetailPageProps } from "@/app/(app)/projects/[id]/page";

import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

import { Button } from "@/components/ui/button";

export default async function ProjectsDetailResearchOverviewPage({
  params: { id },
}: ProjectsDetailPageProps) {
  const CATEGORIES = await getPcbCategories({
    sort: "display_order:asc",
  });

  if (!CATEGORIES?.data) return null;

  const [{ id: categoryId, attributes }] = CATEGORIES.data;

  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Project and Community Background</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          <p>
            The first step before using the Human Rights Screening Tool is for teams to gain a clear
            view of the interested parties to understand which Indigenous Peoples and Local
            Communities will potentially be affected by a project.
          </p>
          <p>
            Identifying rightsholders and Communities is a complex process, and analysis must be
            wide-reaching to capture all potential impacts. But be mindful that the tendency to
            bring in every possible indirectly linked entity can make analysis sprawling,
            paralyzing, and ultimately lacking in utility. It’s important, therefore, to lay
            groundwork on structure and scope.
          </p>
          <p>
            Investigating deeply, to honor the complexity of the process, while also keeping the
            time commitment realistic to honor teams’ capacity, are the dual mandates of this tool.
            If you have already completed a stakeholder or interested parties assessment, please
            upload it here. If you haven’t please review existing tools and upload your results once
            you complete the exercise.
          </p>

          <h3>Existing Stakeholder and Interested Parties Assessment</h3>
          <p>
            Many science-backed tools exist for stakeholder mapping, as listed below, but this
            should include identifying impacted communities and rightsholders. A sampling of those
            that TNC has developed or relies upon include:
          </p>
          <ul>
            <li>
              <a
                href="https://docs.google.com/document/d/1Gl4hCpPbrw5Wmhy3lMRY3ae4TzAfEdQm6n6yLkT2yyw/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Interested Parties Assessment Tool
              </a>
              (17), developed as part of TNC’s
              {` `}
              <a
                href="https://www.conservationgateway.org/ConservationPlanning/cbd/Pages/default.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conservation by Design 2.0
              </a>
              (18) framework.
            </li>
            <li>
              <a
                href="https://tnc.app.box.com/s/ekyv0saesnuty5ya3fzteho8njz35w2m"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rightsholder and Stakeholder Mapping Template
              </a>
              (19)
            </li>
            <li>
              <a
                href="https://tnc.app.box.com/s/cm3ttg63uqvqt1eg59emrp7ssqc389o5/file/939207216958"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community Leaders and Institutions Diagnostic
              </a>
              (20)
            </li>
            <li>
              <a
                href="https://tnc.app.box.com/s/pczujnzvfzz3anp4ltjg27t0x8cv4xrr/file/939211180924"
                target="_blank"
                rel="noopener noreferrer"
              >
                Collective Action and Social Cohesion Diagnostic
              </a>
              (21)
            </li>
            <li>
              <a
                href="https://www.tnchumanrightsguide.org/module-1-learning-early-discussions/#step-one"
                target="_blank"
                rel="noopener noreferrer"
              >
                Module 1 of the Human Rights Guide
              </a>
              (11)
            </li>
          </ul>
          <p>Teams should consider applying whichever tool best meets their needs.</p>

          <h3>Identifying Gender Equity Issues and Vulnerable Groups</h3>
          <p>
            Understanding the existence and relationship of Communities is an important component of
            human rights mapping, but equally important is understanding the existence and needs of
            vulnerable groups within Communities, including but not limited to:
          </p>
          <ul>
            <li>Women</li>
            <li>Youth</li>
            <li>Older persons</li>
            <li>Persons with disabilities</li>
            <li>Racial and ethnic minorities</li>
            <li>LGBTQI2S+ persons</li>
            <li>Refugees</li>
            <li>Migrants</li>
            <li>Human rights defenders</li>
            <li>People suffering poverty</li>
            <li>People living with HIV/AIDS or other chronic health conditions</li>
          </ul>
          <p>
            This topic is canvassed further in
            {` `}
            <a
              href="https://www.tnchumanrightsguide.org/module-1-learning-early-discussions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Step 2 of the Human Rights Guide, Module 1: Learning and Early Discussions
            </a>
            (11).
          </p>
          <p>
            Some of the challenges this presents are beyond the scope of this screening tool. But
            it’s important to be aware of these differences and issues to identify potential human
            rights impacts. To develop understanding, it might be helpful to review the following:
          </p>
          <ul>
            <li>TNC’s Guidance for Integrating Gender Equity in Conservation(22)</li>
            <li>Flora & Fauna International’s Tool for Participatory Approaches toolset(23)</li>
          </ul>
          <p>
            A best practice might be engaging these tools before running the Human Rights Screening
            tool. The screening tool can also be used in a parallel and iterative fashion alongside
            other tools, as it might identify issues that pose risks to these discreet sub-groups.
          </p>
        </div>
      </div>

      <div className="prose flex justify-end pt-5">
        <Link href={`/projects/${id}/project-and-background-community/${categoryId}`}>
          <Button className="items-center">
            {attributes?.title}

            <ArrowRightIcon className="ml-2" />
          </Button>
        </Link>
      </div>
    </ProjectsDetailContent>
  );
}
