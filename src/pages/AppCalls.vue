<script lang="ts" setup>
import SearchInput from "@/components/SearchInput.vue";
import {
  IconMessage,
  IconAlertTriangle,
  IconPhonePlus,
} from "@tabler/icons-vue";
import { ref } from "vue";

const chats = ref([]);
</script>

<template>
  <div class="relative w-full h-[90%] rounded-b-[70px] p-3">
    <SearchInput />
    <div class="h-full rounded-b-[70px]">
      <div class="w-full flex items-center mt-4">
        <IconMessage />
        <h2 class="text-md font-medium ml-2">Wszystkie czaty</h2>
      </div>
      <template v-if="chats.length > 0"> Chaty </template>
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
              Nie masz ani jednego połączenia!
            </h3>
            <p class="text-[#121212] text-center w-[85%]">
              Zadzwoń do znajomego klikając przycisk telefonu lub poczekaj, aż
              ktoś zadzwoni do Ciebie
            </p>
          </div>
        </div>
      </template>
    </div>

    <div ref="button" class="absolute bottom-6 right-6">
      <button
        class="flex items-center justify-center rounded-full w-[60px] h-[60px] bg-[#121212]"
      >
        <IconPhonePlus class="text-white scale-[125%]" />
      </button>
    </div>
  </div>
</template>
