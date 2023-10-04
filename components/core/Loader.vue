<script lang="ts" setup>
import logo from "~/assets/img/logo.png";
</script>

<template>
  <div
    class="absolute top-0 bg-transparent w-full h-full z-[9999] bg-white flex flex-col items-center justify-center"
  >
    <img
      :src="logo"
      alt="logo"
      class="w-1/2 sm:max-w-[250px] lg:max-w-[300px] md:w-1/4 mb-4 -mt-12"
    />
    <h1 class="text-5xl font-black text-black">Talker</h1>
    <div class="dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</template>

<style lang="scss">
.dots {
  margin-top: 4rem;
  display: flex;
  gap: 5px;

  .dot {
    animation: chatting 1s ease-in-out infinite;
    width: 15px;
    height: 15px;
    background: #000;
    border-radius: 9999px;
    animation-delay: 0.4s;
    transition: transform 0.2s ease-in-out;

    &:first-of-type {
      animation-delay: 0.2s;
    }

    &:last-of-type {
      animation-delay: 0.6s;
    }
  }
}

@keyframes chatting {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
