// this file is an API access layer used to keep all requests to our various API's in one file.
// this way if we have to change things like headers, urls, or request libraries this can be done on one location
// example pinia store for the sandbox
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
// import axios from 'axios';
import {
  protectedQueryDataApi,
  queryContentApi,
  queryDataApi,
} from "../helpers/apiAccess";

import { useUserAuthStore } from "../store/userAuthStore";

export const useHrtStore = defineStore("hrtStore", {
  state: () => {
    return {
      sessionId: null,
      sessionInit: false,
      contentApiUrl: "https://content.ncsmap.org/items/",
      dataApiUrl: "https://hrt-api.ncsdata.org/v1/",
      reportView: false,
      indicators: [],
      //indicatorResponses: null,
      indicatorResponsesObject: {},
      anonProjectInfo: null,
      //indicatorResponsesArray: [],
      // indicatorsGrouped: [],
      indicatorCategories: [],
      activeIndicator: null,
      activeIndicatorCategory: null,
      //userIndicators: [],
      userResearch: {
        projectResearch: null,
        baselineGeography: null,
        activities: null,
        partners: null,
      },
      // definitions: [],
      // worldAtlasData: [],
    };
  },
  getters: {
    activeProject() {
      const userAuthStore = useUserAuthStore();
      const userProjects = userAuthStore.projects;

      if (userProjects) {
        return userProjects.filter(
          (project) => project.session_id === this.sessionId
        )[0];
      } else
        return {
          name: "no name, not logged in",
        };
    },
    indicatorResponsesArray() {
      let responses = this.indicatorResponsesObject;
      let responsesArray = Object.values(responses);
      //console.log('resp array', responsesArray);
      //console.log('indicators', this.indicators);

      let merged = [];
      merged = this.indicators.map((indicator) => {
        let response = responsesArray.find(
          (response) => response.indicator_id == indicator.id
        );
        // let response = responsesArray.find(
        //   (response) => response[String(id)] === indicator[String(id)]
        // );
        // console.log('response', response);
        return { ...indicator, ...response };
      });

      return merged;

      // console.log('resp array', responsesArray);
      // this.indicatorResponsesArray = responsesArray;

      //return responsesArray;
    },
    // combinedIndicators() {
    //   let merged = [];

    //   merged = this.indicators.map((indicator) => {
    //     let response = this.indicatorResponses.find(
    //       (response) => response.id === indicator.id
    //     );
    //     return { ...indicator, ...response };
    //   });
    //   return merged;
    // },
    contextualProgress() {
      const categories = this.indicatorCategories;
      const indicators = this.indicatorResponsesArray;
      let self = this;

      let categoryProgress = [];

      for (let i = 0; i < categories.length; i++) {
        let category_id = categories[i].category_slug;
        let category_indicators = indicators.filter(
          (indicator) => indicator.category_slug === category_id
        );

        let indicators_filled = category_indicators.filter(
          (indicator) => indicator.contextual_risk != null
        );

        let indicators_no = category_indicators.filter(
          (indicator) => indicator.contextual_risk === "No"
        ).length;
        let indicators_yes = category_indicators.filter(
          (indicator) => indicator.contextual_risk === "Yes"
        ).length;

        let indicators_research = category_indicators.filter(
          (indicator) => indicator.contextual_risk === "More research"
        ).length;

        let indicators_count = category_indicators.length;
        let indicators_filled_count = indicators_filled.length;
        let indicators_contextual_pct =
          100 * (indicators_filled_count / indicators_count);

        self.indicatorCategories[i].indicators_count = indicators_count;
        self.indicatorCategories[i].indicators_filled = indicators_filled_count;
        self.indicatorCategories[i].indicators_no = indicators_no;
        self.indicatorCategories[i].indicators_yes = indicators_yes;
        self.indicatorCategories[i].indicators_research = indicators_research;
        self.indicatorCategories[i].indicators_project_screen =
          indicators_yes + indicators_research;
        self.indicatorCategories[i].indicators_project_screen_filled = 0;
        self.indicatorCategories[i].indicators_contextual_pct = Math.round(
          indicators_contextual_pct
        );
        self.indicatorCategories[i].indicators_contextual_pct = Math.round(
          indicators_contextual_pct
        );
      }
      categoryProgress = this.indicatorCategories;
      return categoryProgress;
    },
    overallContextualRiskProgress() {
      const categories = this.indicatorCategories;
      const contextualProgress = this.contextualProgress;
      let indicatorsCount = 0;
      let indicatorsFilled = 0;
      let indicatorsYes = 0;
      let indicatorsNo = 0;
      let indicatorsResearch = 0;
      for (let i = 0; i < categories.length; i++) {
        indicatorsCount += categories[i].indicators_count;
        indicatorsFilled += categories[i].indicators_filled;
        indicatorsYes += categories[i].indicators_yes;
        indicatorsNo += categories[i].indicators_no;
        indicatorsResearch += categories[i].indicators_research;
      }
      return {
        indicatorsCount,
        indicatorsFilled,
        indicatorsYes,
        indicatorsNo,
        indicatorsPercent: Math.round(
          (indicatorsFilled / indicatorsCount) * 100
        ),
      };
    },
    overallProjectRiskProgress() {
      const followUpCount =
        this.followupEscalateList.length +
        this.followupPriorityList.length +
        this.followupWatchList.length +
        this.followupResearchList.length;
      return {
        followUpCount,
        followUpPercent: Math.round(
          (followUpCount / this.projectIndicators.length) * 100
        ),
      };
    },
    projectIndicators() {
      const indicators = this.indicatorResponsesArray;
      const projectIndicators = indicators.filter(
        (indicator) =>
          indicator.contextual_risk === "Yes" ||
          indicator.contextual_risk === "More research"
      );
      // Might need to refactor. Sort is based on id. If new IDs added but they have lower id codes then sort will get messed up.
      return projectIndicators.sort((a, b) => a.id - b.id);
    },

    // Could replace all these lists w/ single function for filter
    // Need to refactor - was previously filtering based on combined
    // indicators array. Now are storing responses in object. Need to
    // filter object instead
    followupEscalateList() {
      // const responses = this.indicatorResponsesObject;
      // // convert responses object to array so we can filter.
      // const responsesArray = Object.values(responses);
      const responsesArray = this.indicatorResponsesArray;
      const projectIndicators = responsesArray.filter(
        (indicator) => indicator.project_risk_determination === "Escalate"
      );
      return projectIndicators.sort(
        (a, b) => a.display_order - b.display_order
      );
    },
    followupPriorityList() {
      // const indicators = this.indicators;
      const responsesArray = this.indicatorResponsesArray;
      const projectIndicators = responsesArray.filter(
        (indicator) => indicator.project_risk_determination === "Priority"
      );
      return projectIndicators.sort(
        (a, b) => a.display_order - b.display_order
      );
    },
    followupWatchList() {
      // const indicators = this.indicators;
      const responsesArray = this.indicatorResponsesArray;
      const projectIndicators = responsesArray.filter(
        (indicator) => indicator.project_risk_determination === "Watch"
      );
      return projectIndicators.sort(
        (a, b) => a.display_order - b.display_order
      );
    },
    followupResearchList() {
      // const indicators = this.indicators;
      const responsesArray = this.indicatorResponsesArray;
      const projectIndicators = responsesArray.filter(
        (indicator) => indicator.contextual_risk === "More research"
      );
      return projectIndicators.sort(
        (a, b) => a.display_order - b.display_order
      );
    },
  },
  actions: {
    setSessionId() {
      this.sessionId = nanoid();
    },
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, "");

      // Make the string lowercase
      str = str.toLowerCase();

      // Remove accents, swap ñ for n, etc
      var from =
        "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      var to =
        "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      // Remove invalid chars
      str = str
        .replace(/[^a-z0-9 -]/g, "")
        // Collapse whitespace and replace by -
        .replace(/\s+/g, "-")
        // Collapse dashes
        .replace(/-+/g, "-");

      return str;
    },
    createIndicatorsTemplate() {
      let responses = {};
      let template = function (id) {
        return {
          indicator_id: String(id),
          id: id,
          date_updated: null,
          contextual_risk: null,
          contextual_risk_notes: null,
          project_risk_characterization: null,
          project_risk_determination: null,
          project_risk_notes: null,
          project_engagement_notes: null,
          project_risk_determination_notes: null,
          follow_up_plan_notes: null,
        };
      };
      for (let i = 1; i < 83; i++) {
        responses[i] = template(i);
      }
      this.indicatorResponsesObject = responses;
      return responses;
    },

    async getIndicators() {
      const _groupBy = function (inArray, key) {
        return inArray.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      const metadata = await queryContentApi({
        type: "GET",
        urlSlug: `human_rights_indicators?fields=id,indicator_code,category,title,description,project_screening_description&filter[status][_in]=published`, // only published boundaries
      });

      const indicators = metadata.data;

      // Loop through indicators and add fields to store user fields
      const indicatorsUser = indicators.map((x) => {
        x["category_slug"] = this.slugify(x["category"]);
        x["indicator_slug"] = this.slugify(x["title"]);
        // x['indicator_sort'] = Number(x[]);
        // x['contextual_risk'] = null;
        // x['contextual_risk_notes'] = null;
        // x['project_naurmal_determination'] = null; // naurmal determination True = no project risk
        // x['project_list'] = null; // Escalate, Priority, Watch (watch is automatic if naurmal = true)
        // x['project_risk_notes'] = null;
        // x['project_engagement_notes'] = null;
        // x['project_risk_determination_factors'] = null; // if naurmal is true
        // x['display_order'] = Number(x['indicator_id']) * 10;
        return x;
      });

      this.indicators = indicators;
      // this.indicatorsGrouped = _groupBy(metadata.data, 'category');
      //this.userIndicators = indicatorsUser;
      //this.setSessionId();
    },

    async getIndicatorCategories() {
      const metadata = await queryContentApi({
        type: "GET",
        urlSlug: `human_rights_indicator_categories?filter[status][_in]=published`, // only published boundaries
      });

      const results = metadata.data;
      // return array sorted by ID, because I entered categories according to order in doc.
      // If this is changed, could always add sort_order value as property.
      const resultsMod = results.map((x) => {
        x["category_slug"] = this.slugify(x["title"]);
        x["indicators_contextual_pct"] = 0;
        return x;
      });

      this.indicatorCategories = resultsMod.sort(
        (a, b) => a.display_order - b.display_order
      );
    },
    async getIndicatorResponses(sessionId) {
      const responses = await protectedQueryDataApi({
        type: "GET",
        route: `indicators/${sessionId}`,
      });
      // console.log('response', responses['data']);

      this.indicatorResponses = responses.data;
      // console.log(this.indicatorResponses);

      const responsesObject = {};
      responses.data.data.forEach((data) => {
        responsesObject[data.indicator_id] = data;
      });

      // **** this was causing a bug for some reason, no idea why ********
      // convert array to object with key based on id, add to store at hrtStore.indicatorResponsesObject
      // const responsesObject = responses['data'].reduce((obj, item) => {
      //   console.log(item);
      //   obj[item.indicator_id] = item;
      //   return obj;
      // });

      // console.log('res', responsesObject);

      const indicators = this.indicatorResponsesObject;
      // console.log('indicators', indicators);

      // merge 2 objects by key. If key doesn't exist in object 2, use value from object 1
      const mergeObjects = { ...indicators, ...responsesObject };

      // console.log('merged objects', mergeObjects);

      this.indicatorResponsesObject = mergeObjects;
    },

    async getAnonIndicatorResponses(sessionId) {
      const responses = await queryDataApi({
        type: "GET",
        route: `report/indicators/${sessionId}`,
      });
      console.log(responses.data);
      this.indicatorResponses = responses.data;
      const responsesObject = {};
      responses.data.data.forEach((data) => {
        responsesObject[data.indicator_id] = data;
      });
      const indicators = this.indicatorResponsesObject;
      // merge 2 objects by key. If key doesn't exist in object 2, use value from object 1
      const mergeObjects = { ...indicators, ...responsesObject };
      this.indicatorResponsesObject = mergeObjects;
    },
    async getAnonReportMetaData(sessionId) {
      const responses = await queryDataApi({
        type: "GET",
        route: `report/project/${sessionId}`,
      });
      console.log(responses.data);
      this.anonProjectInfo = responses.data.data[0];
    },
  },
  persist: false,
});
