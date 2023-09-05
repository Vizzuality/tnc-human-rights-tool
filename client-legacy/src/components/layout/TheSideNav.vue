<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="sidenav">
    <!-- <p>{{ activeRoute }}</p> -->
    <!-- RESEARCH ------------------------ -->
    <!-- <h2><router-link :to="`../`"> Home </router-link></h2> -->
    <!-- <h2 
      v-if="
          activeRoute.name === 'research' ||
          activeRoute.name === 'research_wizard'
        "   
    >
      <router-link :to="`../research?sid=${hrtStore.sessionId}`">
        Research
      </router-link>
    </h2> -->
    <ul
      v-if="
        activeRoute.name === 'research' ||
        activeRoute.name === 'research_wizard'
      "
    >
      <li><router-link to="../research">Overview</router-link></li>
      <li>
        <router-link :to="`../research/iplc?sid=${hrtStore.sessionId}`"
          >IPLC</router-link
        >
      </li>

      <li>Gender &amp; vulnerable groups</li>
      <li>Stakeholders &amp; interested parties</li>
      <li>Carbon offset project controversies</li>
      <li>Research Summary</li>

      <!-- <li>
        <router-link :to="`../research/gender?sid=${hrtStore.sessionId}`"
          >Gender &amp; vulnerable groups</router-link
        >
      </li>
      <li>
        <router-link :to="`../research/stakeholders?sid=${hrtStore.sessionId}`"
          >Stakeholders &amp; interested parties</router-link
        >
      </li>
      <li>
        <router-link :to="`../research/controversies?sid=${hrtStore.sessionId}`" 
          >Carbon offset project controversies</router-link 
        >
      </li>
      <li>
        <router-link :to="`../research/summary?sid=${hrtStore.sessionId}`"
          >Research Summary</router-link
        >
      </li> -->
    </ul>

    <!-- CONTEXTUAL SCREENING ------------------------ -->
    <!-- <h2
      v-if="
          activeRoute.name === 'contextual_risk_home' ||
          activeRoute.name === 'contextual_risk_wizard'
        "
    >
      <router-link :to="`../contextual_risk?sid=${hrtStore.sessionId}`">
        Contextual Screening
      </router-link>
    </h2> -->
    <ul
      v-if="
        activeRoute.name === 'contextual_risk_home' ||
        activeRoute.name === 'contextual_risk_wizard'
      "
    >
      <li>
        <router-link to="../contextual_risk">Overview</router-link>
      </li>
      <li v-for="item in indicatorCategories" :key="item">
        <span v-if="item.indicators_contextual_pct < 100">
          <circle-progress
            :percent="item.indicators_contextual_pct"
            :size="16"
            :border-width="3"
            :border-bg-width="3"
            fill-color="#38bb93"
          />
        </span>
        <span v-else><i class="fa-solid fa-check project-completed"></i></span>

        <!-- <router-link :to="String(item.display_order)"> -->
        <router-link
          :to="`../contextual_risk/${item.category_slug}?sid=${hrtStore.sessionId}`"
        >
          {{ item.title }}
        </router-link>
        <span class="item-count"
          >({{ item.indicators_filled }}/{{ item.indicators_count }})</span
        >
      </li>
    </ul>

    <!-- PROJECT SCREENING ------------------------ -->
    <!-- <h2
      v-if="
        indicatorCategories.length > 0 &&
        (activeRoute.name === 'project_risk_home' ||
          activeRoute.name === 'project_risk_wizard')
      "
    >
      <router-link :to="`../project_risk?sid=${hrtStore.sessionId}`">
        Project Screening
      </router-link>
    </h2> -->
    <ul
      v-if="
        indicatorCategories.length > 0 &&
        (activeRoute.name === 'project_risk_home' ||
          activeRoute.name === 'project_risk_wizard')
      "
    >
      <li><router-link to="../project_risk">Overview</router-link></li>
      <!-- NEED TO REFACTOR. NOW TRACKING PROGRESS ON SEPARATE OBJECT -->
      <li v-for="item in projectIndicators" :key="item">
        <span v-if="projectScreeningCompleted(item)">
          <i class="fa-solid fa-check project-completed"></i>
        </span>
        <!-- <span v-if="indicatorSeverityIcon(item)">
          <i class="fa-solid fa-check project-completed"></i>
        </span> -->
        <!-- <router-link :to="String(item.display_order)"> -->
        <router-link
          :to="`../project_risk/${item.indicator_slug}?sid=${hrtStore.sessionId}`"
        >
          {{ item.indicator_code }} &dash; {{ item.title }}
        </router-link>
      </li>
    </ul>

    <!-- FOLLOW UP ------------------------ -->
    <!-- <h2
      v-if="
        indicatorCategories.length > 0 &&
        (activeRoute.name === 'follow_up_home' ||
          activeRoute.name === 'follow_up_list')
      "
    >
      <router-link :to="`../follow-up?sid=${hrtStore.sessionId}`">
        Follow-up
      </router-link>
    </h2> -->
    <ul
      v-if="
        indicatorCategories.length > 0 &&
        (activeRoute.name === 'follow_up_home' ||
          activeRoute.name === 'follow_up_list')
      "
    >
      <li><router-link :to="`../follow-up`"> Overview </router-link></li>
      <li v-if="escalateListLength > 0">
        <router-link :to="`../follow-up/escalate?sid=${hrtStore.sessionId}`">
          Escalate
          <span class="item-count"
            >({{ escalateListLength }})</span
          ></router-link
        >
      </li>
      <li v-if="priorityListLength > 0">
        <router-link :to="`../follow-up/priority?sid=${hrtStore.sessionId}`">
          Priority
          <span class="item-count"
            >({{ priorityListLength }})</span
          ></router-link
        >
      </li>
      <li v-if="watchListLength > 0">
        <router-link :to="`../follow-up/watch?sid=${hrtStore.sessionId}`">
          Watch
          <span class="item-count">({{ watchListLength }})</span></router-link
        >
      </li>
      <li v-if="researchListLength > 0">
        <router-link :to="`../follow-up/research?sid=${hrtStore.sessionId}`">
          Research
          <span class="item-count"
            >({{ researchListLength }})</span
          ></router-link
        >
      </li>
    </ul>
    <TheSaveIndicator />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";

import TheSaveIndicator from "./TheSaveIndicator.vue";

import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

const hrtStore = useHrtStore();
const route = useRoute();

const indicatorResponsesArray = computed(
  () => hrtStore.indicatorResponsesArray
);

// const indicatorCategories = computed(() => hrtStore.indicatorCategories);
const indicatorCategories = computed(() => hrtStore.contextualProgress);
const projectIndicators = computed(() => hrtStore.projectIndicators);

const escalateListLength = computed(() => hrtStore.followupEscalateList.length);
const priorityListLength = computed(() => hrtStore.followupPriorityList.length);
const watchListLength = computed(() => hrtStore.followupWatchList.length);
const researchListLength = computed(() => hrtStore.followupResearchList.length);

const activeRoute = computed(() => {
  // console.log('active route', route);
  return route;
});

const changeRoute = () => {};

const projectScreeningCompleted = (indicator) => {
  if (
    indicator.project_risk_characterization &&
    indicator.project_risk_determination &&
    indicator.project_risk_notes &&
    indicator.project_engagement_notes &&
    indicator.project_risk_determination_notes &&
    indicator.project_risk_notes
  ) {
    return true;
  }
};

// const indicatorSeverityIcon = (indicator) => {
//   if (indicator.project_risk_determination === 'Escalate') {
//     return '<i class="fa-solid fa-diamond-exclamation"></i>';
//   } else if (indicator.project_risk_determination === 'Priority') {
//     return '<i class="fa-solid fa-diamond-exclamation"></i>';
//   } else if (indicator.project_risk_determination === 'Watch') {
//     return '<i class="fa-regular fa-watch"></i>';
//   } else if projectScreeningCompleted(indicator){
//     return '<i class="fa-solid fa-check project-completed"></i>';
//   } else return null;
// };

// const indicatorRoutes = computed(() => {});

const first = ref(0);
// const projects = mapStore.projectsInBbox;
// const projects = computed(() => mapStore.projectsInBbox);
// const collection = computed(() => generalStore.selectedCollection);
</script>

<style scoped>
h2 {
  margin: 10px 0 15px;
  padding-bottom: 0;
  font-size: 20px;
  font-weight: bold;
}
.sidenav {
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 40px;
  position: sticky;
  top: 0;
}
.sidenav ul {
  list-style: none;
  padding: 0 0;
  margin: 0 0 30px;
  font-size: 15px;
}
.sidenav ul li {
  padding: 1px 10px 1px 0;
  margin-bottom: 5px;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  color: #1f79ad;
  border-bottom: 0;
}

.progress-pie {
  width: 50px;
  height: 50px;
}
li {
  /* text-indent: 40px hanging !important; */
  padding-left: 0px !important;
}
.vue3-circular-progressbar {
  float: left;
  margin-top: 3px;
  margin-left: -26px;
  margin-right: 10px;
}
.item-count {
  margin-left: 8px;
  color: #666;
  font-size: 0.85em;
}
.project-completed {
  float: left;
  margin-top: 3px;
  margin-left: -22px;
  margin-right: 6px;
  color: #38bb93;
}

/* .router-link-active {
  font-weight: bold;
  color: #26363d;
  color: green;
} */

.router-link-active .router-link-exact-active {
  font-weight: bold;
  color: #26363d;
  /* color: red; */
}

.router-link-exact-active {
  font-weight: bold;
  color: #26363d;
  color: #1f79ad;
  /* color: red; */
}
</style>
