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
  <form class="w-1/2 h-1/4 flex gap-2 flex-col">
    <input
      type="text"
      placeholder="Username"
      v-model="userName"
      class="text-black bg-transparent border-b border-black p-2 outline-none focus:bg-gray-200"
    />
    <input
      type="text"
      v-model="password"
      placeholder="Password"
      class="text-black bg-transparent border-b border-black p-2 outline-none focus:bg-gray-200"
    />
    <button
      @click.prevent="() => login({ userName, password })"
      class="text-white bg-black p-2 border-2 self-start w-1/2 rounded-lg"
    >
      Sign in
    </button>
  </form>
</template>
