<script lang="ts" setup>
import useFriendsService from "@/services/friends-service";
import Modal from "@components/modals/Modal.vue";
import SearchInput from "@components/SearchInput.vue";
import {} from "@tabler/icons-vue";
import { computed, onMounted, ref } from "vue";
import Avatar from "../Avatar.vue";
// import type { IUser } from "@/types";
import useChatsService from "@/services/chats-service";
import { IconMessagePlus, IconArrowLeft } from "@tabler/icons-vue";

const chatName = ref<string>("");
const isVisible = ref<boolean>(false);
const { chats, initChatsListener } = useChatsService();
const { friends, initFriendsListener } = useFriendsService();

const openModal = () => {
  isVisible.value = true;
};

// const handleCreateFriendRequest = async (selectedUser: IUser) => {
//   await createFriendRequest(selectedUser);
// };

const closeModal = () => {
  isVisible.value = false;
};

const filteredFriends = computed(() => {
  return friends.value.filter((friend) => {
    return chats.value.find((chat) => !chat.members.includes(friend.authID));
  });
});

onMounted(() => {
  initChatsListener();
  initFriendsListener();
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
      <IconMessagePlus class="scale-[150%] mr-4" />
      Napisz do znajomego
    </template>
    <template #content>
      <ul class="h-full" v-if="filteredFriends.length > 0 && chats.length > 0">
        <div class="overflow-scroll h-full pb-3 mt-3">
          <li
            class="flex mb-2 p-2 items-center justify-between rounded-full bg-[#12121207]"
            v-for="friend in filteredFriends"
            :key="friend.id"
          >
            <div class="flex items-center">
              <template v-if="friend.profilePicture">
                <Avatar :img="friend.profilePicture" buttonClass="w-10 h-10" />
              </template>
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
            <button
              class="bg-[#12121207] rounded-md p-1 pl-3 pr-3 mr-3 flex items-center justify-center"
            >
              Write
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
        <SearchInput v-model="chatName" class="w-[calc(100%-4rem)]" />
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
