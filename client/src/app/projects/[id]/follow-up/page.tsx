import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

export default async function ProjectsDetailFollowUpPage() {
  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Results Tables</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          <p>
            Summary information is pulled from the screening process and codified into the Research,
            Escalate, Prioritize, and Watch Lists. These results tables are designed to help
            organize action and recommendations for teams to pursue.
          </p>
          <p>
            There is potential for items on these lists to overlap. Project teams are expected to
            use their discretion to set priorities and schedule analyses and check-ins at various
            stages of project design and implementation. This should ensure transparency and
            accountability, while also prioritizing the expertise of local management from
            Communities.
          </p>
          <p>
            Once teams have reviewed and completed the follow up prompts for each results table, a
            report will be generated summarizing the entire screening process results. To view your
            report, click here.
          </p>

          <h2>Research list</h2>
          <p>
            Table R – Research List. Issues from the Contextual Risk Screen requiring further
            research and Community engagement in order to complete the screening process. See
            further guidance in the Overview.
          </p>
          <p>From Contextual Risk Screen tables:</p>
          <ul>
            <li>Note the indicated risk</li>
            <li>Note any specific, more narrow risk</li>
            <li>Note any Community engagement to date</li>
            <li>Note further research options</li>
            <li>
              Outline action plan on how needed information will be gathered and who is accountable
              for it.
            </li>
          </ul>

          <h2>Escalate List</h2>
          <p>
            Table E – Escalate List. The risk of severe violations means teams should hold off on
            initiation or expansion of a project until issues are reviewed by business unit
            leadership and TNC’s Human Rights Director. See further guidance in the Overview.
          </p>
          <p>From Project Risk Screen tables:</p>
          <ul>
            <li>Note the indicated risk</li>
            <li>Note any specific, more narrow risk</li>
            <li>Note any Community engagement to date</li>
            <li>
              Include relevant Project Risk Determination factors (e.g., likelihood, mitigation,
              scope).
            </li>
            <li>Note follow up plans</li>
          </ul>

          <h2>Prioritize List</h2>
          <p>
            Table A – Prioritize List. Risks in this category might merit Rightsholder Engagement
            analysis or oversight from Communities. See further guidance in the Overview.
          </p>
          <p>From Project Risk Screen tables:</p>
          <ul>
            <li>Note the indicated risk</li>
            <li>Note any specific, more narrow risk</li>
            <li>Note any Community engagement to date</li>
            <li>
              Using the Project Risk Determination, enumerate reasons risk was marked a high or low
              Project Risk.
            </li>
            <li>Note follow up plans</li>
          </ul>

          <h2>Watch List</h2>
          <p>
            For any other issues teams might want to bear in mind as they progress on project work,
            the Watch List is a place to capture items for annual review.
          </p>
          <p>Two types of entries are relevant:</p>
          <ul>
            <li>
              Risks identified in the Contextual Risk Screen that were deemed low risk. Situations
              can change, as can our understanding of them. Low contextual risks should be
              considered and reassessed every six-twelve months.
            </li>
            <li>
              Equity & well-being considerations that did not present a risk of a minimum core
              rights violation. This Watch List helps teams keep these important issues in mind as
              they assess the social and economic impacts of their project.
            </li>
          </ul>

          <p>
            Table W – Watch List. Lower priority risks that should be run past Communities,
            considered during implementation, and regularly reviewed. See further guidance in the
            Overview.
          </p>
          <ul>
            <li>Note the indicated risk</li>
            <li>Note any specific, more narrow risk</li>
            <li>Note any Community engagement to date</li>
            <li>
              Using the Project Risk Determination, enumerate reasons risk was marked a high or low
              Project Risk.
            </li>
            <li>Note further research options</li>
            <li>
              Note preliminary impressions on Other Tools that might be useful as well as how the
              team intends to monitor issues, including accountabilities.
            </li>
          </ul>
        </div>
      </div>
    </ProjectsDetailContent>
  );
}
