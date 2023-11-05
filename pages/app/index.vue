<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Messages",
});
</script>

<template>
  <div class="flex w-full flex-col items-center text-white">
    <h1 class="text-center text-3xl">Messages</h1>
  </div>
</template>
