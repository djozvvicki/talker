/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import config from "@services/firebase/config";
import { getToken } from "firebase/messaging";

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.mode === "navigate",
  createHandlerBoundToURL("/index.html")
);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

const bc = new BroadcastChannel("talker-sw");
const app = initializeApp(config);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, async (payload) => {
  if (payload.data) {
    self.registration.showNotification(payload.data.type, {
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

// Logger
let inGroup = false;
const methodToColorMap = {
  debug: `#7f8c8d`,
  log: `#2ecc71`,
  warn: `#f39c12`,
  error: `#c0392b`,
  groupCollapsed: `#3498db`,
  groupEnd: null, // No colored prefix on groupEnd
};

type ConsoleMethod =
  | "log"
  | "groupCollapsed"
  | "warn"
  | "error"
  | "debug"
  | "groupEnd";

const print = function (method: ConsoleMethod, args: any) {
  if (method === "groupCollapsed") {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      console[method](...args);
      return;
    }
  }
  const styles = [
    `background: ${methodToColorMap[method]}`,
    `border-radius: 0.5em`,
    `color: white`,
    `font-weight: bold`,
    `padding: 2px 0.5em`,
  ];
  // When in a group, the workbox prefix is not displayed.
  const logPrefix = inGroup ? [] : ["%cTalker SW", styles.join(";")];
  console[method](...logPrefix, ...args);
  if (method === "groupCollapsed") {
    inGroup = true;
  }
  if (method === "groupEnd") {
    inGroup = false;
  }
};

// Talker SW
self.addEventListener("activate", async () => {
  print("log", ["Running..."]);

  const token = await getToken(messaging, {
    serviceWorkerRegistration: self.registration,
    vapidKey:
      "BOF-yJZi4d8yVCVRkD6lvrviRbMObr7fHl5ma2IyJzjDC4-Ecr9_FGJsDTloNVuETMQUqH7MVEoXfV3MkGg5yO4",
  });

  bc.postMessage({
    type: "TOKEN_DOWNLOAD",
    token,
  });
  print("log", [token]);
});

self.addEventListener("notificationclick", (event) => {
  const { notification } = event;

  notification.close();

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        console.log(clientList);

        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          if (client.url.includes("/app") && "focus" in client) {
            client.focus();
            client.navigate("/?nextPage=app.notifications");
            // bc.postMessage({
            //   type: "CHANGE_VIEW",
            //   newPage: "app.notifications",
            // });
          }
          return;
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/?nextPage=app.notifications");
        }
      })
  );
  print("groupCollapsed", ["Notification clicked!"]);
  print("log", [`Action -> ${event.action ?? "empty"}`]);
  print("groupEnd", []);

  bc.postMessage({
    type: "NOTIFICATION_CLICKED",
    tag: notification.tag,
    action: event.action,
  });
});

bc.onmessage = (ev) => {
  if (ev.data?.type === "INIT_COMMUNICATION") {
    print("log", ["Communication initialized"]);

    bc.postMessage({
      type: "Communication initialized",
    });
  }
};

self.addEventListener("message", (event) => {
  const eventData = event.data;

  if (eventData) {
    print("groupCollapsed", ["Message send!"]);
    print("log", [`Action -> ${eventData.type ?? "empty"}`, eventData]);
    print("groupEnd", []);
  }
});
