import { APP_ROUTE_NAMES } from "@/constants";
import type { IUser } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useGeneralStore = defineStore("generalStore", () => {
  const actualView = ref<APP_ROUTE_NAMES>(APP_ROUTE_NAMES.INDEX);
  const userData = ref<IUser | null>(null);
  const router = useRouter();

  const setActualView = (newView: APP_ROUTE_NAMES) => {
    actualView.value = newView;
    router.push({ name: newView });
  };

  const setUserData = (data: IUser | null) => {
    userData.value = data;
  };

  return { actualView, userData, setActualView, setUserData };
});

export default useGeneralStore;
