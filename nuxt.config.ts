// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Title",
      titleTemplate: "%s | Talker",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Commissioner:wght@100;200;300;400;500;600;700;800;900&display=swap",
          rel: "stylesheet",
          crossorigin: "",
        },
      ],
    },
  },
  ssr: false,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  plugins: ["~/plugins/ofetch.ts"],
  modules: ["@pinia/nuxt", "nuxt-socket-io", "@vite-pwa/nuxt"],
  io: {
    sockets: [
      {
        url: "http://localhost:7001",
        default: true,
      },
    ],
  },
  runtimeConfig: {
    public: {
      AUTH_LOGIN_URL: process.env.AUTH_LOGIN_URL,
      AUTH_USER_URL: process.env.AUTH_USER_URL,
      AUTH_REFRESH_URL: process.env.AUTH_REFRESH_URL,
      AUTH_REGISTER_URL: process.env.AUTH_REGISTER_URL,
      AUTH_LOGOUT_URL: process.env.AUTH_LOGOUT_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Talker - Chat App",
      short_name: "Talker",
      theme_color: "#DDDDDD",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
