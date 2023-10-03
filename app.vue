<script lang="ts" setup>
import { useAuthStore } from "./stores/auth.store";

const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  if (route.name === "login") {
    authStore.isReady = true;
  }

  if (!!authStore.isAuthenticated) {
    await authStore.getUserData();
  }
});
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <NuxtLayout v-if="authStore.isReady">
      <NuxtPage />
    </NuxtLayout>
    <CoreLoader v-else />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
