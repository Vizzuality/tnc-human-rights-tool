"use client";

import Link from "next/link";

import { useGetMessages } from "@/types/generated/message";

import Wrapper from "@/containers/wrapper";

export default function Glossary() {
  const { data, isFetched } = useGetMessages({ populate: "*" });

  const messages = isFetched && data?.data && data?.data[0]?.attributes;

  return (
    <Wrapper>
      <div className="grid grid-cols-12 gap-y-10 lg:gap-20">
        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-10">
            <div className="prose w-full">
              {messages && <h1>{messages.glossary}</h1>}

              <p>Definitions of the most common terms in the context of the HR Tool</p>

              <div id="any-multiple-frequent-and-pervasive">
                <h2>Any, Multiple, Frequent, and Pervasive</h2>
                <p>
                  These terms are used, not interchangeably, to calibrate frequency or persistence
                  of incidents. They each have a slightly different meaning:
                </p>
                <ul>
                  <li>
                    <strong>any:</strong> at least one incident
                  </li>
                  <li>
                    <strong>multiple:</strong> two or more incidents
                  </li>
                  <li>
                    <strong>frequent:</strong> more than two incidents, and somewhat geographically
                    dependent — three incidents in a small community might be deemed “frequent”
                    rather than merely “multiple”
                  </li>
                  <li>
                    <strong>pervasive:</strong> high frequency over both time and geographic scope
                  </li>
                </ul>
                <blockquote>
                  NOTE: Using “frequent” and “pervasive” with strictest rigor will help teams
                  prioritize.
                </blockquote>
                See also:{" "}
                <Link href="/glossary#widespread-and-systematic">widespread and systematic</Link>
              </div>

              <div id="cause">
                <h2>Cause</h2>
                <p>
                  The infliction of impact or reduction of a group or person’s ability to enjoy a
                  human right by direct action or failure to act.
                </p>

                <blockquote>
                  Example: XYZ Company caused adverse impacts in the Community by refusing to
                  address its emissions standards.
                </blockquote>
              </div>

              <div id="communities">
                <h2>Communities</h2>
                <p>A broader term than IPLC, used to describe multiple groups of rightsholders.</p>

                <blockquote>
                  NOTE: When the reference is to Project Site, Area, or Region Communities, this is
                  a specific subset defined in the Community Identification.
                </blockquote>
              </div>

              <div id="contribute">
                <h2>Contribute</h2>
                <p>
                  The infliction of impact or reduction of a group or person’s ability to enjoy a
                  human right by indirect action that facilitates the impact through the direct
                  actions of a third party.
                </p>

                <blockquote>
                  Example: XYZ Company contributed to adverse impacts in the Community by
                  unknowingly providing benefit to a militia group.
                </blockquote>
              </div>

              <div id="directly-linked">
                <h2>Directly linked</h2>
                <p>
                  The infliction of impact or reduction of a group or person’s ability to enjoy a
                  human right by a relationship with a third party that is contributing to or
                  causing an adverse impact.
                </p>

                <blockquote>
                  Example: By funding its projects, ABC Company is directly linked to XYZ company,
                  which has both caused and contributed to adverse Community impacts in the past.
                </blockquote>
              </div>

              <div id="disappearance">
                <h2>Disappearance</h2>
                <p>
                  The enforced or involuntary arrest, detention or deprivation of liberty of a
                  person by agents of an organized authority, followed by concealment of their fate
                  or whereabouts.
                </p>

                <blockquote>
                  See also: International Convention for the Protection of All Persons from Enforced
                  Disappearance — Preamble of the Declaration, and Article 2
                </blockquote>
              </div>

              <div id="drivers">
                <h2>Drivers</h2>
                <p>
                  The causes, institutions, social norms, assumptions, environmental factors and
                  other actors that sustain a state of conflict.
                </p>
              </div>

              <div id="forced-labor">
                <h2>Forced Labor</h2>
                <p>
                  Labor coerced by threats of violence, seizure of documents or property, or worker
                  debt/bondage.
                </p>
              </div>

              <div id="gender-responsive">
                <h2>Gender Responsive</h2>
                <p>
                  Describes any approach, strategy, or framework where planning, programming,
                  budgeting that contribute to the advancement of gender equality and the
                  fulfillment of women’s rights are given priority (UN Women). This advancement will
                  involve changing gender norms, roles and access to resources as a key component of
                  project outcomes.
                </p>

                <blockquote>
                  Note: This description was adapted from Eckman, A. 2002 by INSTRAW)
                </blockquote>
              </div>

              <div id="gender-transformative">
                <h2>Gender Transformative</h2>
                <p>
                  Describes any approach, strategy, or framework that includes critical awareness of
                  gender roles and norms among men and women, challenges the distribution of
                  resources and allocation of duties between men and women, and promotes the
                  position of women while addressing power relationships between women and others in
                  the community (Interagency Gender Working Group, USAID). This approach focuses on
                  deconstructing hierarchical gender norms, constructing new concepts of masculinity
                  and femininity and thereby transforming underlying power relations (CGIAR, 2012).
                </p>
              </div>

              <div id="human-rights-due-diligence">
                <h2>Human rights due diligence</h2>
                <p>
                  <i>
                    This definition was modified from the description on the United Nations website.
                  </i>
                </p>
                <p>
                  Performing human rights due diligence helps proactively manage adverse human
                  rights impacts. There are four core components:
                </p>
                <ol className="list-[lower-alpha]">
                  <li>
                    Identifying potential adverse human rights impacts that an enterprise causes,
                    contributes to, or is directly linked to
                  </li>
                  <li>
                    Integrating findings across company processes and taking action to address those
                    impacts
                  </li>
                  <li>Tracking and measuring these processes to understand if they are working</li>
                  <li>
                    Communicating how impacts are being addressed to stakeholders, particularly
                    those affected.
                  </li>
                </ol>

                <p>Enterprises should identify and assess risks within and across:</p>
                <ul>
                  <li>Geographic context</li>
                  <li>Industry sector </li>
                  <li>Business relationships</li>
                  <li>Their internal activities (HQ and any subsidiaries) </li>
                  <li>Their value chain</li>
                </ul>
                <p>
                  The purpose of human rights due diligence is to prevent adverse impacts on people.
                  Risks to people, not risks to business, are the priority. Stakeholder engagement
                  is important to this process; focus particularly on affected stakeholders, human
                  rights defenders (who may be under increased risk of threat), trade unions, and
                  grassroots organizers.
                </p>
                <p>These assessments should be ongoing.</p>
              </div>

              <div id="land-grab">
                <h2>Land grab</h2>
                <p>
                  Forced transaction by legal or illegal means, including corruption, coercion, or
                  superior legal resources, wherein powerful outsiders take control of land from
                  Communities who don’t want to relinquish it.
                </p>
              </div>

              <div id="leverage">
                <h2>Leverage</h2>
                <p>
                  The ability of an enterprise to effect change in the wrongful practices of another
                  party that is causing or contributing to an adverse human rights impact.
                </p>
              </div>

              <div id="minimum-core-standards">
                <h2>Minimum core standards</h2>
                <p>
                  Basic levels of socioeconomic rights, including rights to food, water, housing,
                  medical care, education, and other standards of living.
                </p>

                <blockquote>See also: Minimum Core Risk Analysis</blockquote>
              </div>

              <div id="organized-authority">
                <h2>Organized authority</h2>
                <p>
                  Militias, gangs, private/corporate entities, or any other actor or group acting as
                  a de facto state authority with acquiescence of the state government.
                </p>
              </div>

              <div id="politically-motivated-killings-persecution">
                <h2>Politically Motivated Killings / Persecution</h2>
                <p>
                  The targeting of individuals based on their affiliation, membership, or identity,
                  including race, ethnicity, sex, gender, sexuality, religion, nationality,
                  migrancy, or social status.
                </p>
              </div>

              <div id="progressive-realization">
                <h2>Progressive Realization</h2>
                <p>
                  States have obligations around economic, social and cultural rights under
                  international human rights treaties. The core obligation is to work toward the
                  full realization of economic, social, and cultural rights for all people (see fact
                  sheet below).
                </p>
                <p>
                  These rights can be hampered by a lack of available resources, and they can only
                  be achieved over a period of time. Therefore, a State’s compliance with this
                  obligation is considered alongside the resources, financial and otherwise,
                  available to it. Hence, many national constitutions allow for the progressive
                  realization of these rights.
                </p>
                <blockquote>
                  See also: FAQ on Economic, Social, and Cultural Rights fact sheet, p. 13-14
                </blockquote>
              </div>

              <div id="project-risk">
                <h2>Project Risk</h2>
                <p>
                  The possibility that a project’s activities could cause, contribute to, or become
                  directly linked with adverse human rights impacts, as defined first by teams and
                  revisited/validated by Communities during later due diligence.
                </p>
                <blockquote>See also: Project Risk Determination Framework</blockquote>
              </div>

              <div id="project-site-area-region-category">
                <h2>Project Site, Area, Region, Category</h2>
                <p>
                  Projects are considered on the basis of their geographic scope, as further
                  outlined in the Project and Community Background of this guide.
                </p>
                <ul>
                  <li>
                    <strong>Project Site</strong> refers to any specific site that has already been
                    identified for inclusion in the project scope and where project implementation
                    activities will occur.
                  </li>
                  <li>
                    <strong>Project Area</strong> refers to the Project Site plus nearby
                    geographies. Within the scope of this area, groups know or know of each other,
                    and communicate about issues. Given the right circumstances (e.g., funding,
                    community interest), there could be potential for expansion of the project
                    across this area without significantly changing project objectives or approach.
                  </li>
                  <li>
                    <strong>Project Region or Ecoregion</strong> automatically includes both Project
                    Area and Site, plus other regional communities that face similar issues, or
                    political or environmental dynamics.
                  </li>
                </ul>
              </div>

              <div id="self-determination">
                <h2>Self-determination</h2>
                <p>
                  The right of Indigenous Peoples, enshrined in UNDRIP, to maintain and strengthen
                  their distinct political, legal, economic, social and cultural institutions, while
                  retaining their right to participate fully in the political, economic, social and
                  cultural life of the state. Unlawful impacts to self-determination might include
                  any or all of the following:
                </p>
                <ul>
                  <li>Lack of consultation/consent</li>
                  <li>Disproportionate impact</li>
                  <li>Unlawful discrimination</li>
                  <li>Purposeful harm toward Indigenous institutions and practices</li>
                  <li>Interlinkage with other human rights violations</li>
                </ul>
              </div>

              <div id="salient">
                <h2>Salient</h2>
                <p>
                  Significant, important, or prominent, as applied to an issue that Communities and
                  their partnering organizations care about and are consciously aware of.
                </p>
                <blockquote>
                  Note: This term excludes issues that only one or a few people are concerned about
                  that do not represent the larger context.
                </blockquote>
              </div>

              <div id="unlawful-discrimination">
                <h2>Unlawful Discrimination</h2>
                <p>
                  Inequitable discrimination that is not in compliance with national law and that is
                  motivated by race, color, sex, language, religion, political or other opinion,
                  national or social origin, property, birth, ability, gender, or other status.
                </p>
                <blockquote>
                  See also: International Covenant on Civil and Political Rights, arts. 2, 26. e.g.,
                  Committee on the Elimination of Discrimination against Women, ON and DP v Russian
                  Federation, para. 7.2 (3 Apr. 2020). the Convention on the Elimination of Racial
                  Discrimination (42) (4) the Convention on the Elimination of Discrimination
                  Against Women (29) (5) the Convention on the Rights of Persons with
                  Disabilities(43) (6) the International Convention on the Protection of the Rights
                  of All Migrant Workers (44)
                </blockquote>
              </div>

              <div id="vulnerable-identities">
                <h2>Vulnerable Identities</h2>
                <p>
                  Groups who are or have been subject to legacies of oppression and whose rights
                  must be protected with additional measures, including but not limited to women,
                  youth, older persons, persons with disabilities, racial and ethnic minorities,
                  LGBTQI2S+ persons, refugees, migrants, human rights defenders, people suffering
                  poverty, and people living with HIV/AIDS or other chronic health conditions.
                </p>
              </div>

              <div id="widespread-and-systematic">
                <h2>Widespread and systematic</h2>
                <p>
                  Beyond pervasive, this term refers to calculated and dangerous patterns of abuse.
                  Consider the following factors:
                </p>
                <ul>
                  <li>
                    Frequency: massive, collective, repeating often, or directed against large
                    numbers of civilian victims
                  </li>
                  <li>Organized: implemented in a strategic or planned fashion</li>
                  <li>
                    Geographically widespread: orchestrated across multiple geographic regions
                  </li>
                  <li>Temporally widespread: persistent over long periods of time</li>
                  <li>
                    Targeted: victims are chosen by their membership in a particular population.
                  </li>
                </ul>
              </div>

              <div id="worst-forms-of-child-labor">
                <h2>Worst forms of child labor</h2>
                <p>Prohibited exploitative practices against children, including:</p>
                <ul>
                  <li>
                    all forms of slavery or practices similar to slavery, trafficking, debt bondage,
                    or forced labor
                  </li>
                  <li>any use of children in armed conflict, child prostitution, or pornography</li>
                  <li>
                    any use children for illicit activities, in particular for the production and
                    trafficking of drugs
                  </li>
                  <li>any work which is likely to harm the health, safety or morals of children</li>
                </ul>

                <blockquote>
                  See also: ILO Convention No 182, the Worst Forms of Child Labour Convention(48)
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
