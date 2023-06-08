import { defineStore } from "pinia";
import { ref } from "vue";

const useGeneralStore = defineStore("generalStore", () => {
  const notificationPermission = ref<NotificationPermission>();

  const setNotificationPermission = (newPermission: NotificationPermission) => {
    notificationPermission.value = newPermission;
  };

  return { notificationPermission, setNotificationPermission };
});

export default useGeneralStore;
