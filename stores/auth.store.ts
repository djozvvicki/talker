import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IAuthStatus, IToken, IUser } from "~/types/stores/auth";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const token = useStorage("TALKER_ID", null as string | null);
  const status = useStorage("TALKER_STATUS", "waiting" as IAuthStatus);
  const isReady = ref<boolean>(false);
  const error = ref<any>();
  const userData = ref<IUser | null>(null);

  const isAuthenticated = computed(() => token.value && token.value.length > 0);

  const getUserData = async () => {
    isReady.value = false;
    userData.value = await $fetch<IUser>(config.public.AUTH_PROFILE_URL, {
      method: "GET",
    });
    status.value = "authenticated";
    isReady.value = true;
  };

  const signIn = async (userName: string, password: string) => {
    const { access_token } = await $fetch<IToken>(
      config.public.AUTH_LOGIN_URL,
      {
        method: "POST",
        body: {
          userName,
          password,
        },
      }
    );

    token.value = access_token;

    await getUserData();
    navigateTo("/");
  };

  const signOut = (newReady: boolean = false) => {
    userData.value = {} as IUser;
    token.value = null;
    status.value = "waiting";
    isReady.value = newReady;
    navigateTo("/login");
  };

  return {
    isReady,
    userData,
    token,
    error,
    isAuthenticated,
    status,
    signIn,
    signOut,
    getUserData,
  };
});
