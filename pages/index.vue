<script lang="ts" setup>
import logo from "~/assets/img/logo.png";
import bg from "~/assets/img/index-bg.png";
import { useAuthStore } from "~/stores/auth.store";

definePageMeta({
  layout: "empty",
});

useHead({
  title: "Login",
});
</script>

<template>
  <div class="relative flex h-screen w-full">
    <img
      class="absolute z-0 h-screen w-full scale-110 blur-[4px]"
      :src="bg"
      alt="Page background"
    />
    <div class="z-2 relative flex h-5/6 flex-col items-center justify-center">
      <img :src="logo" alt="123" class="mb-2 xs:h-[10rem] xs:w-[10rem]" />
      <h1 class="dark:text-text text-[42px] font-black">Talker</h1>
      <p class="text-md w-10/12 text-center font-semibold">
        Connect with your favourite people and share them your unbreathly
        moments
      </p>
    </div>
    <div class="absolute bottom-[0.5rem] flex w-full flex-col gap-2 p-2">
      <button
        class="w-full self-start rounded-lg bg-dark px-4 py-2 text-light"
        @click.prevent="() => navigateTo('/app')"
      >
        Click to begin
      </button>
    </div>
  </div>
</template>
