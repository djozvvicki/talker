import { IUser, Nullable } from "~/types/global";

export const useUserService = () => {
  const config = useRuntimeConfig();

  const getUserData = async (): Promise<Nullable<IUser>> => {
    return await $fetch(`${config.public.AUTH_USER_URL}`, {
      method: "GET",
    });
  };

  return {
    getUserData,
  };
};
