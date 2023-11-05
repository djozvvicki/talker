import { useUserService } from "~/services/user.service";
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  logger.log("Auth run.", "Talker Middlewares");
  const config = useRuntimeConfig();
  const { userData } = useAuthStore();
  const { fetchUserData } = useUserService();

  if (!userData?.loggedIn) return navigateTo("/login");

  if (!userData.user?.displayName) {
    try {
      await fetchUserData();
    } catch (error) {
      // Actually will be repeated only when token was refreshed (bug in $fetch)
      const err = error as { statusCode: number; request: string }; // For no ts errors

      if (
        err?.statusCode === 401 &&
        err?.request === config.public.AUTH_USER_URL
      ) {
        await fetchUserData();
      } else {
        throw err;
      }
    }
  }
});
