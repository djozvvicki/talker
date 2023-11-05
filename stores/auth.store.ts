import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { IUser, Nullable } from "~/types/global";
import { useAuthService } from "~/services/auth.service";
import { ILoginUser } from "~/types/auth";

interface IUserWithStatus {
  user: Nullable<IUser>;
  loggedIn: boolean;
}

export const useAuthStore = defineStore("auth", () => {
  const authService = useAuthService();

  const userData = useStorage(
    "TALKER_USER",
    {
      user: null,
      loggedIn: false,
    } as IUserWithStatus,
    localStorage,
    {
      serializer: useSerializer<IUserWithStatus>(),
    },
  );

  const login = async (user: ILoginUser) => {
    try {
      await authService.login(user);

      if (userData.value) {
        userData.value.loggedIn = true;
        navigateTo("/app");
      }
    } catch (err) {
      if (userData.value) userData.value.loggedIn = false;
      throw err;
    }
  };

  const logout = () => {
    if (userData.value) {
      authService.logout();
      userData.value.user = null;
      userData.value.loggedIn = false;
      return navigateTo("/login");
    }
  };

  return { login, logout, userData };
});
