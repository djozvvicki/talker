<script lang="ts" setup>
import { IconLogout } from "@tabler/icons-vue";
import { useAuthStore } from "~/stores/auth.store";

const { userData, logout } = useAuthStore();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Profile",
});
</script>

<template>
  <div v-if="userData" class="text-black w-full flex flex-col items-center">
    <h1 class="text-3xl text-center">
      Hello, {{ userData?.user?.displayName ?? "guest" }}!
    </h1>
    <button
      class="flex items-center justify-center text-white gap-2 mt-2 p-2 rounded-md bg-black hover:opacity-85 focus:opacity-85 outline-none focus:outline-black"
      @click.prevent="logout"
    >
      <IconLogout />
      Sign out
    </button>
  </div>
</template>
