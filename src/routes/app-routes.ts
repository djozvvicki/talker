import { APP_ROUTE_NAMES } from "@/constants";

export const appRoutes = [
  {
    name: APP_ROUTE_NAMES.SPLASH,
    path: "/",
    component: () => import("@components/SplashScreen.vue"),
  },
  {
    name: APP_ROUTE_NAMES.INDEX,
    path: "/app",

    component: () => import("@pages/Home.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: APP_ROUTE_NAMES.CHATS,
        path: "/app/chats",
        component: () => import("@pages/AppChats.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: APP_ROUTE_NAMES.CALLS,
        path: "/app/calls",
        component: () => import("@pages/AppCalls.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: APP_ROUTE_NAMES.TEAMS,
        path: "/app/teams",
        component: () => import("@pages/AppTeams.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: APP_ROUTE_NAMES.FRIENDS,
        path: "/app/friends",
        component: () => import("@pages/AppFriends.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: APP_ROUTE_NAMES.SETTINGS,
        path: "/app/settings",
        component: () => import("@pages/AppSettings.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        name: APP_ROUTE_NAMES.NOTIFICATIONS,
        path: "/app/notifications",
        component: () => import("@pages/AppNotifications.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    name: APP_ROUTE_NAMES.LOGIN,
    path: "/login",
    component: () => import("@pages/Login.vue"),
  },
  {
    name: APP_ROUTE_NAMES.REGISTER,
    path: "/register",
    component: () => import("@pages/Register.vue"),
  },
];
