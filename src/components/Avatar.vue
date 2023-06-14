<script lang="ts" setup>
import { IconUser } from "@tabler/icons-vue";

const props = defineProps<{
  iconClass?: string;
  buttonClass?: string;
  img?: string;
  isBig?: boolean;
}>();

defineEmits<{
  (e: "handleClick", event: Event): void;
}>();
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center bg-[#121212] w-12 h-12"
    :class="[buttonClass, { 'w-24 h-24': isBig }]"
    @click="(e) => $emit('handleClick', e)"
  >
    <img
      v-if="props.img"
      class="w-full h-full rounded-full"
      :src="props.img"
      alt="Avatar picture"
    />
    <IconUser v-else class="text-white" :class="props.iconClass" />
  </div>
</template>
