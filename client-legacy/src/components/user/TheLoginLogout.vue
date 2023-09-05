<template>
  <div style="margin-right: 10px">
    <Button
      v-if="!userAuthStore.isLoggedIn"
      label="Login"
      class="login p-button-sm"
      @click="userAuthStore.login"
    />
    <div v-else @click="toggle" class="loggedInIcon">{{ userInitials }}</div>
    <OverlayPanel ref="op">
      <div>
        <div style="font-weight: bold; font-size: 18px">
          {{ userAuthStore.username }}
        </div>
        <div>All edits saved. You can safely logout.</div>
        <br />
        <div style="text-align: right">
          <Button label="Logout" class="login p-button-sm" @click="logout" />
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';

import { useUserAuthStore } from '../../store/userAuthStore';
const userAuthStore = useUserAuthStore();

// computed function to create user initials
const userInitials = computed(() => {
  const nameArray = userAuthStore.username.split(' ');
  return nameArray[0][0] + nameArray[nameArray.length - 1][0];
});

// toggle for user logout area
const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};

// user logout button
const logout = () => {
  toggle();
  userAuthStore.logout();
};
</script>

<style scoped>
.loggedInIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: #dee2e6;
  font-size: 18px;
  font-weight: bold;
  color: #1f79ad !important;
  user-select: none;
}
.loggedInIcon:hover {
  cursor: pointer;
  background-color: #c2c5c8;
}
</style>
