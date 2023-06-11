import "@styles/tailwind.css";
import "@styles/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import routes from "@routes/index";
import firebaseApp from "@services/firebase";
import { getCurrentUser } from "vuefire";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(App);

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        name: "app.login",
        query: {
          redirect: to.fullPath,
        },
      };
    }
  }
});

app
  .use(router)
  .use(pinia)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .mount("#app");

router.replace({
  name: "app.splash",
});
