<script lang="ts" setup>
import SearchInput from "@/components/SearchInput.vue";
import {
  IconMessage,
  IconAlertTriangle,
  IconUsersPlus,
} from "@tabler/icons-vue";
import { ref } from "vue";

const teams = ref([]);
</script>

<template>
  <div class="relative w-full h-[90%] rounded-b-[70px] p-3">
    <SearchInput />
    <div class="h-full rounded-b-[70px]">
      <div class="w-full flex items-center mt-4">
        <IconMessage />
        <h2 class="text-md font-medium ml-2">Wszystkie zespoły</h2>
      </div>
      <template v-if="teams.length > 0"> Zespoły </template>
      <template v-else>
        <div class="w-full h-full flex flex-col items-center justify-center">
          <div
            class="flex items-center justify-center rounded-full w-[100px] h-[100px] bg-[#12121206]"
          >
            <IconAlertTriangle class="text-[#121212] scale-[200%]" />
          </div>
          <div class="mb-32">
            <h3 class="text-[1.5rem] text-[#121212] text-center font-bold">
              Nie należysz jeszcze do żadnego zespołu.
            </h3>
            <p class="text-[#121212] text-center">
              Poproś administratora istniejącego zespołu o dodanie Cię albo
              załóż własny zespół
            </p>
          </div>
        </div>
      </template>
    </div>
    <div class="absolute bottom-6 right-6">
      <button
        class="flex items-center justify-center rounded-full w-[60px] h-[60px] bg-[#121212]"
      >
        <IconUsersPlus class="text-white scale-[125%]" />
      </button>
    </div>
  </div>
</template>
