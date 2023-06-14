<script lang="ts" setup>
import InputText from "@/components/InputText.vue";
import Button from "@/components/Button.vue";
import { API_STATUSES, APP_ROUTE_NAMES } from "@/constants";
import useUsersService from "@/services/users-service";
import useGeneralStore from "@/store/general-store";
import type { ICreateAccountError } from "@/types";
import { useAuthErrorHandler } from "@/utils";
import Talker from "@assets/talker.svg";
import { IconLogin, IconLock, IconAt } from "@tabler/icons-vue";
import { type UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const email = ref<string>("");
const password = ref<string>("");
const isLoggingIn = ref<boolean>(false);
const error = ref<ICreateAccountError | null>(null);
const generalStore = useGeneralStore();
const { getActualUserData } = useUsersService();

const handleLogin = async () => {
  if (auth) {
    isLoggingIn.value = true;
    const [data, status] = await useAuthErrorHandler<
      UserCredential | ICreateAccountError
    >(
      async () =>
        await signInWithEmailAndPassword(auth, email.value, password.value)
    );
    isLoggingIn.value = false;

    if (status === API_STATUSES.SUCCESS) {
      const userData = await getActualUserData(
        (data as UserCredential).user.uid
      );

      generalStore.setUserData(userData);
      generalStore.setActualView(APP_ROUTE_NAMES.CHATS);
    } else {
      error.value = data as ICreateAccountError;
    }
  }
};
</script>

<template>
  <div
    class="relative flex flex-col justify-center items-center w-full h-screen bg-[#FAFFFC]"
  >
    <img :src="Talker" alt="Talker - Chat app" width="152" />
    <h1 class="font-bold text-2xl text-center mb-6 mt-4">
      Rozmawiaj, dziel się, śmiej i komunikuj skądkolwiek i z kimkolwiek chcesz
    </h1>
    <InputText
      v-model="email"
      :icon="IconAt"
      :containerClass="{
        error: error?.field === 'email' || error?.field === 'all',
      }"
      :error="error"
      placeholder="Email"
      :errorVisible="
        error && (error.field === 'email' || error.field === 'all')
      "
    />
    <InputText
      v-model="password"
      :icon="IconLock"
      :containerClass="{
        error: error?.field === 'password' || error?.field === 'all',
      }"
      :error="error"
      placeholder="Hasło"
      :errorVisible="
        error &&
        (error.field === 'password' ||
          error.field === 'all' ||
          error.field === 'none')
      "
    />
    <RouterLink
      :to="APP_ROUTE_NAMES.FORGOTTEN_PASSWORD"
      class="text-[0.7rem] text-left w-[70%] mt-2"
    >
      Zapomniałeś hasła?
    </RouterLink>
    <Button
      @handleClick="handleLogin"
      :leftIcon="IconLogin"
      :isLoading="isLoggingIn"
      label="Zaloguj się"
    />
    <p class="absolute bottom-2 text-[#121212]">
      Nie masz jeszcze konta?
      <RouterLink
        class="text-[#19804F] font-bold"
        :to="{ name: APP_ROUTE_NAMES.REGISTER }"
      >
        Załóż je
      </RouterLink>
    </p>
  </div>
</template>
