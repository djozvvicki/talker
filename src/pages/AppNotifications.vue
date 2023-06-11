<script lang="ts" setup>
import Avatar from "@/components/Avatar.vue";
import { useRequests, setReadedRequests } from "@/services/users-service";
import { IconAlertTriangle } from "@tabler/icons-vue";
import { onMounted, ref, watchEffect } from "vue";
import { useCurrentUser } from "vuefire";
import useLoggerService from "@/services/logger-service";
import {
  acceptUserRequest,
  declineUserRequest,
} from "@/services/friends-service";

const { print } = useLoggerService();
const currentUser = useCurrentUser();
const requests = ref<IRequest[]>([]);
const clickedRequests = ref<{ clicked: boolean }[]>(
  requests.value.map(() => ({
    clicked: false,
  }))
);

const showNotificationDetails = (elementIndex: number) => {
  clickedRequests.value[elementIndex].clicked =
    !clickedRequests.value[elementIndex].clicked;
};

watchEffect(() => {
  requests.value = useRequests(false) as IRequest[];
});

watchEffect(() => {
  clickedRequests.value = requests.value.map(() => ({
    clicked: false,
  }));
});

const acceptRequest = async (requestID: string, requestFromAuthID: string) => {
  acceptUserRequest(requestID, requestFromAuthID);
  print("log", ["Accepted request:", requestID]);
};
const declineRequest = async (requestID: string) => {
  declineUserRequest(requestID);

  print("log", ["Declined request:", requestID]);
};

onMounted(async () => {
  if (currentUser.value) {
    await setReadedRequests(currentUser.value.uid);
  }
});
</script>

<template>
  <div class="relative w-full h-[90%] overflow-hidden rounded-b-[70px] p-3">
    <div class="h-full rounded-b-[70px]">
      <template v-if="requests.length > 0">
        <ul class="flex flex-col-reverse w-full h-full">
          <div class="overflow-scroll w-full h-full pb- mt-2">
            <li
              class="flex w-full p-2 items-center mb-1 rounded-full bg-[#12121207]"
              v-for="(request, index) in requests"
              :key="request.id"
              @click.stop="showNotificationDetails(index)"
            >
              <div class="flex w-full h-full">
                <template v-if="request.fromProfilePicture"></template>
                <template v-else>
                  <Avatar />
                </template>
                <div
                  class="ml-2 flex w-[calc(100%-3rem)] flex-col justify-center font-medium text-[#12121299] text-xl"
                >
                  <span class="m-0 text-[1rem] text-[#121212]">
                    {{ ` ${request.message}` }}
                  </span>
                  <Transition name="collapse">
                    <div
                      v-if="
                        request.type === 'FRIEND_REQUEST' &&
                        clickedRequests[index].clicked
                      "
                      class="flex justify-center m-0 p-0 text-sm"
                    >
                      <button
                        class="bg-[red] p-1 rounded-xl pl-3 pr-3 text-white mr-2"
                        @click="declineRequest(request.id)"
                      >
                        Decline
                      </button>
                      <button
                        class="bg-[#121212] p-1 rounded-xl pl-3 pr-3 text-white mr-2"
                        @click="acceptRequest(request.id, request.fromAuthID)"
                      >
                        Accept
                      </button>
                    </div>
                  </Transition>
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

<style lang="scss">
.collapse-enter-active,
.collapse-leave-active,
.animated {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
}
</style>
