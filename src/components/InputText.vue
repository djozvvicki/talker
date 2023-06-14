<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps([
  "modelValue",
  "containerClass",
  "icon",
  "name",
  "type",
  "placeholder",
  "inputClass",
  "error",
  "errorVisible",
]);
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
  <div class="input-group" :class="containerClass">
    <component :is="icon" class="absolute w-[3rem] text-[#12121290]" />
    <input
      :name="name"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      class="input-group__input"
      :class="inputClass"
    />
  </div>
  <span class="text-sm text-[red]" v-if="errorVisible">
    {{ error?.message }}
  </span>
</template>

<style lang="scss" scoped>
.input-group {
  display: flex;
  position: relative;
  align-items: center;
  width: 70%;
  border-bottom: 1px solid rgba(#121212, 60%);
  margin-top: 1rem;

  &__input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-left: 3rem;
    background-color: #fafffc;

    &::placeholder {
      color: lighten(#121212, 30%);
    }

    &:focus,
    &:hover,
    &:-webkit-autofill {
      background-color: #12121207;
      outline: none;
    }
  }
}

.success {
  svg {
    color: #0ce667;
  }

  input {
    background-color: darken(#fafffc, 10%);
    border-bottom: 1px solid #0ce667;
    color: #0ce667;
  }
}

.error {
  svg {
    color: red;
  }

  input {
    background-color: darken(#fffafb, 5%);
    border-bottom: 1px solid red;
    color: red;
  }
}
</style>
