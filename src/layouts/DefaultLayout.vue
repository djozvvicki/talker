<script lang="ts" setup>
import { onMounted } from "vue";
import { useFirebaseAuth } from "vuefire";
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
  IconSettings,
  IconBell,
  IconAffiliate,
  IconBellFilled,
} from "@tabler/icons-vue";

const auth = useFirebaseAuth();
const generalStore = useGeneralStore();
const { notifications, initNotificationListener } = useNotificationService();
const { bc } = useWorkerCommunicationService();

const handleGoToNofitications = async () => {
  generalStore.setActualView(APP_ROUTE_NAMES.NOTIFICATIONS);
};

const handleSignOut = async () => {
  if (auth) {
    await auth.signOut();
    generalStore.setActualView(APP_ROUTE_NAMES.LOGIN);
  }
};

onMounted(() => {
  initNotificationListener();

  bc.postMessage({
    type: "CLAIM_CLIENTS",
  });
});
</script>

<template>
  <div id="default-layout" class="bg-black w-full h-screen">
    <div class="w-full h-[90%] bg-[#FAFFFC] rounded-b-[70px]">
      <header
        class="w-full h-[10%] flex items-center justify-between pr-4 pl-4"
      >
        <div class="flex items-center">
          <Avatar @handleClick="handleSignOut" />
          <h1 class="font-extrabold text-3xl ml-2">
            {{ getCapitalTitle(generalStore.actualView) }}
          </h1>
        </div>
        <button
          class="relative w-10 h-10 close-button flex items-center justify-center"
          @click="handleGoToNofitications"
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
            v-if="notifications.some(({ isReaded }) => isReaded !== false)"
            class="w-2 h-2 absolute top-1 right-1 bg-[#ff0000] rounded-full"
          ></span>
        </button>
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
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="generalStore.setActualView(APP_ROUTE_NAMES.SETTINGS)"
      >
        <IconSettings
          class="text-white scale-[200%] rounded-full p-1"
          :class="{
            active: generalStore.actualView === APP_ROUTE_NAMES.SETTINGS,
          }"
        />
      </button>
    </nav>
  </div>
</template>

<style lang="scss">
.active {
  color: #0dc96e;
  background-color: rgba(#363636, 15%);
}
</style>
