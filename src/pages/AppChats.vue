<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import SearchInput from "@/components/SearchInput.vue";
import ChatsModal from "@/components/modals/ChatsModal.vue";
import useChatsService from "@/services/chats-service";
import useFriendsService from "@/services/friends-service";
import { IconChecks } from "@tabler/icons-vue";
import {
  IconMessage,
  IconAlertTriangle,
  IconMessagePlus,
} from "@tabler/icons-vue";
import { computed, onMounted, ref } from "vue";
import { format } from "date-fns";
import { IChat } from "@/types";
import { formatMessageByType } from "@/utils";
import { MESSAGE_TYPES } from "@/constants";

const chatsModalRef = ref();
const chatName = ref<string>("");
const { friends, initFriendsListener } = useFriendsService();
const { chats, initChatsListener } = useChatsService();

const openChatsModal = () => {
  if (chatsModalRef.value) {
    chatsModalRef.value.openModal();
  }
};

const filteredChats = computed(() => {
  return chats.value.filter((chat) => {
    return friends.value.find((friend) => chat.members.includes(friend.authID));
  });
});

const getFriend = (chat: IChat) => {
  return friends.value.find(({ authID }) => chat.members.includes(authID));
};

onMounted(() => {
  initChatsListener();
  initFriendsListener();
});
</script>

<template>
  <div class="relative w-full h-[90%] rounded-b-[70px] p-3">
    <SearchInput v-model="chatName" />
    <div class="h-full rounded-b-[70px]">
      <div class="w-full flex items-center mt-4">
        <IconMessage />
        <h2 class="text-md font-medium ml-2">Wszystkie czaty</h2>
      </div>
      <template v-if="chats.length > 0">
        <ul
          class="h-[calc(90%-1rem)]"
          v-if="friends.length > 0 && chats.length > 0"
        >
          <div class="overflow-scroll h-full pb-3 mt-3">
            <li
              class="flex mb-2 p-2 items-center justify-between rounded-full bg-[#12121207]"
              v-for="chat in filteredChats"
              :key="chat.members[0]"
            >
              <div class="flex items-center">
                <template
                  v-if="
                    friends.find(({ authID }) => chat.members.includes(authID))
                      ?.profilePicture
                  "
                >
                  <Avatar
                    :img="getFriend(chat)?.profilePicture"
                    buttonClass="w-10 h-10"
                  />
                </template>
                <template v-else>
                  <Avatar buttonClass="w-10 h-10" />
                </template>
                <p
                  class="ml-2 flex flex-col font-medium text-[#12121299] text-xl"
                >
                  <span class="m-0 text-[#121212]">
                    {{ getFriend(chat)?.name }}
                  </span>
                  <span
                    class="m-0 p-0 text-sm"
                    :class="{
                      'font-bold text-black':
                        chat.messages[0].writtenBy ===
                          getFriend(chat)?.authID && !chat.messages[0].isReaded,
                    }"
                  >
                    {{
                      chat.messages[0].writtenBy === getFriend(chat)?.authID
                        ? ""
                        : "You:"
                    }}
                    {{
                      formatMessageByType(
                        chat.messages[0].type as MESSAGE_TYPES,
                        chat.messages[0].content as string
                      )
                    }}
                  </span>
                </p>
              </div>
              <div class="flex flex-col mr-2 items-end justify-center">
                <IconChecks
                  :class="{
                    'text-blue-500':
                      chat.messages[0].writtenBy === getFriend(chat)?.authID &&
                      !chat.messages[0].isReaded,
                  }"
                />
                {{ format(chat.messages[0].writtenAt.toDate(), "HH:mm") }}
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
          <div class="mb-32 flex flex-col items-center">
            <h3
              class="text-[1.5rem] w-[85%] text-[#121212] text-center font-bold"
            >
              Nie jesteś uczestnikiem ani jednej rozmowy
            </h3>
            <p class="text-[#121212] text-center w-[85%]">
              Wybierz znajomego przyciskiem na dole i napisz do niego lub
              poczekaj, aż ktoś napisze do Ciebie
            </p>
          </div>
        </div>
      </template>
    </div>

    <div class="absolute bottom-6 right-6">
      <button
        class="flex items-center justify-center rounded-full w-[60px] h-[60px] bg-[#121212]"
        @click="openChatsModal"
      >
        <IconMessagePlus class="text-white scale-[125%]" />
      </button>
    </div>
    <ChatsModal ref="chatsModalRef" />
  </div>
</template>
