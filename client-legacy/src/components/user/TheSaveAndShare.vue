<template>
  <div class="saveAndShare" @click="toggle">
    <i class="pi pi-share-alt"></i>
  </div>
  <OverlayPanel ref="op" style="width: 300px">
    <div>
      <div style="font-weight: bold; font-size: 18px">Save and Share</div>
      <div class="mt-2">
        Save and Share link for now, until we know where to put it (anyone with
        link can view, even outside TNC)
      </div>

      <div class="flex justify-content-between mt-3">
        <a :href="saveAndShareLink" target="_blank">Report Link</a>
        <Button
          @click="saveAndShareLinkCopy"
          label="Copy Link"
          class="login p-button-sm"
        />
      </div>

      <!-- <div style="font-weight: bold; font-size: 18px">
        {{ userAuthStore.username }}
      </div>
      <div>All edits saved. You can safely logout.</div>
      <br />
      <div style="text-align: right">
        <Button label="Logout" class="login p-button-sm" @click="logout" />
      </div> -->
    </div>
  </OverlayPanel>

  <!-- <Avatar
    icon="pi pi-share-alt"
    style="background-color: #dee2e6; color: black"
    shape="circle"
    class="saveAndShare"
  /> -->
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";

import { useHrtStore } from "../../store/hrtStore";
const hrtStore = useHrtStore();

// toggle for user logout area
const op = ref();
const toggle = (event) => {
  op.value.toggle(event);
};

const saveAndShareLink = ref(
  window.location.origin + "/report?sid=" + hrtStore.sessionId
);

const saveAndShareLinkCopy = () => {
  navigator.clipboard.writeText(saveAndShareLink.value);
  toggle();
};
</script>

<style>
.saveAndShare {
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  /* border-radius: 100px; */
  /* background-color: #dee2e6; */
  font-size: 18px;
  font-weight: bold;
  color: rgb(61, 61, 61) !important;
  user-select: none;
}
.saveAndShare:hover {
  cursor: pointer;
  background: #3cc398;
  /* color: black; */
  font-weight: bold;
  /* background-color: #c2c5c8; */
}
</style>
