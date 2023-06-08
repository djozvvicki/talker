<script lang="ts" setup>
import { APP_ROUTE_NAMES } from "@/constants";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.push({ name: APP_ROUTE_NAMES.CALLS });
});
</script>

<template>APP_CHATS</template>
