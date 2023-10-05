import { ofetch } from "ofetch";
import { useTokenService } from "~/services/token.service";
import { ITokens } from "~/types/global";

export default defineNuxtPlugin(() => {
  const { tokens, setTokens } = useTokenService();

  globalThis.$fetch = ofetch.create({
    onRequest({ options, request }) {
      options.timeout = 5000;
      options.headers = new Headers(options.headers);
      options.ignoreResponseError = options.headers.has("x-ignore-error");

      if (
        !options.headers.has("x-token-refresh") &&
        tokens.value?.accessToken
      ) {
        console.log("Using accessToken", request);
        options.headers = new Headers({
          ...options.headers,
          Authorization: `Bearer ${tokens.value.accessToken}`,
        });
      }

      if (
        options.headers.has("x-token-refresh") &&
        tokens.value?.refreshToken
      ) {
        console.log("Using refreshToken", request);
        options.headers = new Headers({
          ...options.headers,
          Authorization: `Bearer ${tokens.value.refreshToken}`,
        });
      }
    },
    async onResponseError({ options, response, request }) {
      const config = useRuntimeConfig();
      options.headers = new Headers(options.headers);

      if (
        ![
          config.public.AUTH_LOGIN_URL,
          config.public.AUTH_REFRESH_URL,
        ].includes(response.url) &&
        !options.headers.has("x-token-refresh")
      ) {
        try {
          const { accessToken, refreshToken } = await $fetch<ITokens>(
            "http://localhost:7001/v1/auth/refresh",
            {
              headers: {
                "x-token-refresh": "true",
              },
            }
          );

          setTokens({ accessToken, refreshToken });

          // return await $fetch(request); // Uncomment when ofetch will be updated
        } catch (err) {
          console.log("[API Response]", response);
        }
      }

      if (response.url === config.public.AUTH_REFRESH_URL) {
        tokens.value = null;
        showError({
          statusCode: 401,
          statusMessage: "Sesja wygasła",
        });
      }
    },
  });
});
