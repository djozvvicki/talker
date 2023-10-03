<script setup lang="ts">
import { IconExclamationCircle } from "@tabler/icons-vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

defineProps({ error: Object });
</script>

<template>
  <div class="flex w-full h-screen flex-col items-center justify-center">
    <div class="flex">
      <IconExclamationCircle :size="64" class="text-[#d43434d5]" />
    </div>
    <h1 class="font-bold text-black text-3xl text-error mt-4">
      Wystąpił błąd
      <span class="text-[#c9d434d5]">{{ error?.statusCode }}</span>
    </h1>
    <span class="text-600 text-black text-2xl mt-4">{{
      error?.message ?? error?.statusMessage
    }}</span>

    <div class="col-12 mt-5 text-center">
      <i
        class="pi pi-arrow-left text-blue-500 mr-2"
        style="vertical-align: center"
      ></i>
      <NuxtLink v-if="error?.statusCode !== 401" class="text-gray-600" to="/">
        Wróć do strony głównej
      </NuxtLink>
      <button v-else class="text-gray-600" @click="authStore.signOut(true)">
        Wróć do strony logowania
      </button>
    </div>
  </div>
</template>
