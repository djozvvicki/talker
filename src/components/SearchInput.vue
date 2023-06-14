<script lang="ts" setup>
import { IconSearch } from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <div
    class="flex relative items-center rounded-full w-full h-14 bg-[#12121206]"
  >
    <IconSearch class="absolute w-16 text-[#121212]" />
    <input
      v-model="value"
      type="search"
      placeholder="Search..."
      class="w-full h-full text-xl bg-transparent rounded-full p-3 pl-14 placeholder:text-[#12121260]"
    />
  </div>
</template>
