<!-- eslint-disable vue/valid-template-root -->
<template>
  <div
    class="grid indicator-row"
    v-for="item in activeIndicators"
    :key="item.indicator_id"
  >
    <!-- Overview text -->
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="overview">
        <h3>{{ item.indicator_code }} {{ item.title }}</h3>
        <span v-html="item.description" class="project-description"></span>
        <span
          ><p><strong>Guidance: </strong> to be inserted via CMS</p></span
        >

        <ul v-if="route.params.indicator_id === 'killings'">
          <li>
            If the project is a new project and the extent of the killings is
            “widespread or systematic,” mark E.
          </li>
          <li>
            For an existing project, or if the killings are less extensive, or
            more in the nature of high crime levels, make a Project Risk
            Determination on the core risk that the project could be directly
            affected by the violence or could (be seen to) exacerbate,
            perpetuate, or inadvertently support underlying drivers of the
            violence, or fail to use available leverage to mitigate impacts.
          </li>
          <li>
            Issue-spotters and cross-references:
            <ul>
              <li>
                Risk to project staff and contractors, both national and
                international. Consider resources from TNC's Safety and Security
                office.
              </li>
              <li>
                The operation of the project without any instances of indicated
                harm is not by itself a basis for a low Project Risk
                determination. There should be reasons why the conduct is
                unlikely to affect project staff or operations.
              </li>
              <li>
                Consider risks of violence motivated by:
                <ul>
                  <li>
                    existence of project resources (including traditional assets
                    like vehicles and novel assets like carbon storage
                    resources);
                  </li>
                  <li>
                    efforts by actors to control access to a perceived wealthy
                    international organization;
                  </li>
                  <li>
                    benefits distribution or allocation decisions amongst rival
                    groups;
                  </li>
                  <li>
                    by perception that project, project participant, or actual/
                    perceived underlying cause or narrative (e.g. colonial
                    agenda) is aligned with or biased for or against any rival
                    group or faction.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- User inputs -->
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="indicator-risk-options">
        <div class="options-wrap">
          <span class="textarea-label">Project Risk Characterization</span>
          <RadioButton
            name="projectrisk1"
            value="Probable project risk"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_characterization
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_characterization'
              )
            "
          />
          <label for="projectrisk1">Probable project risk</label>
        </div>

        <div class="options-wrap">
          <RadioButton
            name="projectrisk2"
            value="Not applicable"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_characterization
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_characterization'
              )
            "
          />
          <label for="projectrisk2">Not applicable</label>
        </div>

        <div class="options-wrap">
          <RadioButton
            name="projectrisk3"
            value="Unlikely"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_characterization
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_characterization'
              )
            "
          />
          <label for="projectrisk3">Unlikely</label>
        </div>

        <div class="options-wrap">
          <RadioButton
            name="projectrisk3"
            value="Redressable"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_characterization
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_characterization'
              )
            "
          />
          <label for="projectrisk3">Redressable</label>
        </div>

        <div class="options-wrap">
          <RadioButton
            name="projectrisk4"
            value="Reliable mitigation"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_characterization
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_characterization'
              )
            "
          />
          <label for="projectrisk4"
            >Mitigation Already in place or Available</label
          >
        </div>

        <!-- <i class="fa-regular fa-note-sticky indicator-notes"></i> -->
      </div>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="indicator-risk-options">
        <span class="textarea-label">Project Risk Determination</span>
        <div class="options-wrap">
          <RadioButton
            name="project_determination1"
            value="Escalate"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_determination
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_determination'
              )
            "
          />
          <label for="project_determination1">Escalate</label>
        </div>

        <div class="options-wrap">
          <RadioButton
            name="project_determination2"
            value="Priority"
            v-model="
              hrtStore.indicatorResponsesObject[item.indicator_id]
                .project_risk_determination
            "
            @change="
              projectRiskEdit(
                hrtStore.indicatorResponsesObject[item.indicator_id],
                'project_risk_determination'
              )
            "
          />
          <label for="project_determination2">Priority</label>
        </div>

        <div class="options-wrap"></div>
        <RadioButton
          name="project_determination3"
          value="Watch"
          v-model="
            hrtStore.indicatorResponsesObject[item.indicator_id]
              .project_risk_determination
          "
          @change="
            projectRiskEdit(
              hrtStore.indicatorResponsesObject[item.indicator_id],
              'project_risk_determination'
            )
          "
        />
        <label for="project_determination3">Watch</label>

        <!-- <i class="fa-regular fa-note-sticky indicator-notes"></i> -->
      </div>
    </div>

    <div class="col-10">
      <span class="project-textarea-label">
        <strong>Contextual Screening Risk Notes</strong> &mdash; Notes you
        previously entered about contextual risk.
      </span>

      <!-- Need click outside directive to send update to DB update queue -->
      <Textarea
        v-model="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .contextual_risk_notes
        "
        @change="
          projectRiskEdit(
            hrtStore.indicatorResponsesObject[item.indicator_id],
            'contextual_risk_notes'
          )
        "
        rows="5"
        class="textarea"
      />
    </div>

    <div class="col-10">
      <span class="project-textarea-label">
        <strong>Project-specific Risks</strong> &mdash; Redescribe indicated
        risk as applicable to project or describe any other related potentially
        applicable risks. Otherwise proceed based on the contextual risk and
        specific risks described in the notes.
      </span>
      <!-- Need click outside directive to send update to DB update queue -->
      <Textarea
        v-model="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .project_risk_notes
        "
        @change="
          projectRiskEdit(
            hrtStore.indicatorResponsesObject[item.indicator_id],
            'project_risk_notes'
          )
        "
        rows="5"
        class="textarea"
      />
    </div>

    <div class="col-10">
      <span class="project-textarea-label">
        <strong>Research/Engagement</strong> &mdash; Briefly describe extent of
        research and Community engagement on the risk.
      </span>
      <!-- Need click outside directive to send update to DB update queue -->
      <Textarea
        v-model="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .project_engagement_notes
        "
        @change="
          projectRiskEdit(
            hrtStore.indicatorResponsesObject[item.indicator_id],
            'project_engagement_notes'
          )
        "
        rows="5"
        class="textarea"
      />
    </div>
    <div class="col-10">
      <span class="project-textarea-label">
        <strong>Project risk determination reasons</strong> &mdash; Briefly
        describe the specific NAURMAL reasons the screening team determined that
        the indicated risk was not applicable, unlikely, redressable, or that
        mitigation strategy was readily available, and the scope of the risk is
        limited.
      </span>
      <!-- Need click outside directive to send update to DB update queue -->
      <Textarea
        v-model="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .project_risk_determination_notes
        "
        @change="
          projectRiskEdit(
            hrtStore.indicatorResponsesObject[item.indicator_id],
            'project_risk_determination_notes'
          )
        "
        rows="5"
        class="textarea"
      />
    </div>
  </div>

  <!-- Need to right-align next button. Probably should do this with flex box -->

  <div class="next-section" v-if="nextIndicator">
    <p>
      <em>Next: {{ nextIndicator.title }}</em>
      <router-link
        :to="nextIndicator.indicator_slug + `?sid=${hrtStore.sessionId}`"
      >
        <Button
          label="Next Indicator"
          class="p-button-sm next-button"
          @click="scrollToTop"
        />
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";
import { queryDataApi, protectedQueryDataApi } from "../../helpers/apiAccess";

import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
// import TheScreeningNav from './TheScreeningNav.vue';
import TheSideNav from "../layout/TheSideNav.vue";

const hrtStore = useHrtStore();
const route = useRoute();

const activeIndicators = computed(() => {
  let indicators = hrtStore.indicatorResponsesArray;
  //let indicators = hrtStore.combinedIndicators;

  let filteredIndicators = indicators.filter(
    (indicator) => indicator.indicator_slug === route.params.indicator_id
  );

  return filteredIndicators;
});

const nextIndicator = computed(() => {
  let projectIndicators = hrtStore.projectIndicators;
  let indicatorsCount = hrtStore.projectIndicators.length;

  const index = projectIndicators.findIndex((element, index) => {
    if (element.indicator_slug === route.params.indicator_id) {
      return true;
    }
  });
  const nextId = index + 1;

  if (indicatorsCount > nextId) {
    return projectIndicators[nextId];
  } else {
    return null;
  }
});

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const projectRiskEdit = (params, field_name) => {
  protectedQueryDataApi({
    route: `indicator`,
    type: "POST",
    body: {
      indicator_id: params.indicator_id,
      session_id: hrtStore.sessionId,
      field_name: field_name,
      field_value: params[field_name],
    },
  });
};
// const projectRiskEdit = (params, field_name) => {
//   queryDataApi({
//     route: `indicator`,
//     type: 'POST',
//     body: {
//       indicator_id: params.indicator_id,
//       session_id: hrtStore.sessionId,
//       field_name: field_name,
//       field_value: params[field_name],
//     },
//   });
// };
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
  margin-top: 15px;
}
h3 {
  margin: 0 0 0px !important;
  padding-bottom: 0;
}
p {
  margin: 0 0 20px;
  padding-top: 0;
  padding-right: 40px;
  color: #444;
}
li {
  color: #444;
}

a {
  text-decoration: none;
}
.container {
  margin: 20px 30px;
}
.screen-body {
  background: white;
  border: 1px solid #ccc;
  padding: 20px 20px !important;
  margin-bottom: 20px;
}
.screen-body p {
  margin-bottom: 0;
}
.overview {
  background: #ecf7fa;
  padding: 10px 20px 10px;
  margin-bottom: 20px;
  /* width: 90%; */
}
.overview p {
  font-size: 18px;
  font-style: italic;
  line-height: 1.5em;
  margin-bottom: 20px;
}

.project-description {
  margin-top: 10px;
  display: block;
}

.indicator-row {
  margin-bottom: 20px;
}
.indicator-options {
  margin-top: 30px;
}
.indicator-notes {
  color: #888;
  font-size: 20px;
  margin-left: 40px;
}
.p-inputtext {
  color: #3b89b6 !important;
}
label {
  margin: 0px 15px 0 5px;
  padding-top: 5px;
  color: #222;
}
.textarea {
  display: block;
  width: 100%;
}
.textarea-label {
  display: block;
  width: 100%;
  color: #444;
  font-weight: bold;
  font-size: 14px;
}

.project-textarea-label {
  display: block;
  width: 100%;
  color: #444;
  /* font-weight: bold; */
  font-size: 14px;
}

.next-section {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
.next-button {
  margin-left: 40px !important;
  margin-top: 5px !important;
  background: #1f79ad !important;
  float: right;
}

.p-radiobutton .p-radiobutton-box.p-highlight {
  border-color: #38bb93 !important;
  background: #38bb93 !important;
}

.p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
  background: #4cbadd;
  background: #38bb93 !important;
}

@media screen and (max-width: 1000px) {
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .overview p {
    font-size: 16px;
    padding-right: 0;
    margin-right: 20px;
  }
  .indicator-row p {
    font-size: 15px;
  }
  .indicator-options {
    margin-top: 0px;
  }
  label {
    font-size: 15px;
  }
}
</style>
