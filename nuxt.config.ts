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
  modules: ["@pinia/nuxt", "nuxt-socket-io"],
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
});
