<script lang="ts" setup>
import { initSW } from "@/utils";
import { onMounted } from "vue";
import useWorkerCommunicationService from "@services/worker-communication-service";
const { initSWMessageListener } = useWorkerCommunicationService();

onMounted(() => {
  if (import.meta.env.MODE !== "development") {
    initSW();
    initSWMessageListener();
  }
});
</script>

<template>
  <RouterView />
  <div id="modals"></div>
</template>
