<!-- eslint-disable vue/valid-template-root -->
<template>
  <div class="container">
    <span ref="pageTop"></span>
    <div class="grid">
      <!-- <div class="col-5 md:col-4 lg:col-3 xl:col-2">
        <TheScreeningNav />
      </div> -->

      <div class="col-12 md:col-12 lg:col-12 xl:col-12 screen-body">
        <h2>Screening Overview</h2>
        <ul>
          <li v-for="(item, index) in indicatorCategories">
            <circle-progress
              :percent="item.indicators_contextual_pct"
              size="16"
              border-width="3"
              border-bg-width="3"
              fill-color="#38bb93"
            />

            <!-- <router-link :to="String(item.display_order)"> -->
            <router-link :to="`screening/${item.category_slug}`">
              {{ item.title }}
            </router-link>
            <span class="item-count"
              >({{ item.indicator_filled }}/{{ item.indicator_count }})</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHrtStore } from '../../store/hrtStore';

import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import TheScreeningNav from './TheScreeningNav.vue';
import CircleProgress from 'vue3-circle-progress';

const hrtStore = useHrtStore();
const route = useRoute();

const indicatorCategories = computed(() => hrtStore.indicatorCategories);

const activeCategory = computed(() => {
  try {
    let categories = hrtStore.indicatorCategories;
    let category_id = route.params.category_id;

    let filteredCategory = categories.filter(
      (category) => category.category_slug === category_id
    );
    return filteredCategory[0];
  } catch (error) {
    console.log('error');
    return { title: '' };
  }
});

const activeIndicators = computed(() => {
  let indicators = hrtStore.indicators;
  let category_id = route.params.category_id;

  let filteredIndicators = indicators.filter(
    (indicator) => indicator.category_slug === category_id
  );

  let sortedIndicators = filteredIndicators.sort((a, b) =>
    a['indicator_id'].localeCompare(b['indicator_id'], undefined, {
      numeric: true,
    })
  );

  return sortedIndicators;
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
    return { category_slug: '' };
  }
});

const pageTop = ref(null);

const scrollToTop = () => {
  pageTop.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
</script>

<style>
h2 {
  margin: 10px 0 15px;
  padding-bottom: 0;
  font-size: 20px;
  font-weight: bold;
}
.sidenav {
  padding-left: 10px;
  padding-top: 10px;
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
  color: darkblue;
}
.router-link-active {
  font-weight: bold;
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
</style>
