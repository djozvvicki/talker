import { ofetch } from "ofetch";
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      const authStore = useAuthStore();

      options.headers = {
        Accept: "application/json",
      };

      if (authStore.isAuthenticated) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`,
          Accept: "application/json",
        };
      } else {
        console.debug("Not authenticated");
      }

      options.timeout = 5000;
    },
    onRequestError({ request }) {
      const authStore = useAuthStore();

      if (request) authStore.status = "error";

      console.error(`[Request]`, request);
    },
    onResponseError({ response }) {
      const authStore = useAuthStore();

      if (!response.ok) {
        authStore.status = "error";
        showError({
          statusCode: response._data?.statusCode ?? response.status,
          statusMessage: response._data?.message ?? response.statusText,
        });
      }
    },
    retry: 0,
  });
});
