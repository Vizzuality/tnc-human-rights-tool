<!-- eslint-disable vue/valid-template-root -->
<template>
<!-- Overview text -->
<div class="overview">
  <h2>Contextual Risk</h2>
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
    The Contextual Risk Screen focuses on whether potential risks are
    present in the working geophysical and social environment,
    irrespective of links to the specific project. The reasons for this
    approach are described in the Introduction. Where a contextual risk
    is found, the Tool presumes (in the Project Risk Screen) that the
    project presents a potential impact unless the screening provides
    specific reasons why the risk is Not Applicable, Unlikely, or finds
    that there is Reliable Mitigation Already in place or Limited in
    scope to address the risk (collectively, the Project Risk
    Determination). Details on this determination are provided in the
    Part B guidance, below.
  </p>
</div>

<p>
  The indicators below typically ask about the existence of political or
  social factors, or IPLC views or the existence of allegations of risk.
  Keep in mind:
</p>
<ul>
  <li>
    A “risk” is just a possibility that rights could be adversely
    impacted, even informally or unintentionally. Future risk can be
    drawn from past experience of violations, but also from contextual
    factors without any experience of problems.
  </li>
  <li>
    This screening does not result in findings or conclusions but rather
    directs our attention. It thus focuses as much on allegations and
    concerns as well as established facts.
  </li>
  <li>
    With respect to allegations, to not “weigh the evidence” or focus on
    whether the risk is linked to the specific project. That will be
    addressed in the next stage (Project Risk Screen).
  </li>
</ul>

<!-- Need to right-align next button. Probably should do this with flex box -->

<div class="next-section">
  <p>
    <em>Next: Violence, Intimidation, Harrassment</em>
    <router-link
      :to="
        './contextual_risk/violence-intimidation-harassment' +
        `?sid=${hrtStore.sessionId}`
      "
    >
      <Button
        class="p-button-sm next-button align-right"
        @click="scrollToTop"
        >Violence, Intimidation, Harrassment
        <i class="fa-sharp fa-solid fa-arrow-right icon-arrow"></i>
      </Button>
    </router-link>
  </p>
</div>

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

<style>
.align-right {
  float: right;
}
.icon-arrow {
  margin-left: 10px;
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
