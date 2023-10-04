<script lang="ts" setup>
import { useAuthStore } from "./stores/auth.store";

const authStore = useAuthStore();
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <NuxtLayout>
      <NuxtPage v-if="authStore.isReady" />
      <CoreLoader v-else />
    </NuxtLayout>
  </div>
</template>
