<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <h2>Research</h2>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useHrtStore } from '../../store/hrtStore';

const hrtStore = useHrtStore();

const first = ref(0);
// const projects = mapStore.projectsInBbox;
// const projects = computed(() => mapStore.projectsInBbox);
// const collection = computed(() => generalStore.selectedCollection);
</script>

<style scoped></style>
