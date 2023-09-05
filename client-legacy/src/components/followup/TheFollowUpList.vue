<!-- eslint-disable vue/valid-template-root -->
<template>
  <!-- Overview text -->
  <div :class="[listClass, 'overview']">
    <h2>
      <i class="fa-solid fa-diamond-exclamation"></i> {{ listData.title }}
    </h2>
    <p>
      {{ listData.description }}
    </p>
  </div>

  <!-- User inputs -->
  <div
    class="grid indicator-row"
    v-for="(item, index) in listData.indicators"
    :key="item.id"
  >
    <div
      class="col-12 sm:col-12 md:col-12 lg:col-10 xl:col-10 indicator-list-item"
    >
      <h3>{{ item.indicator_code }} {{ item.title }}</h3>

      <div>
        <!-- <h3>Contextual and Project Risk</h3> -->
        <p>
          <strong>Contextual risk &ndash; </strong
          >{{ item.contextual_risk_notes }}
        </p>
        <p>
          <strong>Project risk &ndash; </strong
          >{{ item.project_risk_notes }}
        </p>
      </div>


      <p>
        <strong
          >Extent of community and engagement and further research needs
          &ndash; </strong
        >{{ item.project_engagement_notes }}
      </p>


      <p v-if="item.project_risk_determination_factors">
        <strong>Project risk determination reasons &ndash; </strong>
        {{ item.project_risk_determination_factors }}
      </p>

      <h3>Follow up plan</h3>
      <!-- <p>Item ID: {{ item.indicator_id }}</p> -->
      <Textarea
        v-model="
          hrtStore.indicatorResponsesObject[item.indicator_id]
            .follow_up_plan_notes
        "
        @change="
          projectRiskEdit(
            hrtStore.indicatorResponsesObject[item.indicator_id],
            'follow_up_plan_notes'
          )
        "
        rows="5"
        class="textarea"
      />
    </div>

    <!-- <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
      <div class="indicator-options"></div>
    </div> -->
  </div>

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

  <!-- Icons
    warming   <i class="fa-solid fa-diamond-exclamation"></i>
    watch <i class="fa-sharp fa-solid fa-alarm-clock"></i>
    priotity <i class="fa-solid fa-star"></i>

  -->



</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHrtStore } from '../../store/hrtStore';
import { queryDataApi, protectedQueryDataApi } from '../../helpers/apiAccess';

import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import TheSideNav from '../layout/TheSideNav.vue';

const hrtStore = useHrtStore();
const route = useRoute();

const listData = computed(() => {
  const activeList = route.params.list_id;
  if (activeList === 'escalate') {
    let indicators = hrtStore.followupEscalateList;
    let title = 'Escalate List';
    let description = 'This is escalate list';
    return { title, description, indicators };
  } else if (activeList === 'priority') {
    let indicators = hrtStore.followupPriorityList;
    let title = 'Priority List';
    let description = 'This is priority list';
    return { title, description, indicators };
  } else if (activeList === 'watch') {
    let indicators = hrtStore.followupWatchList;
    let title = 'Watch List';
    let description = 'This is watch list';
    return { title, description, indicators };
  } else if (activeList === 'research') {
    let indicators = hrtStore.followupResearchList;
    let title = 'Research List';
    let description = 'This is research list';
    return { title, description, indicators };
  }
});

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

const listClass = computed(() => {
  const activeList = route.params.list_id;
  if (activeList === 'escalate') {
    return 'escalate';
  } else if (activeList === 'priority') {
    return 'priority';
  } else if (activeList === 'watch') {
    return 'watch';
  } else if (activeList === 'research') {
    return 'research';
  }
});

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
const projectRiskEdit = (params, field_name) => {
  protectedQueryDataApi({
    route: `indicator`,
    type: 'POST',
    body: {
      indicator_id: params.indicator_id,
      session_id: hrtStore.sessionId,
      field_name: field_name,
      field_value: params[field_name],
    },
  });
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
  margin-bottom: 20px;
}
.overview {
  background: #ecf7fa;
  padding: 10px 20px 10px;
  margin-bottom: 20px;
  /* width: 90%; */
}
.overview.escalate {
  background: #f9e6e6;
  background: #ffd3d3;
}
.overview.priority {
  background: #ffef9c;
}
.overview.watch {
  background: #fffcc4;
}
/* .overview.research {
  background: #f9f2e6;
} */
.overview p {
  font-size: 18px;
  font-style: italic;
  line-height: 1.5em;
  margin-bottom: 20px;
}

.indicator-row {
  margin-bottom: 20px;
}
.indicator-list-item {
  padding-bottom: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
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
}
</style>
