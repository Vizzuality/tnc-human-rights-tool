<!-- eslint-disable vue/valid-template-root -->
<template>
  <div v-if="activeCategory">
    <!-- Overview text -->
    <div class="overview">
      <h2>{{ activeCategory.title }}</h2>
      <span
        v-html="activeCategory.description"
        class="indicator-description"
      ></span>
    </div>

    <!-- User inputs -->
    <div
      class="grid indicator-row"
      v-for="item in activeIndicators"
      :key="item.indicator_id"
    >
      <!-- {{ item.id }} -->
      <div class="col-12 indicator-title">
        <h3>{{ item.indicator_code }} {{ item.title }}</h3>
      </div>

      <div class="col-12 sm:col-12 md:col-12 lg:col-9 xl:col-9">
        <!-- <h3>{{ item.indicator_code }} {{ item.title }}</h3> -->
        <span v-html="item.description" class="description"></span>
      </div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
        <div class="indicator-options">
          <div class="options-wrap">
            <RadioButton
              name="risk1"
              value="No"
              v-model="
                hrtStore.indicatorResponsesObject[item.indicator_id]
                  .contextual_risk
              "
              @change="
                indicatorRiskEdit(
                  hrtStore.indicatorResponsesObject[item.indicator_id],
                  'contextual_risk'
                )
              "
            />
            <label for="risk1">No</label>
          </div>

          <div class="options-wrap">
            <RadioButton
              name="risk2"
              value="Yes"
              v-model="
                hrtStore.indicatorResponsesObject[item.indicator_id]
                  .contextual_risk
              "
              @change="
                indicatorRiskEdit(
                  hrtStore.indicatorResponsesObject[item.indicator_id],
                  'contextual_risk'
                )
              "
            />
            <label for="risk2">Yes</label>
          </div>

          <div class="options-wrap">
            <RadioButton
              name="risk3"
              value="More research"
              v-model="
                hrtStore.indicatorResponsesObject[item.indicator_id]
                  .contextual_risk
              "
              @change="
                indicatorRiskEdit(
                  hrtStore.indicatorResponsesObject[item.indicator_id],
                  'contextual_risk'
                )
              "
            />
            <label for="risk3">More research</label>
          </div>

          <!-- <i class="fa-regular fa-note-sticky indicator-notes"></i> -->
        </div>
      </div>
      <div
        class="notes"
        v-if="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .contextual_risk === 'Yes' ||
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .contextual_risk === 'More research'
        "
      >
        <span class="textarea-label">Notes/Specific Risk</span>
        <!-- Need click outside directive to send update to DB update queue -->
        <Textarea
          v-model="
            hrtStore.indicatorResponsesObject[item.indicator_id]
              .contextual_risk_notes
          "
          @blur="
            indicatorRiskEdit(
              hrtStore.indicatorResponsesObject[item.indicator_id],
              'contextual_risk_notes'
            )
          "
          rows="5"
          class="textarea"
        />
      </div>
    </div>

    <!-- Need to right-align next button. Probably should do this with flex box -->

    <div class="next-section">
      <p>
        <em>Next: {{ nextSection.title }}</em>
        <router-link
          :to="nextSection.category_slug + `?sid=${hrtStore.sessionId}`"
        >
          <Button
            label="Save and Continue"
            class="p-button-sm next-button"
            @click="scrollToTop"
          />
        </router-link>
      </p>
    </div>
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

const activeCategory = computed(() => {
  try {
    let categories = hrtStore.indicatorCategories;
    let category_id = route.params.category_id;

    let filteredCategory = categories.filter(
      (category) => category.category_slug === category_id
    );
    return filteredCategory[0];
  } catch (error) {
    console.log("error");
    return { title: "" };
  }
});

const activeIndicators = computed(() => {
  let indicators = hrtStore.indicatorResponsesArray;
  // let indicators = hrtStore.combinedIndicators;
  let category_id = route.params.category_id;

  let filteredIndicators = indicators.filter(
    (indicator) => indicator.category_slug === category_id
  );

  console.log("filtered", filteredIndicators);
  return filteredIndicators;

  // let sortedIndicators = filteredIndicators.sort((a, b) =>
  //   a['indicator_id'].localeCompare(b['indicator_id'], undefined, {
  //     numeric: true,
  //   })
  // );

  // return sortedIndicators;
});

const indicatorResponses = computed(() => {
  return hrtStore.indicatorResponsesObject;
});

const nextSection = computed(() => {
  let categories = hrtStore.indicatorCategories;
  let categoryId = route.params.category_id;
  let categoryCount = hrtStore.indicatorCategories.length;

  let filteredCategoryId = categories.filter(
    (category) => category.category_slug === categoryId
  )[0].display_order;

  let nextId = filteredCategoryId;

  if (categoryCount > nextId) {
    return categories[filteredCategoryId];
  } else {
    return { category_slug: "" };
  }
});

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const indicatorRiskEdit = (params, field_name) => {
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
</script>

<style>
/* Note this isn't scoped, which is intentional for now. Otherwise, can't overwrite PrimeVue styles */
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
  padding-right: 30px;
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
.options-wrap {
  margin-bottom: 5px;
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

.description {
  margin-left: 30px;
  margin-top: 0px;
  display: block;
}

.indicator-title {
  padding-bottom: 0px !important;
}

.notes {
  margin-left: 37px;
  margin-right: 15px;
  width: 100%;
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
  line-height: 1.5em;
  margin-bottom: 20px;
}
.textarea-label {
  display: block;
  width: 100%;
  color: #444;
  font-weight: bold;
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
  /* border-color: #38bb93 !important; */
  /* background: #38bb93 !important; */
  border-color: #1f79ad !important;
  background: #1f79ad !important;
}

.p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
  background: #4cbadd;
  /* background: #38bb93 !important; */
  background: #1f79ad !important;
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

@media screen and (max-width: 992px) {
  .indicator-options {
    padding-left: 37px;
  }
}
</style>
