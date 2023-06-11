/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import config from "@services/firebase/config";
import { getToken } from "firebase/messaging";
import useLoggerService from "@services/logger-service";

const { print } = useLoggerService();

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
  print("log", ["Background message received!"]);

  if (payload.data) {
    self.registration.showNotification(
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

    bc.postMessage({
      type: "SET_NOTIFIED_NOTIFICATION",
      requestID: payload.data.requestID,
    });

    print("groupCollapsed", ["BG message payload"]);
    print("log", [payload.data]);
    print("groupEnd", []);
  }
});

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
        print("groupCollapsed", ["Actual clients"]);
        print("log", [clientList]);
        print("groupEnd", []);
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
  print("log", [token]);
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
    print("groupCollapsed", ["Message received!"]);
    print("log", [eventData]);
    print("groupEnd", []);
  }
});
