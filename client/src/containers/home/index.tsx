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
              <h1>Human Rights Screening Tool</h1>
              <p>
                Natural climate solutions are defined as being nature-based, sustainable, climate
                additional, measurable, and equitable. NCS projects are equitable if, at a minimum,
                they respect human rights and Indigenous self-determination. In practice, this
                requires conducting <strong>human rights due diligence (HRDD).</strong> HRDD is a
                multi-layered process of policy development, impact assessment, community
                engagement, risk mitigation, monitoring, and remedy mechanisms for unavoided harm,
                that should be embedded into project design and operations. A preliminary screening
                to identify and prioritize issues is a key part of getting started.
              </p>

              <p>
                The Human Rights Screening Tool was designed by NCS specialists at The Nature
                Conservancy, working with human rights consultants at{" "}
                <a href="https://www.forumnobis.org/" target="_blank" rel="noopener noreferrer">
                  Forum Nobis
                </a>
                , and is being piloted with field teams who are working directly with local
                communities. It offers a specific, actionable process through which teams can
                identify potential human rights risks and prioritize them, consistent with HRDD
                principles, for attention, community engagement, and action.
              </p>

              <p>
                This is the beta version of what is anticipated to be an open-source Tool hosted by
                naturebase and Nature4Climate for the community of conservation organizations,
                project developers, and communities working to advance NCS action. Users are invited
                to explore the Tool and consider ways it might be improved. After an initial period,
                interested users will be invited to contribute to an assessment process and become
                co-contributors to further development. In the meantime, please feel free to share
                your feedback with us using this{" "}
                <a
                  href="https://forms.office.com/Pages/ResponsePage.aspx?id=wW2-eY7Xu0uyK9mUwKQXp-XqznqFr39LkFCo48UkxPVUQlYyU1JIU0dGQTE2SzNCRkxXS1NJOTRINS4u"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  form
                </a>
                .
              </p>

              <p>
                Please note: This Human Rights Screening Tool is a self-assessment process to help
                teams identify human-rights-based project risks and prioritize risks for further
                attention and action in collaboration with communities to fulfill the larger
                responsibility of human rights due diligence. This Tool does not and is not intended
                to provide any specific advice on human rights issues or particular locations. This
                Tool is not intended as a human rights violation reporting instrument.{" "}
                <strong>
                  It is the responsibility of the user to report violations to the appropriate
                  organizational, national, or international authorities.
                </strong>
              </p>

              <p>
                This Tool is not intended to process personal information and users are advised to
                avoid entering such information into this Tool. Your privacy is important to us. Any
                and all information you enter in this Human Rights Screening Tool is for your
                personal use only and will not be accessible to other individual users. All data
                that you chose to insert into the self-assessment tool is owned by you and will not
                be actioned on or used by Nature4Climate or TNC for any purpose other than providing
                reports to you.{" "}
                <strong>
                  Please note: user-entered data will be deleted in June 2024 for the release of
                  version 2 of this tool.
                </strong>{" "}
                Users should download their reports prior to June 2024 to save their work. If users
                would like to have their account and the data therein deleted before that time,
                please contact us at{" "}
                <a href="mailto:help@naturebase.org" target="_blank" rel="noopener noreferrer">
                  help@naturebase.org
                </a>
                .
              </p>

              <p>
                Successful and lasting conservation should prioritize the human rights, collective
                rights, authority and capacity of all Indigenous Peoples and Local Communities,
                termed Communities in this tool, to manage and protect their lands and natural
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
                This Human Rights Screening Tool is a screening process to help conservation project
                teams:
              </p>

              <ol>
                <li>
                  <strong>identify</strong> human-rights-based project risks
                </li>
                <li>
                  <strong>prioritize</strong> risks for further attention and action in
                  collaboration with Communities
                </li>
                <li>
                  <strong>fulfill</strong> the larger responsibility of human rights due diligence
                </li>
              </ol>

              <p>The work of this Tool occurs in three phases:</p>

              <ol>
                <li>
                  Research
                  <ul>
                    <li>
                      Engage and conduct preliminary research
                      <ul>
                        <li>See Human Rights Guide, Module 1</li>
                      </ul>
                    </li>
                    <li>Complete Project and Community Background</li>
                  </ul>
                </li>
                <li>
                  Screening
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
                          Make Project Risk Determinations based on risks and issues identified in
                          the previous screen.
                        </li>
                        <li>Generate the Escalate List, Prioritize List, and Watch List</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Follow up
                  <ul>
                    <li>
                      Investigate Research List issues identified in Phase 2 above
                      <ul>
                        <li>
                          Perform another Contextual Risk Screen after this research is finished.
                        </li>
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
                        <li>
                          Look for opportunities to integrate this work into ongoing processes
                        </li>
                      </ul>
                    </li>
                    <li>
                      For issues on the Watch List, continue to monitor.
                      <ul>
                        <li>
                          Review this list annually at minimum, or more frequently as projects
                          demand.
                        </li>
                        <li>Review during project implementation.</li>
                        <li>
                          Review <Link href="/other-tools">Other Tools</Link> for any equity and
                          well-being concerns.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Note: Don’t begin new projects or expand current projects until the above
                      review is finished.
                    </li>
                  </ul>
                </li>
              </ol>

              <p>
                To help teams <strong>identify</strong> potential issues and{" "}
                <strong>prioritize</strong> them for action, this Tool walks teams through key
                issues reflected by 82 indicators and provides specific guidance to help make
                Project Risk Determinations, prioritize, and decide next steps.
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
                  Tool.
                </li>
              </ol>

              <p>
                This tool is designed for field teams, who are expected to rely on their local
                knowledge and experience to complete the assessment. The tool does not require
                participation with Communities throughout, as such an onus could be burdensome for
                many Communities and raise representation issues.
              </p>

              <p>
                However, post-screening action steps, such as the development of more in-depth human
                rights risk analyses or rightsholder engagements, will require participation with
                Communities. At later stages, it might make sense to ask Communities to validate
                screening determinations.
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
