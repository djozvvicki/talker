<script lang="ts" setup>
const props = defineProps<{
  placeholder: string;
  modelValue: string;
  type: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", val: string): any | Promise<any>;
}>();
</script>

<template>
  <div class="group">
    <div
      class="joo-coreinput-wrapper flex h-10 w-full rounded-lg bg-light p-2 outline-2 focus:outline-2 group-hover:border-none group-hover:outline group-hover:outline-offset-2 group-hover:outline-dark"
    >
      <slot name="icon" />
      <input
        class="joo-coreinput-input h-full w-full border-none bg-light placeholder-dark outline-none autofill:bg-light"
        :class="{ 'pl-2': true }"
        :type="type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="
          emits('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </div>
  </div>
</template>
