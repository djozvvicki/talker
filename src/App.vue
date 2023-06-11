<script lang="ts" setup>
import { initSW } from "@/utils";
import { onMounted } from "vue";
import useWorkerCommunicationService from "@services/worker-communication-service";

const { initMessageListener } = useWorkerCommunicationService();

onMounted(() => {
  if (import.meta.env.MODE !== "development") {
    initSW();
  }
  initMessageListener();
});
</script>

<template>
  <RouterView />
  <div id="modals"></div>
</template>
