<script lang="ts" setup>
import SearchInput from "@/components/SearchInput.vue";
import UsersModal from "@/components/modals/UsersModal.vue";
import { APP_ROUTE_NAMES } from "@/constants";
import { IconPlus, IconUsers, IconAlertTriangle } from "@tabler/icons-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const friends = ref([]);
const usersModalRef = ref();

const openUsersModal = () => {
  if (usersModalRef.value) {
    usersModalRef.value.openModal();
  }
};

onMounted(() => {
  router.push({ name: APP_ROUTE_NAMES.FRIENDS });
});
</script>

<template>
  <div class="relative w-full h-[90%] rounded-b-[70px] p-3">
    <SearchInput />
    <div class="h-full rounded-b-[70px]">
      <div class="w-full flex items-center justify-between mt-4">
        <div class="flex">
          <IconUsers />
          <h2 class="text-md font-medium ml-2">Wszyscy znajomi</h2>
        </div>
        <span v-if="friends.length > 0" class="font-bold">0</span>
      </div>
      <template v-if="friends.length > 0"> Znajomi </template>
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
