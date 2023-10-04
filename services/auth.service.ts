import { ITokens, IUser } from "~/types/global";
import { useTokenService } from "./token.service";
import { ILoginUser, IRegisterUser } from "~/types/auth";

export const useAuthService = () => {
  const config = useRuntimeConfig();
  const { setTokens, clearTokens } = useTokenService();

  const login = async ({ userName, password }: ILoginUser): Promise<IUser> => {
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

    const loggedUser = await $fetch<IUser>(`${config.public.AUTH_USER_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return { ...loggedUser, accessToken, refreshToken };
  };

  const register = async ({ userName, password, email }: IRegisterUser) => {
    const { accessToken, refreshToken } = await $fetch<IUser>(
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

    const registeredUser = await $fetch<IUser>(
      `${config.public.AUTH_USER_URL}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return registeredUser;
  };

  const logout = () => {
    clearTokens();
  };

  return { login, register, logout };
};
