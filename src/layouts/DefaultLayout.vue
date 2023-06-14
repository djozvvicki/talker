<script lang="ts" setup>
import { onMounted } from "vue";
import { useCurrentUser } from "vuefire";
import { getCapitalTitle } from "@/utils";
import Avatar from "@/components/Avatar.vue";
import { APP_ROUTE_NAMES } from "@/constants";
import useNotificationService from "@/services/notifications-service";
import useWorkerCommunicationService from "@/services/worker-communication-service";
import useGeneralStore from "@/store/general-store";
import {
  IconPhone,
  IconMessage,
  IconUsers,
  IconBell,
  IconAffiliate,
  IconBellFilled,
  IconSettings,
  IconSettingsFilled,
} from "@tabler/icons-vue";
import useUsersService from "@/services/users-service";
import Splash from "@/pages/Splash.vue";

const currentUser = useCurrentUser();
const generalStore = useGeneralStore();
const { getActualUserData } = useUsersService();
const {
  notifications,
  initNotificationListener,
  initCloudMessageListener,
  requestPermission,
} = useNotificationService();
const { bc } = useWorkerCommunicationService();

onMounted(async () => {
  if (currentUser.value) {
    const userData = await getActualUserData(currentUser.value.uid);

    generalStore.setUserData(userData);

    await requestPermission();
    initCloudMessageListener();
    initNotificationListener();

    bc.postMessage({
      type: "CLAIM_CLIENTS",
    });

    if (generalStore.actualView === APP_ROUTE_NAMES.INDEX) {
      generalStore.setActualView(APP_ROUTE_NAMES.CHATS);
    }
  }
});
</script>

<template>
  <div
    v-if="generalStore.userData"
    id="default-layout"
    class="bg-black w-full h-screen"
  >
    <div class="w-full h-[90%] bg-[#FAFFFC] rounded-b-[70px]">
      <header
        class="w-full h-[10%] flex items-center justify-between pr-4 pl-4"
      >
        <div class="flex items-center">
          <h1
            v-if="generalStore.actualView !== APP_ROUTE_NAMES.PROFILE"
            class="font-extrabold text-3xl ml-2"
          >
            {{ getCapitalTitle(generalStore.actualView) }}
          </h1>
          <h1 v-else class="font-extrabold text-3xl ml-2">
            {{ generalStore.userData?.name }}
          </h1>
        </div>
        <div class="flex gap-4">
          <button
            class="relative w-10 h-10 close-button flex items-center justify-center"
            @click="generalStore.setActualView(APP_ROUTE_NAMES.NOTIFICATIONS)"
          >
            <IconBell
              v-if="generalStore.actualView !== APP_ROUTE_NAMES.NOTIFICATIONS"
              class="text-[#121212] scale-[200%] rounded-full p-1 bg-[#12121207]"
            />
            <IconBellFilled
              v-else
              class="text-[#121212] scale-[200%] rounded-full p-1 bg-[#12121207]"
            />
            <span
              v-if="notifications.some(({ isReaded }) => !isReaded)"
              class="w-2 h-2 absolute top-1 right-1 bg-[#ff0000] rounded-full"
            ></span>
          </button>
          <button
            class="relative w-10 h-10 close-button flex items-center justify-center"
            @click="generalStore.setActualView(APP_ROUTE_NAMES.SETTINGS)"
          >
            <IconSettings
              v-if="generalStore.actualView !== APP_ROUTE_NAMES.SETTINGS"
              class="text-[#121212] scale-[200%] rounded-full p-1 bg-[#12121207]"
            />
            <IconSettingsFilled
              v-else
              class="text-[#121212] scale-[200%] rounded-full p-1 bg-[#12121207]"
            />
          </button>
        </div>
      </header>
      <slot name="content" />
    </div>
    <nav class="flex h-[10%]">
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="generalStore.setActualView(APP_ROUTE_NAMES.CHATS)"
      >
        <IconMessage
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: generalStore.actualView === APP_ROUTE_NAMES.CHATS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="generalStore.setActualView(APP_ROUTE_NAMES.FRIENDS)"
      >
        <IconUsers
          class="text-white scale-[200%] rounded-full p-1"
          :class="{
            active: generalStore.actualView === APP_ROUTE_NAMES.FRIENDS,
          }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="generalStore.setActualView(APP_ROUTE_NAMES.TEAMS)"
      >
        <IconAffiliate
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: generalStore.actualView === APP_ROUTE_NAMES.TEAMS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="generalStore.setActualView(APP_ROUTE_NAMES.CALLS)"
      >
        <IconPhone
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: generalStore.actualView === APP_ROUTE_NAMES.CALLS }"
        />
      </button>
      <button class="w-full h-full flex items-center justify-center p-2">
        <Avatar
          :img="generalStore.userData?.profilePicture"
          buttonClass="w-10 h-10 p-1"
          @handleClick="generalStore.setActualView(APP_ROUTE_NAMES.PROFILE)"
          :class="{
            active: generalStore.actualView === APP_ROUTE_NAMES.PROFILE,
          }"
        />
      </button>
    </nav>
  </div>
  <template v-else>
    <Splash />
  </template>
</template>

<style lang="scss">
.active {
  color: #0dc96e;
  background-color: rgba(#363636, 15%);
}
</style>
