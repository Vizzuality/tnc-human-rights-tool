"use client";

import Link from "next/link";

import Wrapper from "@/containers/wrapper";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <div className="prose w-full">
              <h1>Human Rights Screening Toolset</h1>
              <p>
                TNC’s commitment to conservation prioritizes the human rights, collective rights,
                authority, and capacity of all Indigenous Peoples and Local Communities, termed
                Communities in this document, to manage and protect their lands and natural
                resources.
              </p>
              <ul>
                <li>
                  To learn about the foundations of this approach, see the{" "}
                  <a
                    href="https://tncvoicechoiceaction.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voice, Choice, and Action Framework.
                  </a>
                </li>
                <li>
                  For methodology and best practices in implementation, see the{" "}
                  <a
                    href="https://www.tnchumanrightsguide.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Human Rights Guide.
                  </a>
                </li>
              </ul>

              <p>
                This Human Rights Screening Toolset is a screening process to help TNC field teams:
                identify human-rights-based project risks prioritize risks for further attention and
                action in collaboration with Communities fulfill the larger responsibility of human
                rights due diligence.
              </p>
            </div>
            <div className="prose w-full">
              <h2>How it works</h2>

              <p>The work of this Toolset occurs in three phases:</p>

              <h3>1. Research</h3>
              <ul>
                <li>Engage and conduct preliminary research</li>
                <li>Use the Community Identification Tool</li>
              </ul>

              <h3>2. Screening</h3>
              <ul>
                <li>
                  Perform the Contextual Risk Screen
                  <ul>
                    <li>Identify whether risks are present: “yes,” “no,” or “more research”</li>
                    <li>Produce a Research List of issues needing further investigation</li>
                  </ul>
                </li>
                <li>
                  Perform the Project Risk Screen
                  <ul>
                    <li>
                      Make Project Risk Determinations based on risks and issues identified in the
                      previous screen.
                    </li>
                    <li>Generate the Escalate List, Prioritize List, and Watch List</li>
                  </ul>
                </li>
              </ul>

              <h3>3. Follow up</h3>
              <ul>
                <li>
                  Investigate Research List issues identified in Phase 2 above
                  <ul>
                    <li>Perform another Contextual Risk Screen after this research is finished.</li>
                  </ul>
                </li>
                <li>
                  For issues on the Escalate List, seek supervisory or higher level review. For
                  severe risks, seek review beyond the project team.
                </li>
                <li>
                  For issues on the Prioritize List, conduct analysis and engagement
                  <ul>
                    <li>Keep focus on these issues as you develop and implement projects.</li>
                    <li>Look for opportunities to integrate this work into ongoing processes</li>
                  </ul>
                </li>
                <li>
                  For issues on the Watch List, continue to monitor.
                  <ul>
                    <li>
                      Review this list annually at minimum, or more frequently as projects demand.
                    </li>
                    <li>Review during project implementation.</li>
                    <li>Review Other Toolsets for any equity and well-being concerns.</li>
                  </ul>
                </li>
                <li>
                  Note: Don’t begin new projects or expand current projects until the above review
                  is finished.
                </li>
              </ul>

              <p>
                To help teams identify potential issues and prioritize them for action, this Toolset
                walks teams through key issues reflected by 82 indicators and provides specific
                guidance to help make Project Risk Determinations, prioritize, and decide next
                steps.
              </p>

              <p>
                Screening for project risk occurs in two steps, ensuring a comprehensive analysis.
              </p>
              <p>
                The <b>Contextual Risk Screen</b> assesses human rights risk in the project’s
                geographic and social environment, which might or might not be linked to the
                project.
              </p>
              <p>
                The <b>Project Risk Screen</b> looks at identified contextual risks more concretely
                at present and future risks to the project, using the structured Project Risk
                Determination process.
              </p>
              <p>
                Responses to these screening assessments are scored and divided into four lists:
              </p>
              <ol>
                <li>
                  The <b>Research List</b> shows issues and indicators where further information is
                  needed which might be sourced from independent research, engaging with
                  Communities, or both. This must be completed before the Screens on those issues
                  can proceed.
                </li>
                <li>
                  The <b>Escalate List</b> reflects potentially severe human-rights risks, and
                  requires supervisory or a third-party perspective.
                </li>
                <li>
                  The <b>Prioritize List</b> reflects risks that should use the Rightsholder
                  Engagement Tool during project development.
                </li>
                <li>
                  The <b>Watch List</b> reflects less applicable project risks, which should be
                  reviewed yearly at a minimum. The Watch List also includes broader equity and
                  well-being considerations, which might be best addressed with tools not in this
                  Toolset.
                </li>
              </ol>

              <p>
                This tool is designed for field teams, who are expected to rely on their local
                knowledge and experience to complete the assessment. The tool does not require
                participation with Communities throughout, as such an onus could be burdensome for
                many Communities and raise representation issues.
              </p>

              <p>
                However, post-screening action steps, such as the development of more in-depth{" "}
                <b>human rights risk analyses or rightsholder engagements</b>, will require
                participation with Communities. At later stages, it might make sense to ask
                Communities to validate screening determinations.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-4">
          <Card className="sticky top-10">
            <CardHeader className="prose w-full">
              <CardTitle>Get started</CardTitle>
            </CardHeader>
            <CardContent className="prose w-full">
              <p>
                The Human Rights Screening Tool is designed to identify potential human rights
                risks, prioritize them for further action, and fulfill the larger responsibility of
                human rights due diligence
              </p>
              <Link href="/projects" className="block">
                <Button size="lg" className="w-full">
                  Get started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
}
