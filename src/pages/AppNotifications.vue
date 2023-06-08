<script lang="ts" setup>
import { APP_ROUTE_NAMES } from "@/constants";
import { useRequests, setReadedRequests } from "@/services/users-service";
import { IconBell, IconAlertTriangle } from "@tabler/icons-vue";
import { IconUser } from "@tabler/icons-vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser } from "vuefire";

const router = useRouter();
const currentUser = useCurrentUser();
const requests = ref<IRequest[]>([]);

watchEffect(() => {
  requests.value = useRequests(false) as IRequest[];
});

onMounted(() => {
  router.push({ name: APP_ROUTE_NAMES.NOTIFICATIONS });
});

onMounted(async () => {
  if (currentUser.value) {
    await setReadedRequests(currentUser.value.uid);
  }
});
</script>

<template>
  <div class="relative w-full h-[90%] overflow-hidden rounded-b-[70px] p-3">
    <div class="h-[100%] rounded-b-[70px]">
      <div class="w-full flex items-center mt-4">
        <IconBell />
        <h2 class="text-md font-medium ml-2">Wszystkie powiadomienia</h2>
      </div>
      <template v-if="requests.length > 0">
        <ul class="flex flex-col w-full h-full">
          <div class="overflow-scroll w-full h-full pb-5 mt-2">
            <li
              class="flex w-full h-18 p-4 items-center mb-2 rounded-full bg-[#12121207]"
              v-for="request in requests"
              :key="request.id"
            >
              <div class="flex w-full h-full">
                <template v-if="request.from.photoURL"></template>
                <template v-else>
                  <div
                    class="rounded-full flex items-center justify-center border-2 border-[#121212] w-12 h-12"
                  >
                    <IconUser class="text-[#121212] scale-[110%]" />
                  </div>
                </template>
                <div
                  class="ml-2 flex w-[calc(100%-3rem)] flex-col font-medium text-[#12121299] text-xl"
                >
                  <span class="m-0 text-[1rem] text-[#121212]">
                    <b>{{ request.from.nick }}</b>
                    {{ ` ${request.message}` }}
                  </span>
                  <div
                    v-if="request.type === 'FRIEND_REQUEST'"
                    class="flex justify-end m-0 p-0 text-sm"
                  >
                    <button
                      class="bg-[red] p-1 rounded-xl pl-3 pr-3 text-white mr-2"
                    >
                      Decline
                    </button>
                    <button
                      class="bg-[#121212] p-1 rounded-xl pl-3 pr-3 text-white mr-2"
                    >
                      Accept
                    </button>
                  </div>
                </div>
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
              Nie masz jeszcze ani jednego powiadomienia
            </h3>
            <p class="text-[#121212] text-center">
              Wróć tu później, albo korzystaj dłużej z aplikacji!
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
