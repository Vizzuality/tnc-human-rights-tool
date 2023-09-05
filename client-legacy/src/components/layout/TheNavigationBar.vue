<template>
  <div class="nav-wrapper flex align-items-center">
    <span class="ncs-logo">
      <router-link to="/">
        <div class="flex align-items-center">
          <img src="../../assets/naturebase_logo_CZ_just_dots.png" />
          <div style="display: flex; flex-direction: column" class="logo-text">
            <span class="hrt-logo">human rights<br />toolset</span>
          </div>
        </div>
      </router-link>
    </span>
    <div class="flex align-items-center ml-auto">
      <router-link :to="`../?sid=${hrtStore.sessionId}`" class="nav-link">
        Home
      </router-link>
      <span class="nav-link">My Projects</span>
      <span class="nav-link">Learn More</span>
      <!-- <span class="nav-link">Help</span> -->
      <!-- <span class="nav-link">Give Feedback!</span> -->
      <div class="nav-link"><TheLoginLogout /></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import Menubar from 'primevue/menubar';
// import InputText from 'primevue/inputtext';
// import Avatar from 'primevue/avatar';

// import Dialog from 'primevue/dialog';

import TheLoginLogout from "../user/TheLoginLogout.vue";

import { useUserAuthStore } from "../../store/userAuthStore.js";
const userAuthStore = useUserAuthStore();

import { useHrtStore } from "../../store/hrtStore";
const hrtStore = useHrtStore();

// // save and share related code
// const items = ref([]);
// const saveAndShare = ref(false);
// const shareLink = ref();
// const saveAndShareText = ref(false);

// const saveAndShareClick = () => {
//   shareLink.value = window.location.href;
//   saveAndShare.value = true;
// };
// const copyLink = async () => {
//   navigator.clipboard.writeText(shareLink.value);
//   saveAndShareText.value = true;
//   setTimeout(() => {
//     saveAndShareText.value = false;
//     saveAndShare.value = false;
//   }, 1500);
// };

const logInOut = () => {
  if (userAuthStore.isLoggedIn) {
    userAuthStore.logout();
  } else {
    userAuthStore.login();
  }
};
</script>

<style scoped>
.nav-wrapper {
  padding: 5px 5px 0px;
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
}

.headerButton:hover {
  cursor: pointer;
  background-color: #c2c5c8;
}

.p-menubar {
  padding: 5px 0;
}

.ncs-logo {
  /* padding: 5px 10px; */
  margin: 0px;
  /* font-family: Avenir, Helvetica, sans-serif; */
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
  /* font-family: 'Comic Sans MS', 'Comic Sans', 'Papyrus'; */
}

.hrt-logo {
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
  font-weight: bold;
  margin: 0 10px 0 10px;
  font-size: 24px;
  line-height: 1em;
  color: #26363d;
  text-shadow: 1px 1px 1px #fff;
}
.ncs-logo img {
  height: 50px;
  margin-left: 10px;
  margin-right: 0px;
  margin-bottom: -10px;
}
.ncs-logo a {
  font-size: 28px;
  text-decoration: none;
}
.ncs-logo-ncs-sub {
  font-size: 13px;
  margin-top: -4px;
  margin-left: 12px;
  color: #324874;
  color: #26363d;
}
.ncs-logo-ncs {
  /* background: #115e5b;
  background: #d32f2f;
  background: */
  font-weight: bold;
  color: #324874;
  color: #26363d;
  padding: 0px 10px;
  border-radius: 3px;
  /* font-family: Avenir, Helvetica, sans-serif; */
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
  font-size: 36px;
  /* font-family: 'Comic Sans MS', 'Comic Sans', 'Papyrus'; */
}
.avatar {
  margin-right: 10px;
}
.logo-text {
  margin-top: 10px;
}
.ncs-logo-map {
  color: #495057;
  margin-left: 10px;
}
.geosearch {
  margin: 0 10px;
}
.geocoder {
  width: 200px;
  height: 50px;
  margin: 0 0;
  padding: 0 0;
}

.geosearch input {
  width: 300px;
  border-radius: 5px;
  /* font-family: Avenir, Helvetica, sans-serif; */
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
}
.my-ncs {
  margin: 0 15px;
}
.p-menubar {
  background: none !important;
  border: 0px !important;
}
.p-menubar-start {
  margin-right: 40px;
}
.nav-link {
  margin-left: 40px;
  margin-right: 20px;
  font-family: "Space Grotesk", Avenir, Helvetica, sans-serif;
}
.active {
  font-weight: bold;
  color: black;
}
</style>
