import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { useHrtStore } from "../store/hrtStore";

import TheHomePage from "../components/TheHomePage.vue";
import TheBody from "../components/layout/TheBody.vue";

import TheResearchHome from "../components/research/TheResearchHome.vue";
import TheResearchWizard from "../components/research/TheResearchWizard.vue";
import TheContextualRiskHome from "../components/screening/TheContextualRiskHome.vue";
import TheContextualRiskWizard from "../components/screening/TheContextualRiskWizard.vue";
import TheProjectRiskHome from "../components/screening/TheProjectRiskHome.vue";
import TheProjectRiskWizard from "../components/screening/TheProjectRiskWizard.vue";
import TheFollowUpHome from "../components/followup/TheFollowUpHome.vue";
import TheFollowUpList from "../components/followup/TheFollowUpList.vue";
import TheAnonReport from "../components/layout/TheAnonReport.vue";

const routes = [
  {
    path: "/",
    name: "home",
    // redirect: "/projects",
    component: TheHomePage,
  },
  {
    path: "/research",
    name: "research",
    component: TheBody,
  },
  {
    path: "/research/:category_id",
    name: "research_wizard",
    component: TheBody,
  },
  {
    path: "/contextual_risk",
    name: "contextual_risk_home",
    component: TheBody,
    children: [
      // {
      //   path: "/contextual_risk/overview",
      //   name: "contextual_risk_home",
      //   component: TheBody,
      //   beforeEnter(to, from, next) {
      //     // console.log("from", from);
      //     const hrtStore = useHrtStore();
      //     const category_id = to.params.category_id;
      //     hrtStore.activeIndicatorCategory = category_id;

      //     next();
      //   },
      // },
      {
        path: "/contextual_risk/:category_id",
        name: "contextual_risk_wizard",
        component: TheBody,
        beforeEnter(to, from, next) {
          // console.log("from", from);
          const hrtStore = useHrtStore();
          const category_id = to.params.category_id;
          hrtStore.activeIndicatorCategory = category_id;

          next();
        },
      },
    ],
  },

  {
    path: "/project_risk",
    name: "project_risk_home",
    component: TheBody,
    children: [
      // {
      //   path: "/project_risk/overview",
      //   name: "project_risk_home",
      //   component: TheBody,
      //   beforeEnter(to, from, next) {
      //     // console.log("from", from);
      //     console.log("indicator id", to.params.indicator_id);
      //     const hrtStore = useHrtStore();
      //     const indicator_id = to.params.indicator_id;
      //     hrtStore.activeIndicator = indicator_id;
      //     next();
      //   },
      // },
      {
        path: "/project_risk/:indicator_id",
        name: "project_risk_wizard",
        component: TheBody,
        beforeEnter(to, from, next) {
          // console.log("from", from);
          console.log("indicator id", to.params.indicator_id);
          const hrtStore = useHrtStore();
          const indicator_id = to.params.indicator_id;
          hrtStore.activeIndicator = indicator_id;
          next();
        },
      },
    ],
  },

  {
    path: "/follow-up",
    name: "follow_up_home",
    component: TheBody,
    children: [
      {
        path: "/follow-up/:list_id",
        name: "follow_up_list",
        component: TheBody,
      },
    ],
  },
  {
    path: "/report",
    name: "final_report",
    component: TheAnonReport,
    beforeEnter(to, from, next) {
      console.log(to);
      // const session_id = to.params.session_id;
      // const hrtStore = useHrtStore();
      // // hrtStore.reportView = true;
      // console.log(session_id);

      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const hrtStore = useHrtStore();
  // If there's a session ID in the URL, add it to the store
  // and use that to retrieve responses from the API
  let sessionId = to.query.sid;
  if (sessionId) {
    hrtStore.sessionId = sessionId;
  }
  // Query for collections metadata if we haven't already retrieved it
  if (hrtStore.indicators.length < 1) {
    //hrtStore.convertIndicatorResponsesToArray();
    // get indicators from CMS
    hrtStore.getIndicators();
    // get indicator categories from CMS
    hrtStore.getIndicatorCategories();
    // create blank responses template
    hrtStore.createIndicatorsTemplate();
    // get indicator responses from API
    if (sessionId) {
      if (to.name == "final_report") {
        hrtStore.reportView = true;
        hrtStore.getAnonIndicatorResponses(sessionId);
        hrtStore.getAnonReportMetaData(sessionId);
      } else {
        hrtStore.getIndicatorResponses(sessionId);
      }
    }
  }

  // Add query parameters to store one time for embed and standalone modes
  if (to.query && !hrtStore.query) {
    hrtStore.query = to.query;
  }
  next();
});

export default router;
