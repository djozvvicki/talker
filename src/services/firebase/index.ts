import { initializeApp } from "firebase/app";
import firebaseConfig from "@services/firebase/config";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging, onMessage } from "firebase/messaging";

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "europe-west1");
export const db = getFirestore(app);
export const messaging = getMessaging(app);

onMessage(messaging, async (payload) => {
  const reg = await navigator.serviceWorker.ready;

  if (payload.data) {
    new Notification(payload.data.type, {
      tag: "FRIEND_REQUEST",
      body: `${payload.data.name} ${payload.data.message}`,
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

    reg.showNotification(payload.data.type, {
      tag: "FRIEND_REQUEST",
      body: `${payload.data.name} ${payload.data.message}`,
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
  }
});

export default app;
