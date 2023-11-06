<script lang="ts" setup>
import bg from "~/assets/img/index-bg.png";
</script>

<template>
  <div class="flex h-screen w-full flex-col bg-dark">
    <div
      class="z-2 :bg-[#121212] relative flex h-[calc(100%_-_4rem)] w-full flex-col items-center justify-center overflow-hidden rounded-b-[50px] md:h-full"
    >
      <img
        class="absolute z-0 h-screen w-full scale-110 rounded-b-[50px] blur-[10px]"
        :src="bg"
        alt="Page background"
      />
      <div class="z-2 relative">
        <slot />
      </div>
    </div>
    <MenuNav />
  </div>
</template>
