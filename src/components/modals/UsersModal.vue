<script lang="ts" setup>
import { createFriendRequest } from "@/services/friends-service";
import Modal from "@components/modals/Modal.vue";
import SearchInput from "@components/SearchInput.vue";
import useUsers from "@services/users-service";
import { IconUsers, IconUser, IconPlus } from "@tabler/icons-vue";
import { ref, watchEffect } from "vue";
import { useCurrentUser } from "vuefire";

const isVisible = ref<boolean>(false);
const currentUser = useCurrentUser();

const users = ref(useUsers());

watchEffect(() => {
  users.value = useUsers();
});

const openModal = () => {
  isVisible.value = true;
};

const handleCreateFriendRequest = async (selectedUser: IUser) => {
  if (currentUser.value) {
    const actualUser = users.value.find(
      (user) => user.id === currentUser.value?.uid
    );

    if (actualUser) {
      await createFriendRequest(actualUser, selectedUser);
    }
  }
};

const closeModal = () => {
  isVisible.value = false;
};

defineExpose({ openModal });
</script>
<template>
  <Modal :isVisible="isVisible" :showFooter="false" @closeModal="closeModal">
    <template #title> Dodaj znajomego </template>
    <template #content>
      <SearchInput />

      <ul class="h-full" v-if="users.length > 0">
        <div class="flex justify-between items-center">
          <h3 class="flex mt-2">
            <IconUsers class="mr-2" />
            Proponowani
          </h3>
        </div>
        <div class="overflow-scroll h-full p-2 pb-5 mt-2">
          <li
            class="flex p-2 items-center mb-2 justify-between rounded-full bg-[#12121207]"
            v-for="user in users"
            :key="user.id"
          >
            <div class="flex">
              <template v-if="user.photoURL"></template>
              <template v-else>
                <div
                  class="rounded-full flex items-center justify-center border-2 border-[#121212] w-12 h-12"
                >
                  <IconUser class="text-[#121212] scale-[110%]" />
                </div>
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
              class="w-10 h-10 add-button flex items-center justify-center"
              @click="handleCreateFriendRequest(user)"
            >
              <IconPlus class="text-[#121212] scale-[125%]" />
            </button>
          </li>
        </div>
      </ul>
      <div class="w-full h-3/4 flex items-center justify-center" v-else>
        <span
          class="animate-spin border-r-transparent border-l-[#121212] border-b-[#121212] border-t-[#121212] border-2 absolute w-6 h-6 rounded-full"
        ></span>
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
