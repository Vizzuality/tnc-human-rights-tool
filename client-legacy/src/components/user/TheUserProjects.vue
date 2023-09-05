<template>
  <div>
    <h2>Welcome back, {{ userAuthStore.username }}</h2>
    <div v-if="userAuthStore.userProjects == 0">
      You have no projects started yet
      <div style="width: 100%">
        <Button label="Create a project" @click="newProjectModal = true" />
      </div>
    </div>

    <DataTable v-else :value="userAuthStore.userProjects">
      <Column field="date_updated" header="Last Updated">
        <template #body="slotProps">
          {{ slotProps.data.date_updated.split("T")[0] }}
        </template>
      </Column>
      <Column field="name" header="Project">
        <template #body="slotProps">
          <a
            style="font-weight: bold; font-size: 16px"
            href=""
            @click="loadSession(slotProps.data.session_id)"
          >
            {{ slotProps.data.name }}
          </a>
          <div>{{ slotProps.data.description }}</div>
        </template>
      </Column>
      <!-- <Column field="description" header="Description"></Column> -->
      <Column field="" header="Progress">
        <template #body="slotProps">
          <div v-if="slotProps.data.answercount > 0">
            <circle-progress
              :percent="(slotProps.data.answercount / responseObjectSize) * 100"
              :size="35"
              :border-width="5"
              :border-bg-width="5"
              fill-color="#38bb93"
            />
          </div>
          <div v-else>Not Started</div>
        </template>
      </Column>
      <Column field="" header="">
        <template #header>
          <!-- <Button label="New Project" /> -->
          <div style="width: 100%; text-align: right">
            <Button icon="pi pi-plus" @click="newProjectModal = true" />
          </div>
        </template>
        <template #body="slotProps">
          <div style="display: flex; justify-content: end">
            <Button
              style="margin-right: 3px"
              icon="pi pi-pencil"
              @click="updateProjectInit(slotProps)"
            />
            <Button icon="pi pi-trash" @click="deleteProjectInit(slotProps)" />
          </div>
        </template>
      </Column>
    </DataTable>
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
    <!-- Update project modal -->
    <Dialog
      header="Update Project"
      v-model:visible="updateProjectModal"
      :modal="true"
    >
      <div class="p-inputgroup">
        <InputText
          placeholder="Project Name"
          v-model="updateProjectName"
          style="width: 400px; margin-top: 5px"
        />
      </div>
      <br />
      <div class="p-inputgroup">
        <InputText
          placeholder="Project Description"
          v-model="updateProjectDescription"
          style="width: 400px"
        />
      </div>
      <br />
      <div style="text-align: right">
        <Button label="Update Project" @click="updateProject" />
      </div>
    </Dialog>
    <!-- delete project modal window -->
    <Dialog
      header="Delete Project"
      v-model:visible="projectDeleteModal"
      :modal="true"
    >
      <div>
        Are you sure you want to delete <b>"{{ deleteProjectName }}"</b>
      </div>
      <br />
      <div style="display: flex; justify-content: space-between">
        <Button
          @click="projectDeleteModal = false"
          style="margin-right: 3px"
          label="Cancel"
        />
        <Button
          @click="finalProjectDelete"
          label="Yes, Delete"
          class="p-button-danger"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

import router from "../../router/router";

import { useHrtStore } from "../../store/hrtStore.js";
import { useUserAuthStore } from "../../store/userAuthStore.js";
const userAuthStore = useUserAuthStore();
const hrtStore = useHrtStore();
let size = Object.keys(hrtStore.indicatorResponsesObject).length;

const responseObjectSize = ref(size);

// load new session when user clicks on project name *********************************************************************************************************
const loadSession = (sessionId) => {
  router.push({
    path: "/contextual_risk",
    query: { sid: sessionId },
  });
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

// update project logic ***************************************************************************************************************
const updateProjectModal = ref(false);
const updateProjectName = ref("");
const updateProjectDescription = ref("");
const updateProjectId = ref("");
const updateProjectInit = (params) => {
  updateProjectName.value = params.data.name;
  updateProjectDescription.value = params.data.description;
  updateProjectId.value = params.data.id;
  updateProjectModal.value = true;
};
const updateProject = async () => {
  updateProjectModal.value = false;
  await userAuthStore.updateUserProject({
    id: updateProjectId.value,
    name: updateProjectName.value,
    description: updateProjectDescription.value,
  });
};
// delete project logic ************************************************************************************
const deleteProjectName = ref("");
const deleteProjectData = ref("");
const projectDeleteModal = ref(false);
const deleteProjectInit = (params) => {
  deleteProjectName.value = params.data.name;
  deleteProjectData.value = params.data;
  projectDeleteModal.value = true;
};
const finalProjectDelete = async () => {
  projectDeleteModal.value = false;
  await userAuthStore.deleteUserProject(deleteProjectData.value.id);
};
</script>

<style scoped></style>
