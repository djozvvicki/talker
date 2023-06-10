<script lang="ts" setup>
import { initSW } from "@/utils";
import { onMounted } from "vue";

onMounted(() => {
  initSW();
});
</script>

<template>
  <RouterView />
  <div id="modals"></div>
</template>
