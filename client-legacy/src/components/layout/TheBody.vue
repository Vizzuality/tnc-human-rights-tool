<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="container screen-body">
    <span ref="pageTop"></span>
    <div class="grid page-subhead">
      <div class="col-0 sm:col-4 md:col-4 lg:col-3 xl:col-4">
        <div class="project-title">{{ activeProjectName }}</div>
        <!-- <div class="project-date">{{ hrtStore.date_updated }}</div> -->
        <TheSaveAndShare />
      </div>

      <div class="col-12 sm:col-8 md:col-8 lg:col-9 xl:col-8">
        <!-- <Steps :model="items" /> -->
        <TheWizardStepper />
      </div>
    </div>

    <div class="grid">
      <div class="col-0 sm:col-4 md:col-4 lg:col-3 xl:col-3">
        <TheSideNav />
      </div>

      <div class="col-12 sm:col-8 md:col-8 lg:col-9 xl:col-9 body-content">
        <!-- Conditionally render components based on section -->
        <div v-if="activeRoute.name === 'research'">
          <TheResearchHome />
        </div>
        <div v-if="activeRoute.name === 'research_wizard'">
          <TheResearchWizard />
        </div>
        <div v-if="activeRoute.name === 'contextual_risk_home'">
          <TheContextualRiskHome />
        </div>
        <div v-if="activeRoute.name === 'contextual_risk_wizard'">
          <TheContextualRiskWizard />
        </div>
        <div v-if="activeRoute.name === 'project_risk_home'">
          <TheProjectRiskHome />
        </div>
        <div v-if="activeRoute.name === 'project_risk_wizard'">
          <TheProjectRiskWizard />
        </div>
        <div v-if="activeRoute.name === 'follow_up_home'">
          <TheFollowUpHome />
        </div>
        <div v-if="activeRoute.name === 'follow_up_list'">
          <TheFollowUpList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";

import Steps from "primevue/steps";

import TheSideNav from "../layout/TheSideNav.vue";
import TheWizardStepper from "../layout/TheWizardStepper.vue";
import TheSaveAndShare from "../user/TheSaveAndShare.vue";

import TheResearchHome from "../research/TheResearchHome.vue";
import TheResearchWizard from "../research/TheResearchWizard.vue";
import TheContextualRiskHome from "../screening/TheContextualRiskHome.vue";
import TheContextualRiskWizard from "../screening/TheContextualRiskWizard.vue";
import TheProjectRiskHome from "../screening/TheProjectRiskHome.vue";
import TheProjectRiskWizard from "../screening/TheProjectRiskWizard.vue";
import TheFollowUpHome from "../followup/TheFollowUpHome.vue";
import TheFollowUpList from "../followup/TheFollowUpList.vue";

const hrtStore = useHrtStore();
const route = useRoute();
const activeRoute = computed(() => {
  // console.log('active route', route);
  return route;
});

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const activeProjectName = computed(() => {
  try {
    return hrtStore.activeProject.name;
  } catch (error) {
    return undefined;
  }
});

const items = [
  {
    label: "Research",
    to: "/research",
  },
  {
    label: "Contextual <br/> Screening",
    to: "/contextual_screening",
  },
  {
    label: "Project <br/> Screening",
    to: "/project_screening",
  },
  {
    label: "Follow-Up",
    to: "/follow-up",
  },
];
</script>

<style scoped>
.project-title {
  color: #26363d;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.2em;
}

.router-link-active {
  font-weight: bold;
  color: #1f79ad;
  color: #26363d;
  /* color: #38bb93; */
}

.page-subhead {
  margin: 0 -20px 20px -20px;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px 10px;
  background: #2ea680;
  color: white;
  position: relative;
}

.body-content {
  padding-top: 15px;
}

h2 {
  margin-bottom: 10px;
  margin-top: 15px;
}
h3 {
  margin: 0 0 10px !important;
  padding-bottom: 0;
}
p {
  margin: 0 0 20px !important;
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
  padding: 0px 20px 20px !important;
  margin-bottom: 20px !important;
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

img.project-geography {
  float: right;
  width: 300px;
  height: 300px;
  margin: 0 0 10px 20px;
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
  margin-bottom: 20px;
}
.textarea-label {
  display: block;
  width: 100%;
  color: #444;
  font-weight: bold;
  font-size: 14px;
}
.project-textarea-label {
  color: #444;
  display: block;
  margin-bottom: 2px;
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
