<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import SearchInput from "@/components/SearchInput.vue";
import UsersModal from "@/components/modals/UsersModal.vue";
import useFriendsService from "@/services/friends-service";
import { IconPlus, IconUsers, IconAlertTriangle } from "@tabler/icons-vue";
import { onMounted, ref } from "vue";

const usersModalRef = ref();
const { friends, initFriendsListener } = useFriendsService();

const openUsersModal = () => {
  if (usersModalRef.value) {
    usersModalRef.value.openModal();
  }
};

onMounted(() => {
  initFriendsListener();
});
</script>

<template>
  <div class="relative w-full h-[90%] overflow-hidden rounded-b-[70px] p-3">
    <SearchInput />
    <div class="h-full rounded-b-[70px]">
      <div class="w-full flex items-center justify-between mt-4">
        <div class="flex">
          <IconUsers />
          <h2 class="text-md font-medium ml-2">Wszyscy znajomi</h2>
        </div>
        <span v-if="friends.length > 0" class="font-bold">{{
          friends.length
        }}</span>
      </div>
      <template v-if="friends.length > 0">
        <ul class="flex h-[calc(90%-1rem)]">
          <div class="overflow-scroll h-full w-full pb-5 mt-2">
            <li
              class="flex w-full mb-1 p-2 items-center justify-between rounded-full bg-[#12121207]"
              v-for="friend in friends"
              :key="friend.id"
            >
              <div class="flex items-center">
                <template v-if="friend.profilePicture"></template>
                <template v-else>
                  <Avatar buttonClass="w-10 h-10" />
                </template>
                <p
                  class="ml-2 flex flex-col font-medium text-[#12121299] text-xl"
                >
                  <span class="m-0 text-[#121212]">
                    {{ friend.name }}
                  </span>
                  <span class="m-0 p-0 text-sm">
                    {{ friend.nick }}
                  </span>
                </p>
              </div>
            </li>
          </div>
        </ul>
      </template>
      <template v-else>
        <div class="w-full h-full flex flex-col items-center justify-center">
          <div
            class="flex items-center justify-center rounded-full w-[100px] h-[100px] bg-[#12121206]"
          >
            <IconAlertTriangle class="text-[#121212] scale-[200%]" />
          </div>
          <div class="mb-32">
            <h3 class="text-[1.5rem] text-[#121212] text-center font-bold">
              Nie masz jeszcze ani jednego znajomego
            </h3>
            <p class="text-[#121212] text-center">
              Kliknij przycisk po prawej stronie, aby zaprosić znajomego
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="absolute bottom-6 right-6">
      <button
        class="flex items-center justify-center rounded-full w-[60px] h-[60px] bg-[#121212]"
        @click="openUsersModal"
      >
        <IconPlus class="text-white scale-[125%]" />
      </button>
    </div>
    <UsersModal ref="usersModalRef" />
  </div>
</template>
