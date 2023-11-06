<script setup lang="ts">
import { IconExclamationCircle } from "@tabler/icons-vue";

const handleRouteChange = () => {
  navigateTo("/login");
};

defineProps({ error: Object });
</script>

<template>
  <div class="flex h-screen w-full flex-col items-center justify-center">
    <IconExclamationCircle :size="64" class="text-[#d43434d5]" />
    <h1 class="mt-4 text-4xl font-bold text-dark">
      Wystąpił błąd
      <span class="text-[#d43434d5]">{{ error?.statusCode }}</span>
    </h1>
    <span class="text-600 mt-4 text-3xl text-dark">
      {{ error?.message ?? error?.statusMessage ?? "" }}
    </span>
    <NuxtLink
      v-if="error?.statusCode !== 401"
      class="mt-4 rounded-lg bg-dark p-2 px-4 text-lg text-light focus:outline-dark"
      to="/app"
    >
      Stona główna
    </NuxtLink>
    <button
      v-else
      class="mt-4 rounded-lg bg-dark p-2 px-4 text-lg text-light focus:outline-dark"
      @click="handleRouteChange"
    >
      Zaloguj się
    </button>
  </div>
</template>
