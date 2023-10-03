<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Calls",
});
</script>

<template>
  <div class="text-black w-full flex flex-col items-center">
    <h1 class="text-3xl text-center">CALLS</h1>
  </div>
</template>
