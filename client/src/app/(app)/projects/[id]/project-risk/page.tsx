import ProjectsDetailContent from "@/containers/projects/detail/content";
import ProjectsDetailTitle from "@/containers/projects/detail/title";

export default async function ProjectsDetailProjectRiskPage() {
  return (
    <ProjectsDetailContent>
      <ProjectsDetailTitle>Project Risk</ProjectsDetailTitle>

      <div>
        <div className="prose -mt-5">
          <p>
            Here in the Project Risk screen, we narrow our focus from surrounding context onto our
            specific project. Only indicators identified in the Contextual Risk Screen are carried
            over here.
          </p>
          <p>
            Historically, teams have asked for more guidance about how best to approach making a
            project risk determination. Any project could be subject to a spectrum of links to risk,
            as they could (or could be seen to) exacerbate, perpetuate, inadvertently support,
            tolerate, or fail to use available leverage to address Community members’ (or other
            stakeholders’) concerns. Teams should always examine the entire spectrum of links to
            risk from direct causation to tolerating, though we will use the shorthand “exacerbate
            or tolerate” to encompass the entire spectrum of possible harms. Further guidance exists
            in the form of the Project Risk Determination, which will be available throughout as a
            tool helper. The determination directs teams to look at specific factors of the risk
            (whether it is Not Applicable or Unlikely, whether there is Reliable Mitigation Already
            in place or genuinely Available, or whether the risk is otherwise Limited) and provides
            specific guidance on each. Using this tool, teams are also asked to make a judgment call
            on whether a project risk is high or low.
          </p>
          <p>
            The screen instructs the team how risk should be scored based on the level of the risk
            indicated. Risks are marked into three categories:
          </p>
          <ul>
            <li>
              <b>E — Escalate List</b>, for serious risks that must be assessed by experts at the
              country, regional or global level.
            </li>
            <li>
              <b>P — Prioritize List</b>, for serious risks that can be addressed at the project
              team level.
            </li>
            <li>
              <b>W — Watch List</b>, for lower risks that need to be monitored and reviewed yearly,
              or for better-understood <b>Equity and Well-Being</b> considerations.
            </li>
          </ul>

          <h2>Application and Results</h2>

          <p>
            As in the Contextual Risk Screen, teams should not see themselves as weighing the
            evidence or requiring extensive documentation. Even a single specific allegation may be
            enough to justify listing it for further analysis, depending on the circumstances.
          </p>

          <p>The Project Risk Screen requires the project team to describe:</p>

          <ol>
            <li>The risk</li>
            <li>All engagement about the risk with Communities to date</li>
            <li>
              Specific reasons, if any, why the contextual risk might not present a project risk.
            </li>
          </ol>

          <p>
            Without these reasons, it’s assumed that the contextual risk will affect the project and
            thus, should be considered a project risk.
          </p>

          <h2>Indicator Tables: instructions & example</h2>

          <h3>Specific Risks:</h3>
          <p>Describe the indicated risk as it applies to this project.</p>
          <p>
            <i>
              &quot;Our work with women in post-catch activity would likely increase their
              opportunity and income. All village fishing (including post-catch work done by women)
              is managed through cooperatives, and fishers (who are all male) are allowed to
              participate in cooperative decision-making. Challenging this structure might prevent
              cooperatives from participating with us, and it might bring unintended negative
              impacts on women in the Community.&quot;
            </i>
          </p>

          <h3>Research/engagement:</h3>
          <p>Briefly describe research and Community engagement on this risk.</p>
          <p>
            <i>
              &quot;We discussed this with Community women at women-only meetings on the following
              dates: Jan. 12, Apr. 4, Apr. 18. They are frustrated with the arrangement but don’t
              feel like now is the time to demand a change. They think once new programs start, they
              will be in a better position to demand a change. Fishing cooperatives are aware of the
              women’s frustration, but there are no plans to do anything about it.&quot;
            </i>
          </p>

          <h3>Key Project Risk Determination Factors:</h3>
          <p>Describe key factors used to determine the risk as high or low.</p>
          <p>
            <i>
              &quot;Because we are expressly following the lead of women in the Communities, we
              think the risk is authorized by the rightsholder. We stand ready to support women in
              attempting to change the situation so that women can be included in decision-making
              when they determine the time is right. Fishing cooperatives have made a number of
              accommodations to improve conservation outcomes to get the project running, so we
              expect there would be some responsiveness when the time comes to push for a change.
              Many details would need to be worked out but we think this counts as a reliable
              mitigation strategy.&quot;
            </i>
          </p>
        </div>
      </div>
    </ProjectsDetailContent>
  );
}
