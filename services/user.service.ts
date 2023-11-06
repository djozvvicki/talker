import { useAuthStore } from "~/stores/auth.store";
import { IUser, Nullable } from "~/types/global";

export const useUserService = () => {
  const config = useRuntimeConfig();
  const { userData } = useAuthStore();

  const fetchUserData = async () => {
    const user: Nullable<IUser> = await $fetch(
      `${config.public.AUTH_USER_URL}`,
      {
        method: "GET",
      },
    );

    userData && (userData.user = user);
  };

  return {
    fetchUserData,
  };
};
