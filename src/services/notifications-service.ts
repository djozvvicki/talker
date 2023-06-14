import useLoggerService from "@services/logger-service";
import { useCurrentUser } from "vuefire";
import { db, messaging } from "@services/firebase";
import {
  type Unsubscribe,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { onMessage } from "firebase/messaging";
import { ref } from "vue";
import type { INotification } from "@/types";

const useNotificationService = () => {
  const currentUser = useCurrentUser();
  const { print } = useLoggerService();
  const notifications = ref<INotification[]>([]);
  const unsubscribeNotificationsListener = ref<Unsubscribe | null>(null);
  const unsubscribeCloudMessagesListener = ref<Unsubscribe | null>(null);

  const initNotificationListener = () => {
    if (currentUser.value) {
      const notificationsQuery = query(
        collection(db, "users", currentUser.value.uid, "notifications"),
        orderBy("createdTime", "desc")
      );

      unsubscribeNotificationsListener.value = onSnapshot(
        notificationsQuery,
        { includeMetadataChanges: true },
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            const notification = {
              ...doc.data(),
              id: doc.id,
            } as INotification;

            if (type === "added") {
              notifications.value.splice(newIndex, 0, notification);
            } else if (type === "modified") {
              notifications.value.splice(oldIndex, 1);
              notifications.value.splice(newIndex, 0, notification);
            } else if (type === "removed") {
              notifications.value.splice(oldIndex, 1);
            }
          });
        }
      );
    }
  };

  const setReadedNotifications = async () => {
    notifications.value.forEach(async (notification) => {
      if (currentUser.value && !notification.isReaded) {
        const notificationRef = doc(
          db,
          "users",
          currentUser.value.uid,
          "notifications",
          notification.id
        );

        await updateDoc(notificationRef, {
          isReaded: true,
        });
        print("log", [`Notification with ID: ${notification.id} was readed!`]);
      }
    });
  };

  const requestPermission = async () => {
    if (Notification.permission !== "granted") {
      try {
        await Notification.requestPermission();
      } catch (err) {
        return false;
      }
    }

    return true;
  };

  const setNotifiedNotification = async (notifyID: string) => {
    if (currentUser.value) {
      await updateDoc(
        doc(db, "users", currentUser.value.uid, "notifications", notifyID),
        {
          isNotified: true,
        }
      );
    }
  };

  const initCloudMessageListener = () => {
    print("log", ["Initialize notification listener!"]);

    unsubscribeCloudMessagesListener.value = onMessage(
      messaging,
      async (payload) => {
        const reg = await navigator.serviceWorker.getRegistration();

        if (payload.data && reg) {
          print("groupCollapsed", ["Message data"]);
          print("log", [payload.data]);
          print("groupEnd", []);

          reg.showNotification(
            `${payload.data.fromName} ${payload.data.message}`,
            {
              tag: payload.data.type,
              icon: payload.data.fromProfilePicture || "/talker.svg",
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
            }
          );

          await setNotifiedNotification(payload.data.requestID);
        }
      }
    );
  };

  return {
    notifications,
    requestPermission,
    unsubscribeCloudMessagesListener,
    initCloudMessageListener,
    unsubscribeNotificationsListener,
    initNotificationListener,
    setNotifiedNotification,
    setReadedNotifications,
  };
};

export default useNotificationService;
