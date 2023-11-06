import { ofetch } from "ofetch";
import { useTokenService } from "~/services/token.service";
import { ITokens } from "~/types/global";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
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
        logger.log(request, "Access Token");
        options.headers = new Headers({
          ...options.headers,
          Authorization: `Bearer ${tokens.value.accessToken}`,
        });
      }

      if (
        options.headers.has("x-token-refresh") &&
        tokens.value?.refreshToken
      ) {
        logger.log(request, "Refresh Token");
        options.headers = new Headers({
          ...options.headers,
          Authorization: `Bearer ${tokens.value.refreshToken}`,
        });
      }
    },
    async onRequestError({}) {
      showError({
        statusCode: 400,
        statusMessage: "Problem z połączeniem.",
      });
      return;
    },
    async onResponseError({ options, response, error }) {
      options.headers = new Headers(options.headers);

      if (
        ![
          config.public.AUTH_LOGIN_URL,
          config.public.AUTH_REGISTER_URL,
          config.public.AUTH_LOGOUT_URL,
          config.public.AUTH_REFRESH_URL,
        ].includes(response.url) &&
        !options.headers.has("x-token-refresh")
      ) {
        try {
          const { accessToken, refreshToken } = await $fetch<ITokens>(
            `${config.public.AUTH_REFRESH_URL}`,
            {
              headers: {
                "x-token-refresh": "true",
              },
            },
          );

          setTokens({ accessToken, refreshToken });
          return;
        } catch (err) {
          logger.log(response, "[API Response]");

          showError({
            statusMessage: "Błąd połączenia",
            statusCode: response.status,
          });
          return;
        }
      }

      if (response.url === config.public.AUTH_REFRESH_URL) {
        tokens.value = null;
        showError({
          statusCode: 401,
          statusMessage: "Sesja wygasła",
        });
        return;
      }

      showError({
        statusCode: response.status ?? 400,
        statusMessage:
          response._data.message ??
          error?.message ??
          "Nieznany błąd. Zgłoś do administratora",
      });
    },
  });
});
