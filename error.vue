<script setup lang="ts">
import { IconExclamationCircle } from "@tabler/icons-vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

defineProps({ error: Object });
</script>

<template>
  <div class="flex w-full h-screen flex-col items-center justify-center">
    <IconExclamationCircle :size="64" class="text-[#d43434d5]" />
    <h1 class="font-bold text-black text-4xl mt-4">
      Wystąpił błąd
      <span class="text-[#d43434d5]">{{ error?.statusCode }}</span>
    </h1>
    <span class="text-600 text-black text-3xl mt-4">{{
      error?.message ?? error?.statusMessage
    }}</span>
    <NuxtLink
      v-if="error?.statusCode !== 401"
      class="text-white bg-black focus:outline-black p-2 px-4 rounded-lg text-lg mt-4"
      to="/"
    >
      Stona główna
    </NuxtLink>
    <button
      v-else
      class="text-white bg-black focus:outline-black p-2 px-4 rounded-lg text-lg mt-4"
      @click="authStore.signOut(true)"
    >
      Zaloguj się
    </button>
  </div>
</template>
