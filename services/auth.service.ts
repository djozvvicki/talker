import { ITokens } from "~/types/global";
import { useTokenService } from "./token.service";
import { ILoginUser, IRegisterUser } from "~/types/auth";
import { useAuthStore } from "~/stores/auth.store";

export const useAuthService = () => {
  const config = useRuntimeConfig();
  const { clearUserData } = useAuthStore();
  const { setTokens, clearTokens } = useTokenService();

  const login = async ({ userName, password }: ILoginUser) => {
    const { accessToken, refreshToken } = await $fetch<ITokens>(
      `${config.public.AUTH_LOGIN_URL}`,
      {
        method: "POST",
        body: {
          userName,
          password,
        },
      },
    );

    setTokens({
      accessToken,
      refreshToken,
    });
  };

  const register = async ({
    userName,
    password,
    displayName,
  }: IRegisterUser) => {
    const { accessToken, refreshToken } = await $fetch<ITokens>(
      `${config.public.AUTH_REGISTER_URL}`,
      {
        method: "POST",
        body: {
          userName,
          password,
          displayName,
        },
      },
    );

    setTokens({ accessToken, refreshToken });
  };

  const logout = async () => {
    await $fetch(`${config.public.AUTH_LOGOUT_URL}`, {
      method: "GET",
    });

    clearTokens();
    clearUserData();
    navigateTo("/login");
  };

  return { login, register, logout };
};
