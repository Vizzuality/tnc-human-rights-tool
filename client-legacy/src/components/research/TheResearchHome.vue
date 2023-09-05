<!-- eslint-disable vue/valid-template-root -->
<template>
  <!-- Overview text -->
  <div class="overview">
    <h2>Research</h2>
    <img src="../../assets/project_geography2.png" class="project-geography" />
    <!-- <span
      v-html="activeCategory.description"
      class="indicator-description"
    ></span> -->
    <p>
      The primary function of the table is as a quick reference for the team
      that will conduct the Human Rights Screening.
    </p>
    <p>
      <strong>Project Site: </strong>
      Any specific site that has already been identified for inclusion in the
      project scope
    </p>
    <p>
      <strong>Project Area: </strong>
      This refers to the Project Site plus direct or nearby neighboring
      geographies, communities, and stakeholders. This scope still refers to an
      area where groups know or know of each other and are in active
      relationship and dialogue across issues (e.g. a municipality or
      subdivision, buffer zone).
    </p>
    <p>
      <strong>Project Region or Ecosystem: </strong>
      This automatically includes the Project Area and Project Site, but goes
      beyond to include other regional communities who may not have any
      significant direct relationship but who may face similar issues, political
      dynamics, or environmental factors/ecological system type.
    </p>
  </div>
  <div>
    <!-- User inputs -->
    <!-- <div
    class="grid indicator-row"
    v-for="(item, index) in activeIndicators"
    :key="item.id"
  >
    <div class="col-12 sm:col-12 md:col-12 lg:col-7 xl:col-7">
      <h3>{{ item.indicator_id }} {{ item.title }}</h3>
      <span v-html="item.description"></span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
      <div class="indicator-options"></div>
    </div>
  </div> -->

    <span class="project-textarea-label">
      <strong>Project research</strong> &mdash; Is it new or an extension of
      existing work? What are the project’s central goals and objectives? Where
      did the basic motivation and approach come from?
    </span>
    <Textarea
      v-model="userResearch.projectResearch"
      rows="5"
      class="textarea"
    />

    <span class="project-textarea-label">
      <strong>Baseline geography</strong> &mdash; Either the project site and/or
      the project’s core anticipated geographic scope. If not yet decided,
      describe range of options.
    </span>
    <Textarea
      v-model="userResearch.baselineGeography"
      rows="5"
      class="textarea"
    />

    <span class="project-textarea-label">
      <strong>Activities</strong> &mdash; Include activities currently planned
      in baseline and optimistic scenarios. Include all activities communicated
      to any funders, partners, or community members.
    </span>
    <Textarea v-model="userResearch.activities" rows="5" class="textarea" />

    <span class="project-textarea-label">
      <strong>Partners</strong> &mdash; Any other NGOs, community-based
      organizations, private sector entities, or government agencies involved in
      detailed planning and implementation capacity.
    </span>
    <Textarea v-model="userResearch.partners" rows="5" class="textarea" />

    <div class="next-section">
      <p>
        <!-- <em>Next: Violence, Intimidation, Harrassment</em> -->
        <router-link :to="'./contextual_risk' + `?sid=${hrtStore.sessionId}`">
          <Button
            class="p-button-sm next-button align-right"
            @click="scrollToTop"
            >Contextual Screening
            <i class="fa-sharp fa-solid fa-arrow-right icon-arrow"></i>
          </Button>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";

import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
// import TheScreeningNav from '../screening/TheScreeningNav.vue';
import TheSideNav from "../layout/TheSideNav.vue";

const hrtStore = useHrtStore();
const route = useRoute();

const userResearch = computed(() => {
  return hrtStore.userResearch;
});

// const activeCategory = computed(() => {
//   try {
//     let categories = hrtStore.indicatorCategories;
//     let category_id = route.params.category_id;

//     let filteredCategory = categories.filter(
//       (category) => category.category_slug === category_id
//     );
//     return filteredCategory[0];
//   } catch (error) {
//     console.log('error');
//     return { title: '' };
//   }
// });

// const activeIndicators = computed(() => {
//   let indicators = hrtStore.indicators;
//   let category_id = route.params.category_id;

//   let filteredIndicators = indicators.filter(
//     (indicator) => indicator.category_slug === category_id
//   );

//   let sortedIndicators = filteredIndicators.sort((a, b) =>
//     a['indicator_id'].localeCompare(b['indicator_id'], undefined, {
//       numeric: true,
//     })
//   );

//   return sortedIndicators;
// });

// const nextSection = computed(() => {
//   let categories = hrtStore.indicatorCategories;
//   let categoryId = route.params.category_id;
//   let categoryCount = hrtStore.indicatorCategories.length;

//   let filteredCategoryId = categories.filter(
//     (category) => category.category_slug === categoryId
//   )[0].display_order;

//   let nextId = filteredCategoryId;

//   if (categoryCount > nextId) {
//     return categories[filteredCategoryId];
//   } else {
//     return { category_slug: '' };
//   }
// });

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};
</script>

<style>
img.project-geography {
  float: right;
  width: 300px;
  height: 300px;
  margin: 0 0 10px 20px;
}
/* h2 {
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
  background: #38bb93 !important;
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
} */
</style>
