import { ITokens, IUser } from "~/types/global";
import { useTokenService } from "./token.service";
import { ILoginUser, IRegisterUser } from "~/types/auth";
import { useAuthStore } from "~/stores/auth.store";

export const useAuthService = () => {
  const config = useRuntimeConfig();
  const { userData } = useAuthStore();
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
      }
    );

    setTokens({ accessToken, refreshToken });
  };

  const register = async ({ userName, password, email }: IRegisterUser) => {
    const { accessToken, refreshToken } = await $fetch<ITokens>(
      `${config.public.AUTH_REGISTER_URL}`,
      {
        method: "POST",
        body: {
          userName,
          password,
          email,
        },
      }
    );

    setTokens({ accessToken, refreshToken });
  };

  const logout = () => {
    clearTokens();
    if (userData) {
      userData.loggedIn = false;
      userData.user = null;
    }
  };

  return { login, register, logout };
};
