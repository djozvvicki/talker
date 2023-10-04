import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    await authStore.getUserData();
  }

  authStore.isReady = true;
});
