<script lang="ts" setup>
import Talker from "@assets/talker.svg";
import Loader from "@components/Loader.vue";
</script>

<template>
  <div
    class="relative flex w-full min-h-screen items-center flex-col justify-center bg-[#FAFFFC]"
  >
    <img :src="Talker" alt="Talker - Chat app" width="152" />
    <h1 class="font-black text-4xl mb-10 mt-4">Talker</h1>

    <Loader />

    <p class="text-sm absolute bottom-2">2023 &copy; Dominik Jóźwicki</p>
  </div>
</template>
