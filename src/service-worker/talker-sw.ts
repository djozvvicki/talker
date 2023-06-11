/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import config from "@services/firebase/config";
import { getToken } from "firebase/messaging";

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ request }) => request.mode === "navigate",
  createHandlerBoundToURL("/index.html")
);

// Handle images:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "images",
  })
);

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === "script";
  },
  new CacheFirst({
    cacheName: "scripts",
  })
);

// Handle styles:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === "style";
  },
  new CacheFirst({
    cacheName: "styles",
  })
);

// Register routes
registerRoute(imageRoute);
registerRoute(scriptsRoute);
registerRoute(stylesRoute);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", async () => {
  await regenerateToken();
});

const bc = new BroadcastChannel("talker-sw");
const app = initializeApp(config);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, async (payload) => {
  if (payload.data && payload.data.isNotified === "no") {
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

    bc.postMessage({
      type: "SET_NOTIFIED_NOTIFICATION",
      requestID: payload.data.requestID,
    });

    console.log(payload);
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

self.addEventListener("notificationclick", (event) => {
  const { notification } = event;

  notification.close();

  print("groupCollapsed", ["Notification clicked!"]);
  print("log", [`Action -> ${event.action ?? "empty"}`]);
  print("groupEnd", []);
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
            if (!client.focused) client.focus();
            bc.postMessage({
              type: "CHANGE_VIEW",
              newPage: "app.notifications",
            });
            return;
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/?nextPage=app.notifications");
        }
      })
  );
});

const regenerateToken = async () => {
  const token = await getToken(messaging, {
    serviceWorkerRegistration: self.registration,
    vapidKey:
      "BOF-yJZi4d8yVCVRkD6lvrviRbMObr7fHl5ma2IyJzjDC4-Ecr9_FGJsDTloNVuETMQUqH7MVEoXfV3MkGg5yO4",
  });

  bc.postMessage({
    type: "TOKEN_REGENERATED",
    token,
  });

  print("groupCollapsed", ["Token succesfully regenerated!"]);
  print("log", [`Generated token -> ${token}`]);
  print("groupEnd", []);
};

const claimClients = () => {
  self.clients.claim();
  print("log", [`Client claimed!`]);
};

bc.onmessage = async (ev) => {
  switch (ev.data?.type) {
    case "CLAIM_CLIENTS":
      claimClients();
      break;
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
