import { useCurrentUser } from "vuefire";
import { db, messaging } from "@services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onMessage } from "firebase/messaging";

const useNotificationService = () => {
  const currentUser = useCurrentUser();

  const requestPermission = async () => {
    if (Notification.permission !== "granted") {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.log("Something wrong with notifications!");
        return false;
      }
    }

    return true;
  };

  const setNotifiedNotification = async (requestID: string) => {
    if (currentUser.value) {
      await updateDoc(
        doc(db, "users", currentUser.value.uid, "requests", requestID),
        {
          isNotified: "yes",
        }
      );
    }
  };

  const initNotificationListener = () => {
    console.log("Init notification listener");

    onMessage(messaging, async (payload) => {
      const reg = await navigator.serviceWorker.getRegistration();

      if (payload.data && reg) {
        console.log(payload.data);

        reg.showNotification(`${payload.data.message}`, {
          tag: payload.data.type,
          actions: [
            {
              action: "decline",
              title: "Decline",
            },
            {
              action: "accept",
              title: "Accept",
            },
          ],
        });

        await setNotifiedNotification(payload.data.requestID);
      }
    });
  };

  return {
    requestPermission,
    initNotificationListener,
    setNotifiedNotification,
  };
};

export default useNotificationService;
