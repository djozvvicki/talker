<script lang="ts" setup>
import useFriendsService from "@/services/friends-service";
import Modal from "@components/modals/Modal.vue";
import SearchInput from "@components/SearchInput.vue";
import { IconUsers, IconArrowLeft } from "@tabler/icons-vue";
import { computed, onMounted, ref } from "vue";
import Avatar from "../Avatar.vue";
import { IUser } from "@/types";
import useUsersService from "@/services/users-service";

const isVisible = ref<boolean>(false);
const { usersList, initUsersListener } = useUsersService();
const { friends, createFriendRequest } = useFriendsService();

const openModal = () => {
  isVisible.value = true;
};

const handleCreateFriendRequest = async (selectedUser: IUser) => {
  await createFriendRequest(selectedUser);
};

const closeModal = () => {
  isVisible.value = false;
};

const sortedUsers = computed(() => {
  return usersList.value
    .sort((a, b) => (a.nick < b.nick ? 1 : -1))
    .filter((user) => {
      return !friends.value.find((friend) => friend.authID === user.authID);
    });
});

onMounted(() => {
  initUsersListener();
});
defineExpose({ openModal });
</script>
<template>
  <Modal
    :isVisible="isVisible"
    @closeModal="closeModal"
    :showCloseButton="false"
  >
    <template #title>
      <IconUsers class="scale-[150%] mr-4" />
      Dodaj znajomego
    </template>
    <template #content>
      <ul class="h-full" v-if="sortedUsers.length > 0">
        <div class="overflow-scroll h-full pb-3 mt-3">
          <li
            class="flex mb-2 p-2 items-center justify-between rounded-full bg-[#12121207]"
            v-for="user in sortedUsers"
            :key="user.id"
          >
            <div class="flex items-center">
              <template v-if="user.profilePicture"></template>
              <template v-else>
                <Avatar buttonClass="w-10 h-10" />
              </template>
              <p
                class="ml-2 flex flex-col font-medium text-[#12121299] text-xl"
              >
                <span class="m-0 text-[#121212]">
                  {{ user.name }}
                </span>
                <span class="m-0 p-0 text-sm">
                  {{ user.nick }}
                </span>
              </p>
            </div>
            <button
              class="bg-[#12121207] rounded-md p-1 pl-3 pr-3 mr-3 flex items-center justify-center"
              @click="handleCreateFriendRequest(user)"
            >
              Invite
            </button>
          </li>
        </div>
      </ul>
      <div class="w-full p-4 h-full flex items-center justify-center" v-else>
        <span
          class="animate-spin border-r-transparent border-l-[#121212] border-b-[#121212] border-t-[#121212] border-2 absolute w-6 h-6 rounded-full"
        ></span>
      </div>
    </template>

    <template #footer>
      <div class="w-full h-full flex items-center">
        <SearchInput class="w-[calc(100%-4rem)]" />
        <button
          class="rounded-full ml-2 w-12 h-12 flex items-center justify-center bg-[#12121207]"
          @click="closeModal"
        >
          <IconArrowLeft />
        </button>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss">
.add-button {
  border-radius: 9999px;
  background-color: rgba(#121212, 5%);

  &:focus,
  &:hover {
    background-color: rgba(#121212, 10%);
  }
}
</style>
