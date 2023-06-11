import useLoggerService from "@services/logger-service";
import { useCurrentUser } from "vuefire";
import { db, messaging } from "@services/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { onMessage } from "firebase/messaging";
import { ref } from "vue";
import type { INotification } from "@/types";

const useNotificationService = () => {
  const currentUser = useCurrentUser();
  const { print } = useLoggerService();
  const notifications = ref<INotification[]>([]);

  const initNotificationListener = () => {
    if (currentUser.value) {
      const notificationsQuery = query(
        collection(db, "users", currentUser.value.uid, "notifications")
      );

      return onSnapshot(
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
    const notificationPromises: { (): Promise<void> }[] = [];

    notifications.value.forEach((notification) => {
      if (currentUser.value) {
        const notificationRef = doc(
          db,
          "users",
          currentUser.value.uid,
          "notifications",
          notification.id
        );

        notificationPromises.push(async () => {
          await updateDoc(notificationRef, {
            isReaded: true,
          });
        });
      }
    });

    await Promise.all(
      notificationPromises.map(
        async (notificationPromise) => await notificationPromise()
      )
    );
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

    onMessage(messaging, async (payload) => {
      const reg = await navigator.serviceWorker.getRegistration();

      if (payload.data && reg) {
        print("groupCollapsed", ["Message data"]);
        print("log", [payload.data]);
        print("groupEnd", []);

        reg.showNotification(
          `${payload.data.fromName} ${payload.data.message}`,
          {
            tag: payload.data.type,
            icon: "/talker.svg",
            image:
              payload.data.fromProfilePicture.length > 0
                ? payload.data.fromProfilePicture
                : "",
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
    });
  };

  return {
    notifications,
    requestPermission,
    initCloudMessageListener,
    initNotificationListener,
    setNotifiedNotification,
    setReadedNotifications,
  };
};

export default useNotificationService;
