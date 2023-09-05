<template>
  <div>
    <div
      v-if="userAuthStore.isEditSaving == true"
      style="font-size: 14px; color: #818181"
    >
      Saving edits...
    </div>

    <div
      v-else-if="userAuthStore.isEditSaving == false"
      style="display: flex; align-items: center"
    >
      <div>
        <i
          style="
            position: absolute;
            font-size: 9px;
            margin-top: 9px;
            margin-left: 5px;
            color: #818181;
          "
          class="pi pi-check"
        ></i>
        <i style="font-size: 25px; color: #818181" class="pi pi-cloud"></i>
      </div>
      <div style="margin-left: 5px; color: #818181; font-size: 14px">
        All edits saved
      </div>
    </div>
    <div
      style="font-size: 14px; color: #cf1c1c"
      v-else-if="userAuthStore.isEditSaving == 'error'"
    >
      Error saving data!
    </div>
  </div>
</template>

<script setup>
import { useUserAuthStore } from '../../store/userAuthStore';
const userAuthStore = useUserAuthStore();
</script>

<style></style>
