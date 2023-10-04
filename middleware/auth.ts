import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const { userData } = useAuthStore();

  if (!userData?.loggedIn) {
    return navigateTo("/login");
  }
});
