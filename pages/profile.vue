<script lang="ts" setup>
import { IconLogout } from "@tabler/icons-vue";
import { useAuthStore } from "~/stores/auth.store";
import { useUserService } from "~/services/user.service";
import { IUser, Nullable } from "~/types/global";

const userData = ref<Nullable<IUser>>();

const { logout } = useAuthStore();
const { getUserData } = useUserService();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Profile",
});

onMounted(async () => {
  userData.value = await getUserData();
});
</script>

<template>
  <div class="text-black w-full flex flex-col items-center">
    <h1 class="text-3xl text-center">
      Hello, {{ userData?.displayName ?? "guest" }}!
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
