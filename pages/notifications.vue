<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Notifications",
});
</script>

<template>
  <div class="text-black w-full flex flex-col items-center">
    <h1 class="text-3xl text-center">NOTIFICATIONS</h1>
  </div>
</template>
