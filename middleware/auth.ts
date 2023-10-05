import { useUserService } from "~/services/user.service";
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig();
  const { userData } = useAuthStore();
  const { getUserData } = useUserService();

  if (!userData?.loggedIn) return navigateTo("/login");

  try {
    const res = await getUserData();

    if (res) {
      userData.user = res;
    }
  } catch (err) {
    // Actually will be repeated only when token was refreshed (bug in $fetch)
    if (
      err?.statusCode === 401 &&
      err?.request === config.public.AUTH_USER_URL
    ) {
      const res = await getUserData();

      if (res) {
        userData.user = res;
      }
    } else {
      throw err;
    }
  }
});
