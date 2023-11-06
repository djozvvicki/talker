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
  <div v-if="userData" class="flex w-full flex-col items-center text-black">
    <h1 class="text-center text-3xl">
      Hello, {{ userData?.user?.displayName ?? "guest" }}!
    </h1>
    <button
      class="hover:opacity-85 focus:opacity-85 mt-2 flex items-center justify-center gap-2 rounded-md bg-black p-2 text-white outline-none focus:outline-black"
      @click.prevent="logout"
    >
      <IconLogout />
      Sign out
    </button>
  </div>
</template>
