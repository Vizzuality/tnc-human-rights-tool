<template>
  <div class="container screen-body">
    <div class="grid page-subhead" v-if="hrtStore.anonProjectInfo">
      <div class="col-12">
        <div class="project-title">
          {{ hrtStore.anonProjectInfo.name }}
          <span class="date-updated"
            >({{ hrtStore.anonProjectInfo.date_updated.split("T")[0] }})</span
          >
        </div>
      </div>
      <div class="col-8">
        <p>
          Yeah, yeah, this page looks terrible right now. We'll style this and
          create a print stylesheet in the next sprint.
        </p>
        <p>{{ hrtStore.anonProjectInfo.description }}</p>
      </div>

      <div class="col-4">
        <ul>
          <li>
            <strong>Point of Contact:</strong>
            {{ hrtStore.anonProjectInfo.contact_name }}
          </li>
          <li>
            <strong>Email:</strong> {{ hrtStore.anonProjectInfo.contact_email }}
          </li>
        </ul>
      </div>
    </div>

    <div class="grid">
      <div class="col-10">
        <div v-if="escalateList.length > 0" :class="['escalate', 'overview']">
          <h2>
            <i class="fa-solid fa-diamond-exclamation"></i>
            Escalate
          </h2>
          <p>This is watch list</p>
        </div>
        <div
          class="grid indicator-row"
          v-for="item in escalateList"
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
                <!-- {{ item }} -->
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
            {{ item.follow_up_plan_notes }}
          </div>
        </div>
        <div v-if="priorityList.length > 0" :class="['priority', 'overview']">
          <h2>
            <i class="fa-solid fa-diamond-exclamation"></i>
            Priority
          </h2>
          <p>This is priority list</p>
        </div>
        <div
          class="grid indicator-row"
          v-for="item in priorityList"
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
                <!-- {{ item }} -->
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
            {{ item.follow_up_plan_notes }}
          </div>
        </div>

        <div v-if="watchList.length > 0" :class="['watch', 'overview']">
          <h2>
            <i class="fa-solid fa-diamond-exclamation"></i>
            Watch
          </h2>
          <p>This is watch list</p>
        </div>
        <div
          class="grid indicator-row"
          v-for="item in watchList"
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
                <!-- {{ item }} -->
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
            {{ item.follow_up_plan_notes }}
          </div>
        </div>
        <!-- Overview text -->
        <div v-if="researchList.length > 0" :class="['research', 'overview']">
          <h2>
            <i class="fa-solid fa-diamond-exclamation"></i>
            Research
          </h2>
          <p>This is research list</p>
        </div>
        <div
          class="grid indicator-row"
          v-for="item in researchList"
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
                <!-- {{ item }} -->
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
            {{ item.follow_up_plan_notes }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ researchList }} -->
</template>

<script setup>
import TheFollowUpList from "../followup/TheFollowUpList.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";
import { queryDataApi, protectedQueryDataApi } from "../../helpers/apiAccess";

import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import TheSideNav from "../layout/TheSideNav.vue";
const hrtStore = useHrtStore();

const researchList = computed(() => {
  console.log(hrtStore.followupResearchList);
  return hrtStore.followupResearchList;
});
const watchList = computed(() => {
  return hrtStore.followupWatchList;
});
const priorityList = computed(() => {
  return hrtStore.followupPriorityList;
});
const escalateList = computed(() => {
  return hrtStore.followupEscalateList;
});

const listData = computed(() => {
  //   return hrtStore.followupResearchList;
  //   const activeList = route.params.list_id;
  const activeList = "research";
  if (activeList === "escalate") {
    let indicators = hrtStore.followupEscalateList;
    let title = "Escalate List";
    let description = "This is escalate list";
    return { title, description, indicators };
  } else if (activeList === "priority") {
    let indicators = hrtStore.followupPriorityList;
    let title = "Priority List";
    let description = "This is priority list";
    return { title, description, indicators };
  } else if (activeList === "watch") {
    let indicators = hrtStore.followupWatchList;
    let title = "Watch List";
    let description = "This is watch list";
    return { title, description, indicators };
  } else if (activeList === "research") {
    let indicators = hrtStore.followupResearchList;
    let title = "Research List";
    let description = "This is research list";
    return { title, description, indicators };
  }
});

console.log(hrtStore.followupEscalateList, hrtStore.followupResearchList);
</script>

<style scoped>
.page-subhead {
  margin: 0 -20px 20px -20px;
  border-bottom: 1px solid #666;
  padding: 10px 10px 10px;
  background: #2ea680;
  background: #dcdcdc;
  color: #333;
  /* position: relative; */
}

.page-subhead p {
  color: white;
  color: #333;
}

.project-title {
  color: #26363d;

  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0px;
  line-height: 1.1em;
}
.date-updated {
  font-weight: normal;
  font-size: 0.7em;
  color: #666;
  font-style: italic;
}

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
  width: 90%;
  max-width: 1200px;
  display: block;
}
.screen-body {
  background: white;
  border: 1px solid #ccc;
  padding: 0px 20px 20px !important;
  margin: auto;
  margin-top: 40px;
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
