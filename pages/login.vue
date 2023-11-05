<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";

const userName = useStorage("LOGIN_userName", "");
const password = useStorage("LOGIN_password", "");

const { login } = useAuthStore();

definePageMeta({
  layout: "empty",
});

useHead({
  title: "Login",
});
</script>

<template>
  <form class="flex h-2/3 w-1/2 flex-col gap-2">
    <input
      v-model="userName"
      type="text"
      placeholder="Username"
      class="border-b border-black bg-transparent p-2 text-black outline-none focus:bg-gray-200"
    />
    <input
      v-model="password"
      type="text"
      placeholder="Password"
      class="border-b border-black bg-transparent p-2 text-black outline-none focus:bg-gray-200"
    />
    <button
      class="w-1/2 self-start rounded-lg border-2 bg-black p-2 text-white"
      @click.prevent="() => login({ userName, password })"
    >
      Sign in
    </button>
  </form>
</template>
