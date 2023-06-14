<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import { APP_ROUTE_NAMES } from "@/constants";
import useGeneralStore from "@/store/general-store";
import { IconDoorExit } from "@tabler/icons-vue";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const generalStore = useGeneralStore();
const userData = generalStore.userData;

const handleSignOut = async () => {
  if (auth) {
    await auth.signOut();
    generalStore.setUserData(null);
    generalStore.setActualView(APP_ROUTE_NAMES.LOGIN);
  }
};
</script>
<template>
  <div
    v-if="userData"
    class="relative w-full h-[90%] justify-end pb-10 flex flex-col items-center rounded-b-[70px] p-3"
  >
    <Avatar :isBig="true" :img="userData.profilePicture" :alt="userData.name" />
    <h1 class="font-black text-2xl mt-2">
      {{ userData.name }}
    </h1>
    <p class="font-medium text-md text-[#12121270]">
      {{ userData.nick }}
    </p>
    <div class="flex w-full items-center justify-center gap-2">
      <Button class="mt-2" :label="`Znajomi (${userData.friends.length})`" />
      <Button
        class="mt-2"
        @click="handleSignOut"
        :leftIcon="IconDoorExit"
        label="Wyloguj się"
      />
    </div>
  </div>
</template>
