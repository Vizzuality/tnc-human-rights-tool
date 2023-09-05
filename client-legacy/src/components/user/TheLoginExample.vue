<template>
  <div>
    <div v-if="userAuthStore.isLoggedIn">
      {{ userAuthStore.username }} you are logged in.
      <br />
      <!-- {{ userAuthStore.userInfo }} -->
      Email: {{ userAuthStore.userInfo.email }}
      <br />
      User ID: {{ userAuthStore.userInfo.sub }}
    </div>
    <br />
    <div>
      <Button label="TNC Login" @click="userAuthStore.login" />
      <Button label="TNC Logout" @click="userAuthStore.logout" />
    </div>
    <br />
    <div style="display: flex; justify-content: space-between">
      <div
        style="
          border: 1px solid #ccc;
          padding: 20px;
          width: 300px;
          text-align: center;
        "
      ></div>
      <div style="border: 1px solid #ccc; padding: 20px">
        <h4>Create New Project Example</h4>
        <span class="p-float-label">
          <InputText id="projectName" type="text" v-model="projectName" />
          <label for="projectName">Project Name</label>
        </span>
        <br />
        <span class="p-float-label">
          <InputText
            id="projectDescription"
            type="text"
            v-model="projectDesc"
          />
          <label for="projectDescription">Project Description</label>
        </span>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useUserAuthStore } from '../../store/userAuthStore.js';

const userAuthStore = useUserAuthStore();

const projectName = ref('');
const projectDesc = ref('');
</script>

<style scoped></style>
