<script lang="ts" setup>
useSeoMeta({
  title: "Talker - Chat App",
  ogTitle: "Talker - Chat App",
  description:
    " Connect with your friends yours unbreathly moments and memories by your own way.",
  ogDescription:
    "Connect with your friends yours unbreathly moments and memories by your own way.",
  ogImage: "https://talker.fun/logo.png",
});
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden">
    <NuxtLayout>
      <VitePwaManifest />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
