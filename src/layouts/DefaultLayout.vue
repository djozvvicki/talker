<script lang="ts" setup>
import { APP_ROUTE_NAMES, NAVIGATION, NAVIGATION_EMITS } from "@/constants";
import { useRequests } from "@/services/users-service";
import { getFirstCapital } from "@/utils";
import {
  IconPhone,
  IconMessage,
  IconUsers,
  IconSettings,
  IconUser,
  IconBell,
  IconAffiliate,
} from "@tabler/icons-vue";
import { Ref, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const emits = defineEmits<{
  (
    e: NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW,
    actualView: NAVIGATION
  ): void | Promise<void>;
}>();

withDefaults(
  defineProps<{
    actualView?: NAVIGATION;
  }>(),
  {
    actualView: NAVIGATION.CHATS,
  }
);

const auth = useFirebaseAuth();
const router = useRouter();
const requests: Ref<IRequest[]> = ref([]);

watchEffect(() => {
  requests.value = useRequests(false, true) as IRequest[];
});

const handleGoToNofitications = async () => {
  emits(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.NOTIFICATIONS);
};

const handleSignOut = async () => {
  if (auth) {
    await auth.signOut();
    router.replace({ name: APP_ROUTE_NAMES.LOGIN });
  }
};
</script>

<template>
  <div id="default-layout" class="bg-black w-full h-screen">
    <div class="w-full h-[90%] bg-[#FAFFFC] rounded-b-[70px]">
      <header
        class="w-full h-[10%] flex items-center justify-between pr-4 pl-4"
      >
        <div class="flex items-center">
          <button
            class="rounded-full flex items-center justify-center border-2 border-[#121212] w-12 h-12"
            @click="handleSignOut"
          >
            <IconUser class="text-[#121212] scale-[110%]" />
          </button>
          <h1 class="font-extrabold text-3xl ml-2">
            {{ getFirstCapital(actualView) }}
          </h1>
        </div>
        <button
          v-if="$route.name !== APP_ROUTE_NAMES.NOTIFICATIONS"
          class="relative w-10 h-10 close-button flex items-center justify-center"
          @click="handleGoToNofitications"
        >
          <IconBell class="text-[#121212] scale-[200%] rounded-full p-1" />
          <span
            v-if="requests.some(({ isReaded }) => !isReaded)"
            class="w-2 h-2 absolute top-1 right-1 bg-[#ff0000] rounded-full"
          ></span>
        </button>
      </header>
      <slot name="content" />
    </div>
    <nav class="flex h-[10%]">
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="$emit(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.CHATS)"
      >
        <IconMessage
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: actualView === NAVIGATION.CHATS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="$emit(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.FRIENDS)"
      >
        <IconUsers
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: actualView === NAVIGATION.FRIENDS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="$emit(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.TEAMS)"
      >
        <IconAffiliate
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: actualView === NAVIGATION.TEAMS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="$emit(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.CALLS)"
      >
        <IconPhone
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: actualView === NAVIGATION.CALLS }"
        />
      </button>
      <button
        class="w-full h-full flex items-center justify-center p-2"
        @click="$emit(NAVIGATION_EMITS.CHANGE_ACTUAL_VIEW, NAVIGATION.SETTINGS)"
      >
        <IconSettings
          class="text-white scale-[200%] rounded-full p-1"
          :class="{ active: actualView === NAVIGATION.SETTINGS }"
        />
      </button>
    </nav>
  </div>
</template>

<style lang="scss">
.active {
  color: #05b661;
  background-color: rgba(#363636, 60%);
}
</style>
