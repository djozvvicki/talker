<script lang="ts" setup>
import { useAuthStore } from "./stores/auth.store";

const route = useRoute();
const { userData } = useAuthStore();

const showPage = computed(() => route.path === "/login" || userData?.loggedIn);
</script>

<template>
  <div class="w-full h-screen relative overflow-hidden">
    <NuxtLayout>
      <NuxtPage v-show="showPage" />
      <CoreLoader v-show="!showPage" />
    </NuxtLayout>
  </div>
</template>
