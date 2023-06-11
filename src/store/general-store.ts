import { APP_ROUTE_NAMES } from "@/constants";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useGeneralStore = defineStore("generalStore", () => {
  const actualView = ref<APP_ROUTE_NAMES>(APP_ROUTE_NAMES.CHATS);
  const router = useRouter();

  const setActualView = (newView: APP_ROUTE_NAMES) => {
    actualView.value = newView;
    router.push({ name: newView });
  };

  return { actualView, setActualView };
});

export default useGeneralStore;
