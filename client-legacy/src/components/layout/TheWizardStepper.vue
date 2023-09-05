<template>
  <div class="wizard-stepper">
    <div class="md-stepper-horizontal orange">
      <div class="md-step">
        <router-link :to="`../research?sid=${hrtStore.sessionId}`">
          <div class="md-step-circle">
            <!-- <span><i class="fa-solid fa-badge-check"></i></span> -->
          </div>
          <div class="md-step-title">Research</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </router-link>
      </div>
      <div class="md-step">
        <router-link :to="`../contextual_risk?sid=${hrtStore.sessionId}`">
          <div class="md-step-circle">
            <!-- <span><i class="fa-solid fa-badge-check"></i></span> -->
          </div>
          <div class="md-step-title">Contextual Risk</div>
          <!-- <div class="md-step-optional">Optional</div> -->
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </router-link>
      </div>
      <div :class="projectRiskClass">
        <router-link :to="`../project_risk?sid=${hrtStore.sessionId}`">
          <div class="md-step-circle"><span></span></div>
          <div class="md-step-title">Project Risk</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </router-link>
      </div>
      <div :class="followUpClass">
        <router-link :to="`../follow-up?sid=${hrtStore.sessionId}`">
          <div class="md-step-circle"><span></span></div>
          <div class="md-step-title">Follow-Up</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useHrtStore } from "../../store/hrtStore";

import Steps from "primevue/steps";

const hrtStore = useHrtStore();
const route = useRoute();
const activeRoute = computed(() => {
  // console.log('active route', route);
  return route;
});

// Can set % threshold below for how what % of indicators must be completed
// In order to unlock Project risk
const projectRiskClass = computed(() => {
  const contextualProgress = hrtStore.overallContextualRiskProgress;
  if (
    contextualProgress.indicatorsPercent > 3 &&
    contextualProgress.indicatorsYes >= 1
  ) {
    return ["md-step"];
  } else {
    return ["md-step", "disabled"];
  }
});

const followUpClass = computed(() => {
  const projectProgress = hrtStore.overallProjectRiskProgress;
  const contextualProgress = hrtStore.overallContextualRiskProgress;
  if (
    projectProgress.followUpCount > 0 &&
    contextualProgress.indicatorsYes >= 1
  ) {
    return ["md-step"];
  } else {
    return ["md-step", "disabled"];
  }
});

const saveAndShareClick = () => {
  shareLink.value = window.location.href;
  saveAndShare.value = true;
};
</script>

<style scoped>
.active {
  font-weight: bold;
  color: black;
}
.router-link-active {
  font-weight: bold;
  color: #1f79ad;
  color: #26363d;
  color: white;
  /* color: #38bb93; */
}

.md-stepper-horizontal {
  display: table;
  width: 100%;
  margin: 0 auto;
  /* background-color: #ffffff; */
}
.md-stepper-horizontal .md-step {
  display: table-cell;
  position: relative;
  padding: 4px;
}
/* .md-stepper-horizontal .md-step:hover,
.md-stepper-horizontal .md-step:active {
  background-color: rgba(0, 0, 0, 0.04);
} */
.md-stepper-horizontal .md-step:active {
  /* border-radius: 15% / 75%; */
}
.md-stepper-horizontal .md-step:first-child:active {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.md-stepper-horizontal .md-step:last-child:active {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.md-stepper-horizontal .md-step:hover .md-step-circle {
  background-color: #757575;
  background-color: #0c6d4e;
  background-color: #3cc398;
}
.md-stepper-horizontal .md-step:first-child .md-step-bar-left,
.md-stepper-horizontal .md-step:last-child .md-step-bar-right {
  display: none;
}
.md-stepper-horizontal .md-step .md-step-circle {
  width: 28px;
  height: 28px;
  margin: 0 auto;
  background-color: #999999;
  background-color: #3cc398;
  background-color: #0c6d4e;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  font-size: 14px;
  /* font-weight: 600; */
  /* color: #ffffff; */
}

.md-stepper-horizontal .md-step.active .md-step-circle {
  background-color: rgb(33, 150, 243);
}
.md-stepper-horizontal .md-step.done .md-step-circle:before {
  font-family: "FontAwesome";
  font-weight: 100;
  content: "\f00c";
}
.md-stepper-horizontal .md-step.done .md-step-circle *,
.md-stepper-horizontal .md-step.editable .md-step-circle * {
  display: none;
}
.md-stepper-horizontal .md-step.editable .md-step-circle {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
/* .md-stepper-horizontal .md-step.editable .md-step-circle:before {
  font-family: "FontAwesome";
  font-weight: 100;
  content: "\f040";
} */
.md-stepper-horizontal .md-step .md-step-title {
  margin-top: 8px;
  font-size: 15px;
  font-weight: 600;
  font-weight: normal;
}
.md-stepper-horizontal .md-step .md-step-title,
.md-stepper-horizontal .md-step .md-step-optional {
  text-align: center;
  color: rgba(0, 0, 0, 0.26);
  color: white;
}
.md-stepper-horizontal .md-step.active .md-step-title {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  color: white;
}
.md-stepper-horizontal .md-step.active.done .md-step-title,
.md-stepper-horizontal .md-step.active.editable .md-step-title {
  font-weight: 600;
}
.md-stepper-horizontal .md-step .md-step-optional {
  font-size: 12px;
}
.md-stepper-horizontal .md-step.active .md-step-optional {
  color: rgba(0, 0, 0, 0.54);
}
.md-stepper-horizontal .md-step .md-step-bar-left,
.md-stepper-horizontal .md-step .md-step-bar-right {
  position: absolute;
  top: 20px;
  height: 1px;
  border-top: 1px solid #dddddd;
  border-top: 1px solid #fff;
  border-top: 1px solid #93e7cc;
}
.md-stepper-horizontal .md-step .md-step-bar-right {
  right: 0;
  left: 50%;
  margin-left: 20px;
}
.md-stepper-horizontal .md-step .md-step-bar-left {
  left: 0;
  right: 50%;
  margin-right: 20px;
}

a.router-link-active.router-link-exact-active > div.md-step-title,
a.router-link-active > div.md-step-title {
  font-weight: bold;
  /* font-size: 1.1em; */
  /* color: red; */
}
a.router-link-active.router-link-exact-active > div.md-step-circle {
  background-color: #0c6d4e;
  background-color: #3cc398;
  border: 1px solid white;
  /* color: red; */
}

div.wizard-stepper > div.mdstep > a.router-link-active > div.md-step-title {
  color: red !important;
}

a.router-link-active.router-link-exact-active > div.md-step-title,
a.router-link-active > div.md-step-title {
  color: white;
  font-weight: bold !important;
  /* font-size: 16px; */
}

a.router-link-active > div.md-step-title {
  color: white !important;
  font-weight: bold !important;
}

/* a.router-link-active {
  background-color: #0c6d4e;
  background-color: #3cc398;
  border: 1px solid white;
} */

a.router-link-active > div.md-stepper-horizontal .md-step .md-step-circle {
  background-color: #0c6d4e;
  background-color: #3cc398;
  border: 1px solid white;
}
a.router-link-active > div.md-step-circle {
  background-color: #0c6d4e;
  background-color: #3cc398 !important;
  border: 1px solid white !important;
}

.disabled {
  pointer-events: none;
}

div.md-step.disabled .md-step-circle {
  opacity: 20%;
}

div.md-step.disabled .md-step-title {
  opacity: 40%;
}
</style>
