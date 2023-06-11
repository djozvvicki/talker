<script lang="ts" setup>
import { IconUser } from "@tabler/icons-vue";

const props = defineProps<{
  iconClass?: string;
  buttonClass?: string;
}>();

defineEmits<{
  (e: "handleClick", event: Event): void;
}>();
</script>

<template>
  <button
    class="rounded-full flex items-center justify-center bg-[#121212] w-12 h-12"
    :class="buttonClass"
    @click="(e) => $emit('handleClick', e)"
  >
    <IconUser class="text-white" :class="props.iconClass" />
  </button>
</template>
