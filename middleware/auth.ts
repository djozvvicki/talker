import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  } else {
    if (!authStore.userData?.id) await authStore.getUserData();
  }
});
