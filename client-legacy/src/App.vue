<template>
  <TheNavigationBar />
  <!-- <TheNavigationBar v-if="!generalStore.query.embed" /> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view></router-view>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import ExampleAuthInfo from "./components/ExampleAuthInfo.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavigationBar from "./components/layout/TheNavigationBar.vue";
import { useUserAuthStore } from "./store/userAuthStore";
import { useHrtStore } from "./store/hrtStore";
const userAuthStore = useUserAuthStore();
const hrtStore = useHrtStore();
const route = useRoute();

onMounted(async () => {
  // check for login at load of site
  // await userAuthStore.attemptSilentTokenRefresh();
  await userAuthStore.getUsersProjects();
});
</script>

<style>
html,
body {
  background-color: #f2f2f2;
  color: black;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  /* margin-bottom: 20px; */
}
div#app {
  max-width: 1500px;
}
</style>
