<script lang="ts" setup>
import { APP_ROUTE_NAMES } from "@/constants";
import DefaultLayout from "@layouts/DefaultLayout.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { query } = useRoute();
const router = useRouter();
const actualView = ref<APP_ROUTE_NAMES>(
  (query.nextPage as APP_ROUTE_NAMES) ?? APP_ROUTE_NAMES.CHATS
);

const changeActualView = (newView: APP_ROUTE_NAMES) => {
  actualView.value = newView;
  router.push({ name: newView });
};
</script>
<template>
  <DefaultLayout :actualView="actualView" @changeActualView="changeActualView">
    <template #content>
      <RouterView />
    </template>
  </DefaultLayout>
</template>
