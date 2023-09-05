<!-- eslint-disable vue/valid-template-root -->
<template>
  <!-- Overview text -->
  <div class="overview">
    <h2>Project Risk</h2>
    <!-- <img
      src="../../assets/project_geography2.png"
      class="project-geography"
    /> -->
    <!-- <span
      v-html="activeCategory.description"
      class="indicator-description"
    ></span> -->
    <p>Content to be added after it's been edited.</p>

    <p>
      In the Project Risk Screen, the analysis narrows from the overall
      context to the specific proposed project. Only indicators identified
      from the Contextual Risk Screen are carried over to the Project Risk
      Screen. However, the Project Risk Screen goes beyond a check-box
      approach and requires the local team to briefly describe (a) the
      risk, (b) the extent of engagement with Communities on the risk, and
      (c) the specific reasons, if any, why the identified contextual risk
      may not be a project risk. Absent such reasons, the screening
      effectively presumes the context risk will impact and/or become
      interlinked with the project such that it should be considered a
      project risk.
    </p>
  </div>

  <h3>Application and Results</h3>
  <p>
    Similar to the Contextual Risk Screen, teams should not be too
    aggressive in “weighing the evidence” or looking for substantial
    documentation on risks and impacts. A persistent and specific
    allegation can be sufficient to justify the attention of this screen
    and/or further risk analysis.
  </p>
  <p>
    Each indicator asks the screening team to briefly describe (a) the
    contextual risk that was identified in the Contextual Risk Screen; (b)
    the extent of desk research and engagement with Communities on that
    particular risk; and (c) the specific reasons, if any, why the
    contextual risk is not applicable or unlikely concerning the proposed
    project, or any reliable mitigation plan that is in place or otherwise
    available to address the risk (Project Risk Determination).
  </p>
  <p>
    At the conclusion of the screen, indicators marked E” are listed on
    Escalate List; teams should hold off on significant further project
    development until review is completed. Indicators marked P (no
    affirmative NAURMAL determination) are listed on Priority List and
    subject to further analysis in an HRRA and the development of
    responsive mitigation strategies cooperatively with Communities.
    Indicators marked W (affirmative NAURMAL determination) are listed on
    Watch List and should be subject to ongoing careful attention during
    project implementation, as well as engagement using other available
    analytical and procedural tools.
  </p>

  <p>
    Need to add button, button has dynamic link depending on what they've
    selected in contextual screening.
  </p>

  <!-- Need to right-align next button. Probably should do this with flex box -->

  <!-- <div class="next-section">
    <p>
      <em>Next: {{ nextSection.title }}</em>
      <router-link :to="nextSection.category_slug">
        <Button
          label="Next Section"
          class="p-button-sm next-button"
          @click="scrollToTop"
        />
      </router-link>
    </p>
  </div> -->


</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHrtStore } from '../../store/hrtStore';

import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
// import TheScreeningNav from '../screening/TheScreeningNav.vue';
import TheSideNav from '../layout/TheSideNav.vue';

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
  pageTop.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
</script>

<style scoped>
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
