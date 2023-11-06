import { useStorage } from "@vueuse/core";
import { ITokens, Nullable } from "~/types/global";
import { isAfter, parseISO } from "date-fns";

export const useTokenService = () => {
  const tokens = useStorage("TALKER_IDS", null, localStorage, {
    serializer: useSerializer<ITokens>(),
  });

  const setTokens = (newTokens: Nullable<ITokens>) =>
    (tokens.value = newTokens);
  const clearTokens = () => (tokens.value = null);
  const getAccessToken = () => tokens.value?.accessToken;
  const getRefreshToken = () => tokens.value?.refreshToken;
  const checkAccessTokenExpiry = () => {
    if (!tokens.value?.refreshToken) return true;
    const base64Url = tokens.value?.refreshToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const { exp } = JSON.parse(jsonPayload);
    const expired = Date.now() >= exp * 1000;
    return expired;
  };

  return {
    tokens,
    setTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
    checkAccessTokenExpiry,
  };
};
