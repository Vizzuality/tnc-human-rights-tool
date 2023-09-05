<!-- eslint-disable vue/valid-template-root -->
<template>
  <!-- Overview text -->
  <div class="overview">
    <h2>Research</h2>
    <p>
      <strong>Note: </strong> The research section is unfinished while we wait
      for content editing. The content below will be similar to the screening
      section in structure. For now, click the next button at the bottom to
      continue to the screening section.
    </p>
  </div>

  <div class="grid">
    <div class="col-12">
      <h1>One option for research section</h1>
      <h3>Project Site</h3>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        1. Did the idea or initial motivation for the project come from an IPLC
        or out of discussions or an ongoing relationship with an IPLC?</span
      >
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o1" value="No" v-model="o1" />
        <label for="o1">No</label>

        <RadioButton name="o1b" value="Yes" v-model="o1" />
        <label for="o1b">Yes</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        2. Are any IPLCs integrated into the project plan or does the operation
        of the project itself require their participation?</span
      >

      <div v-if="o2 === 'Yes'">
        <!-- <span class="project-textarea-label">
                <strong>List IPLCs</strong> &mdash;
              </span> -->
        <Textarea
          v-model="userResearch.projectResearch"
          rows="3"
          class="textarea"
        />
      </div>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o2" value="No" v-model="o2" />
        <label for="o1">No</label>

        <RadioButton name="o2b" value="Yes" v-model="o2" />
        <label for="o2b">Yes</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        3. Has the team already engaged sought out any IPLCs related to the
        project?</span
      >
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o1" value="No" v-model="o3" />
        <label for="o1">No</label>

        <RadioButton name="o1b" value="Yes" v-model="o3" />
        <label for="o1b">Yes</label>
      </div>
    </div>

    <hr />

    <div class="col-12">
      <h3>Project Area</h3>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        4. Do any not-yet-listed IPLCs live, work, or regularly use lands or
        resources within the Project Area?
      </span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o1" value="No" v-model="o1" />
        <label for="o1">No</label>

        <RadioButton name="o1b" value="Yes" v-model="o1" />
        <label for="o1b">Yes</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        5. Do any IPLCs use lands or resources within the Project Area on a
        seasonal basis (e.g. hunting or growing seasons), contingency basis
        (e.g. in response to lack of rainfall), occasional basis (e.g. for
        ceremonies or holidays), or other episodic basis?
      </span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o2" value="No" v-model="o2" />
        <label for="o1">No</label>

        <RadioButton name="o2b" value="Yes" v-model="o2" />
        <label for="o2b">Yes</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-7">
      <span>
        6. Do any IPLCs have pending claims or applications for any sort of
        customary or collective title to lands within the Project Area, or have
        IPLCs or civil society groups made such claims in public advocacy?</span
      >
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-5">
      <div class="indicator-options">
        <RadioButton name="o1" value="No" v-model="o3" />
        <label for="o1">No</label>

        <RadioButton name="o1b" value="Yes" v-model="o3" />
        <label for="o1b">Yes</label>
      </div>
    </div>
  </div>

  <!-- CHEKBOX option -->
  <div class="grid">
    <div class="col-12">
      <h1>Another option for research section</h1>
      <h3>Stakeholders/Interested Parties</h3>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <span>
        1. Will the project require approval or participation from any
        particular local, regional, or national government agencies?
      </span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <div class="indicator-options">
        <checkbox name="o1" value="No" v-model="o7" />
        <label for="o1">No</label>

        <checkbox name="o1b" value="Project Site" v-model="o7" />
        <label for="o1b">Project Site</label>

        <checkbox name="o1b" value="Project Area" v-model="o7" />
        <label for="o1b">Project Area</label>

        <checkbox name="o1b" value="Project Region" v-model="o7" />
        <label for="o1b">Project Region</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <span>
        2. 2. Will the project require involvement with other regulatory or
        standard-setting processes, such as carbon offset verification, fair
        trade certification, or similar? Will qualifying for any such standards
        or certifications require the participation of consultants or
        intermediaries?
      </span>

      <div v-if="o7 === 'Yes'">
        <Textarea
          v-model="userResearch.projectResearch"
          rows="3"
          class="textarea"
        />
      </div>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <div class="indicator-options">
        <checkbox name="o1" value="No" v-model="o8" />
        <label for="o1">No</label>

        <checkbox name="o1b" value="Project Site" v-model="o8" />
        <label for="o1b">Project Site</label>

        <checkbox name="o1b" value="Project Area" v-model="o8" />
        <label for="o1b">Project Area</label>

        <checkbox name="o1b" value="Project Region" v-model="o8" />
        <label for="o1b">Project Region</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <span>
        3. Will project design or implementation be presented to project funders
        for supervision, approval, contingency release, or other formal review?
      </span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <div class="indicator-options">
        <checkbox name="o1" value="No" v-model="o9" />
        <label for="o1">No</label>

        <checkbox name="o1b" value="Project Site" v-model="o9" />
        <label for="o1b">Project Site</label>

        <checkbox name="o1b" value="Project Area" v-model="o9" />
        <label for="o1b">Project Area</label>

        <checkbox name="o1b" value="Project Region" v-model="o9" />
        <label for="o1b">Project Region</label>
      </div>
    </div>

    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <span>
        4. Does the project intersect with profit generating activities in ways
        that could trigger positive or negative interest from other corporate or
        private sector actors? Example: establishment of a community-based
        forest management plan that could interest logging contractors, or
        establishment of protected status on lands known to have
        oil/gas/minerals.
      </span>
    </div>
    <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
      <div class="indicator-options">
        <checkbox name="o1" value="No" v-model="o10" />
        <label for="o1">No</label>

        <checkbox name="o1b" value="Project Site" v-model="o10" />
        <label for="o1b">Project Site</label>

        <checkbox name="o1b" value="Project Area" v-model="o10" />
        <label for="o1b">Project Area</label>

        <checkbox name="o1b" value="Project Region" v-model="o10" />
        <label for="o1b">Project Region</label>
      </div>
    </div>

    <div class="col-12">
      <div class="next-section">
        <p>
          <!-- <em>Next: Violence, Intimidation, Harrassment</em> -->
          <router-link
            :to="'../contextual_risk' + `?sid=${hrtStore.sessionId}`"
          >
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
import checkbox from "primevue/checkbox";

const hrtStore = useHrtStore();
const route = useRoute();

const userResearch = computed(() => {
  return hrtStore.userResearch;
});

const o1 = ref(false);
const o2 = ref(false);
const o3 = ref(false);
const o4 = ref(false);
const o5 = ref(false);
const o6 = ref(false);
const o7 = ref(false);
const o8 = ref(false);
const o9 = ref(false);
const o10 = ref(false);

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
hr {
  /* border-bottom: 1px solid #ccc;
  background: blue; */
  /* background: #ccc !important; */
  /* height: 1px !important; */
  /* margin: 20px 0;
  width: 100%; */
  margin: 15px 0;
}
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
  margin-top: 0px;
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
/* .next-button {
  margin-left: 40px !important;
  margin-top: 5px !important;
  background: #38bb93 !important;
} */

.p-RadioButton .p-RadioButton-box.p-highlight {
  border-color: #38bb93 !important;
  background: #38bb93 !important;
}

.p-RadioButton .p-RadioButton-box .p-RadioButton-icon {
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
