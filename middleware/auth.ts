import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (authStore.status === "waiting") {
    return navigateTo("/login");
  }
});
