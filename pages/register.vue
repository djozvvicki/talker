<script lang="ts" setup>
import { IconLock, IconUser } from "@tabler/icons-vue";
import { useStorage } from "@vueuse/core";
import logo from "~/assets/img/logo.png";
import { useAuthStore } from "~/stores/auth.store";
import bg from "~/assets/img/index-bg.png";

const displayName = useStorage("TLKR_name", "");
const userName = useStorage("TLKR_usrNm", "");
const password = useStorage("TLKR_pass", "");
const repeatPassword = useStorage("TLKR_rpPass", "");

const { register } = useAuthStore();

definePageMeta({
  layout: "empty",
});

useHead({
  title: "Register",
});
</script>

<template>
  <form class="relative flex h-full w-full flex-col items-center gap-2">
    <img
      class="absolute z-0 h-screen w-full scale-110 blur-[4px]"
      :src="bg"
      alt="Page background"
    />
    <img
      class="absolute z-0 h-screen w-full scale-110 blur-[4px]"
      :src="bg"
      alt="Page background"
    />
    <div class="z-2 relative flex h-3/6 flex-col items-center justify-center">
      <img :src="logo" alt="123" class="mb-2 xs:h-[10rem] xs:w-[10rem]" />
      <h1 class="dark:text-text text-[42px] font-black">Talker</h1>
      <p class="text-md w-10/12 text-center font-semibold">
        Connect with your favourite people and share them your unbreathly
        moments
      </p>
    </div>
    <div class="absolute bottom-[0.1rem] flex w-full flex-col gap-2 p-4">
      <CoreInput v-model="displayName" placeholder="Name" type="text">
        <template #icon> <IconUser /> </template>
      </CoreInput>
      <CoreInput v-model="userName" placeholder="Username" type="text">
        <template #icon> <IconUser /> </template>
      </CoreInput>
      <CoreInput v-model="password" placeholder="Password" type="password">
        <template #icon> <IconLock /></template>
      </CoreInput>
      <CoreInput
        v-model="repeatPassword"
        placeholder="Repeat password"
        type="password"
      >
        <template #icon> <IconLock /></template>
      </CoreInput>
      <NuxtLink to="/forgot" class="hover:underline focus:underline"
        >Forgot password?</NuxtLink
      >
      <div class="flex flex-col gap-2">
        <button
          class="w-full rounded-lg bg-dark px-4 py-2 text-light"
          :disabled="password !== repeatPassword"
          @click.prevent="() => register({ userName, password, displayName })"
        >
          Create account
        </button>
        <div class="relative my-2 flex items-center justify-center">
          <span class="w-full border-t border-dark"></span>
          <p class="w-1/12 p-2">or</p>
          <span class="w-full border-t border-dark"></span>
        </div>
        <button
          class="w-full rounded-lg border-4 border-dark bg-[transparent] px-4 py-2 text-dark"
          @click.prevent="() => navigateTo('/login')"
        >
          Log in
        </button>
      </div>
    </div>
  </form>
</template>
