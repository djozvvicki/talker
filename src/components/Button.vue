<script lang="ts" setup>
import type { Component } from "vue";

defineProps<{
  isLoading?: boolean;
  isLoadinClass?: string;
  label: string;
  leftIcon?: Component;
  rightIcon?: Component;
}>();

const emits = defineEmits(["handleClick"]);
</script>

<template>
  <button
    @click="(e) => emits('handleClick', e)"
    class="relative flex justify-center bg-black rounded-md mt-10 p-2 pl-4 pr-4 text-white"
    :class="{ loading: isLoading }"
  >
    <component :is="leftIcon" v-if="leftIcon" class="scale-[80%] mr-1" />
    {{ label }}
    <component :is="leftIcon" v-if="rightIcon" class="scale-[80%] ml-1" />
    <span
      v-if="isLoading"
      class="animate-spin border-r-transparent border-l-white border-b-white border-t-white border-2 absolute w-6 h-6 rounded-full"
    >
    </span>
  </button>
</template>

<style lang="scss" scoped>
.loading {
  background: lighten(#121212, 30%);
}
</style>
