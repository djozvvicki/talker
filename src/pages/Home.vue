<script lang="ts" setup>
import { APP_ROUTE_NAMES, NAVIGATION } from "@/constants";
import DefaultLayout from "@layouts/DefaultLayout.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { query } = useRoute();
const router = useRouter();
const actualView = ref<NAVIGATION>(NAVIGATION.CHATS);

const changeActualView = (newView: NAVIGATION) => {
  actualView.value = newView;
  router.push({ name: `app.${newView}` });
};

onMounted(() => {
  router.push({ name: query.previousPage as APP_ROUTE_NAMES });
});
</script>
<template>
  <DefaultLayout :actualView="actualView" @changeActualView="changeActualView">
    <template #content>
      <RouterView />
    </template>
  </DefaultLayout>
</template>
