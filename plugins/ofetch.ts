import { ofetch } from "ofetch";
import { useTokenService } from "~/services/token.service";
import { ITokens } from "~/types/global";

export default defineNuxtPlugin(() => {
  const { user, setUser, getAccessToken, getRefreshToken } = useTokenService();

  globalThis.$fetch = ofetch.create({
    onRequest({ options }) {
      const token = getAccessToken();

      options.timeout = 5000;
      options.headers = {
        ...options.headers,
        Accept: "application/json",
      };

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    },
    async onResponseError({ options, response }) {
      if (
        options.baseURL !== "http://localhost:7001/v1/auth/login" &&
        response
      ) {
        if (response.status === 401 && !options.retry) {
          options.retry = 1;

          const actualRefreshToken = getRefreshToken();

          if (user.value && actualRefreshToken) {
            try {
              const tokens = await $fetch<ITokens>(
                `http://localhost:7001/v1/auth/refresh`,
                {
                  headers: {
                    Authorization: actualRefreshToken,
                  },
                }
              );

              const { refreshToken, accessToken } = tokens;

              setUser({ ...user.value, refreshToken, accessToken });
            } catch (err) {
              console.log(err);
              showError({
                statusCode: response.status,
                statusMessage: response.statusText,
              });
            }
          }
        }
        console.log("[API Response]", response);
        showError({
          name: response._data.error ?? response.type,
          statusCode: response._data?.statusCode ?? response.status,
          statusMessage: response._data?.message ?? response.statusText,
        });
      }
    },
  });
});
