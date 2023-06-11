<script lang="ts" setup>
import { IconX } from "@tabler/icons-vue";

defineEmits<{
  (e: "closeModal"): void;
}>();

const props = withDefaults(
  defineProps<{
    isBackgroundClosable?: boolean;
    showCloseButton?: boolean;
    showFooter?: boolean;
    isVisible: boolean;
  }>(),
  {
    isBackgroundClosable: true,
    showCloseButton: true,
    showFooter: true,
  }
);
</script>

<template>
  <Teleport to="#modals">
    <Transition name="fade-in">
      <div
        v-if="props.isVisible"
        class="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-end bg-[#12121250]"
        @click.self="isBackgroundClosable && $emit('closeModal')"
      >
        <div
          class="animated relative z-[999] rounded-2xl bg-[#FAFFFC] text-[#121212] w-full max-h-[60%] p-5 pt-3 pb-3"
        >
          <header
            class="flex h-[10%] w-full justify-between items-center mb-2 mt-2"
          >
            <h1 class="flex items-center w-[80%] font-bold text-2xl">
              <slot name="title" />
            </h1>
            <button
              v-if="props.showCloseButton"
              @click="$emit('closeModal')"
              class="w-10 h-10 close-button flex items-center justify-center"
            >
              <IconX class="scale-[125%]" />
            </button>
          </header>
          <main
            class="overflow-hidden"
            :class="{
              'h-[calc(75%-1rem)]': showFooter,
              'h-[calc(85%-1rem)]': !showFooter,
            }"
          >
            <slot name="content" />
          </main>
          <footer
            v-if="showFooter"
            class="flex items-center justify-end h-[15%]"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.close-button {
  border-radius: 9999px;

  &:focus,
  &:hover {
    background-color: rgba(#121212, 10%);
  }
}

.fade-in-enter-active,
.fade-in-leave-active,
.animated {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  position: absolute;
  opacity: 0;

  .animated {
    transform: translateY(20%);
  }
}
</style>
