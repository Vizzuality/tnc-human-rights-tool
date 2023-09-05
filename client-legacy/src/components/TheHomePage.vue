<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <div class="container">
      <div class="grid home-overview">
        <div v-if="userAuthStore.isLoggedIn" class="col-6 md:col-6 lg:col-7">
          <TheUserProjects class="user-projects" />
          <!-- <div class="splash-image">
            <img src="../assets/About-Us_Our-Vision_V1.jpg" />
          </div> -->
        </div>
        <div v-else class="col-6 md:col-6 lg:col-7">
          <div class="splash-image">
            <img src="../assets/About-Us_Our-Vision_V1.jpg" />
          </div>

          <!-- It seems you are not logged in,
          <span @click="userAuthStore.login"><b>log in here...</b></span> -->
        </div>

        <div class="col-6 md:col-6 lg:col-5">
          <h1>Human Rights Toolset</h1>
          <p class="overview">
            This Human Rights Toolset, sponsored by the Natural Climate
            Solutions (NCS) Science team, provides a screening process that will
            help TNC field teams <strong>identify project risks</strong> from a
            human rights-based perspective and
            <strong>prioritize those risks</strong> for further attention and
            action in collaboration with IPLCs. It represents a first step to
            fulfill the larger responsibility of
            <strong>human rights due diligence</strong>.
          </p>
          <p class="overview" v-if="!userAuthStore.isLoggedIn">
            Log in to get started.
          </p>

          <!-- <router-link to="/about">
            <Button label="Learn more" class="p-button-outlined home-button" />
          </router-link> -->

          <Button
            label="Get Started"
            class="home-button"
            @click="userAuthStore.login"
            v-if="!userAuthStore.isLoggedIn"
          />

          <Button
            label="Add a Project"
            class="home-button"
            v-if="userAuthStore.isLoggedIn"
            @click="newProjectModal = true"
          />
        </div>
      </div>

      <div class="grid mock" v-if="userAuthStore.isLoggedIn">
        <!-- <div class="col-6 md:col-6 lg:col-7">
          <TheUserProjects />
        </div> -->
      </div>
    </div>
  </div>

  <Dialog
    header="Create New Project"
    v-model:visible="newProjectModal"
    :modal="true"
  >
    <div class="p-inputgroup">
      <InputText
        placeholder="Project Name"
        v-model="newProjectName"
        style="width: 400px; margin-top: 5px"
      />
    </div>
    <br />
    <div class="p-inputgroup">
      <InputText
        placeholder="Project Description"
        v-model="newProjectDescription"
        style="width: 400px"
      />
    </div>
    <br />
    <div style="text-align: right">
      <Button label="Create Project" @click="newProjectSave" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHrtStore } from "../store/hrtStore";
import { useUserAuthStore } from "../store/userAuthStore.js";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
// import DataTable from "primevue/datatable";
// import Column from "primevue/column";
import TheLoginExample from "./user/TheLoginExample.vue";
import TheUserProjects from "./user/TheUserProjects.vue";
import router from "../router/router";

const first = ref(0);
const hrtStore = useHrtStore();
const userAuthStore = useUserAuthStore();
// const projects = mapStore.projectsInBbox;
// const projects = computed(() => mapStore.projectsInBbox);
// const collection = computed(() => generalStore.selectedCollection);

const projects = [
  {
    id: "V1StGXR8_Z5jdHi6B-myT",
    name: "Restoring forests in the Amazon",
    last_updated: "14 January 2022",
  },
  {
    id: "o3FtGpE9_A2tdHeh7-jr9",
    name: "Protecting grasslands in the Okavango Delta",
    last_updated: "20 January 2023",
  },
  {
    id: "GBft9RyT_S3j8He0jv-qv1",
    name: "Improving agriculture in the Chesapeake Bay",
    last_updated: "3 February 2023",
  },
];

const newSession = () => {
  hrtStore.setSessionId();
  // console.log(router);
  // this.$router.push({ query: { plan: 'private' } });
  router.push({
    path: "/research",
    query: { sid: hrtStore.sessionId },
  });
  // console.log('loadSession', sessionId);
  // console.log(sessionId);
  // Create new blank indicators template
  // hrtStore.createIndicatorsTemplate();
  // // Load indicator responses
};
const loadSession = (sessionId) => {
  // console.log(router);
  // this.$router.push({ query: { plan: 'private' } });
  router.push({
    path: "/contextual_risk",
    query: { sid: sessionId },
  });
  // console.log('loadSession', sessionId);
  // console.log(sessionId);
  // Create new blank indicators template
  // hrtStore.createIndicatorsTemplate();
  // // Load indicator responses
  if (!sessionId) {
    hrtStore.setSessionId();
  }
};

//  create project logic *********************************************************************************************************
const newProjectModal = ref(false);
const newProjectName = ref("");
const newProjectDescription = ref("");
const newProjectInit = () => {
  newProjectModal.value = true;
};

const newProjectSave = async () => {
  newProjectModal.value = false;
  await userAuthStore.createUserProject({
    name: newProjectName.value,
    description: newProjectDescription.value,
  });
  newProjectName.value = "";
  newProjectDescription.value = "";
};
</script>

<style>
h1,
h2 {
  color: #444;
}
h2 {
  font-size: 20px;
}
a {
  color: #2196f3;
}
a:hover {
  border-bottom: 1px solid #2196f3;
}
.container {
  margin: 20px 20px;
}
.splash-image {
  /* height: 350px;
  width: 96%; */
  border: 1px solid #ccc;
  margin: 10px 20px 20px 0;
  background: white;
  border-radius: 10px;
}
.splash-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.user-projects {
  margin: 20px 20px 0 0;
}
.mock {
  margin-top: 0px;
  padding-top: 0px;
  border-top: 0px solid #fff;
}
a {
  border-bottom: 0;
  text-decoration: none;
}
p.overview {
  font-size: 20px;
  background: transparent;
  line-height: 1.5em;
  margin: 0 0 20px;
  padding: 0 0;
}
.home-button {
  margin-right: 15px !important;
}
.home-overview {
  border-bottom: 0px solid #ccc;
  padding: 0 0 0px;
  margin: 10px 0 0;
}

.p-button {
  background: #1f79ad !important;
  color: #fff !important;
}
</style>
