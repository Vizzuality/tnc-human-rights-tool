<template>
  <div class="wrapper">
    <div v-if="userAuthStore.isLoggedIn">
      <Button
        @click="userAuthStore.logout()"
        label="LOGOUT"
        class="p-button-outlined"
      />
      <br />
      Welcome {{ userAuthStore.username }}, you are logged in!

      <br />

      <div><b>Here is some of your user info below:</b></div>
      <br />
      {{ userAuthStore.userInfo }}
    </div>
    <div v-else>
      <Button
        @click="userAuthStore.login()"
        label="LOGIN"
        class="p-button-outlined"
      />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useUserAuthStore } from '../store/userAuthStore.js';
const userAuthStore = useUserAuthStore();
</script>

<style scoped>
.wrapper {
  margin-top: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  width: 400px;
}
</style>
