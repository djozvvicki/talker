import { useTokenService } from "~/services/token.service";
import { useUserService } from "~/services/user.service";

export default defineNuxtRouteMiddleware(async (to) => {
  logger.log("Auth middleware");
  const config = useRuntimeConfig();
  const { tokens, checkAccessTokenExpiry } = useTokenService();
  const { fetchUserData } = useUserService();

  if (!tokens.value?.refreshToken) return navigateTo("/login");
  if (to.path.match(/app/) && checkAccessTokenExpiry()) {
    logger.info("Refresh token expired.");
    return showError({
      statusCode: 401,
      statusMessage: "Sesja wygasła",
    });
  }

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
    }
  }
});
