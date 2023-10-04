import { useStorage } from "@vueuse/core";
import { ITokens, Nullable } from "~/types/global";

export const useTokenService = () => {
  const tokens = useStorage("TALKER_IDS", null, localStorage, {
    serializer: useSerializer<ITokens>(),
  });

  const setTokens = (newUser: Nullable<ITokens>) => (tokens.value = newUser);
  const clearTokens = () => (tokens.value = null);
  const getAccessToken = () => tokens.value?.accessToken;
  const getRefreshToken = () => tokens.value?.refreshToken;

  return {
    tokens,
    setTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
  };
};
