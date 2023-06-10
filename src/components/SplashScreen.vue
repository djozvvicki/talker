<script lang="ts" setup>
import Talker from "@assets/talker.svg";
import { APP_ROUTE_NAMES, SPLASH_SCREEN_TIME } from "@/constants";
import { type Ref, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loader from "@components/Loader.vue";
import useNotificationService from "@/services/notifications-service";

const { query } = useRoute();
const router = useRouter();
const splashScreenTimeout: Ref<NodeJS.Timeout | null> = ref(null);
const { requestPermission } = useNotificationService();

const hideSplashScreen = () => {
  console.log("hide splash screen");

  router.replace({
    name: APP_ROUTE_NAMES.INDEX,
    query,
  });
  if (splashScreenTimeout.value) {
    clearTimeout(splashScreenTimeout.value);
    splashScreenTimeout.value = null;
  }
};

onMounted(async () => {
  await requestPermission();

  splashScreenTimeout.value = setTimeout(hideSplashScreen, SPLASH_SCREEN_TIME);
});
</script>

<template>
  <div
    class="relative flex w-full min-h-screen items-center flex-col justify-center bg-[#FAFFFC]"
  >
    <img :src="Talker" alt="Talker - Chat app" width="152" />
    <h1 class="font-black text-4xl mb-10 mt-4">Talker</h1>

    <Loader />

    <p class="text-sm absolute bottom-2">2023 &copy; Dominik Jóźwicki</p>
  </div>
</template>
