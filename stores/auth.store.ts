import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IToken, IUser } from "~/types/stores/auth";
import { format } from "date-fns";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const token = useStorage("TALKER_ID", null as string | null);
  const isReady = ref<boolean>(false);
  const error = ref<any>();
  const userData = ref<IUser | null>(null);

  const isAuthenticated = computed(() => {
    return (token.value && token.value.length > 0) || false;
  });

  const getUserData = async () => {
    if (isAuthenticated) {
      isReady.value = false;
      if (!userData.value) {
        console.log("GETTING USER_DATA", format(new Date(), "hh:mm:ss"));
        userData.value = await $fetch<IUser>(config.public.AUTH_PROFILE_URL, {
          method: "GET",
        });
      }
      isReady.value = true;
    }
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
    userData.value = null;
    token.value = null;
    isReady.value = newReady;
    navigateTo("/login");
  };

  return {
    isReady,
    userData,
    token,
    error,
    isAuthenticated,
    signIn,
    signOut,
    getUserData,
  };
});
