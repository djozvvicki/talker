<script lang="ts" setup>
import { API_STATUSES, APP_ROUTE_NAMES } from "@/constants";
import { useAuthErrorHandler } from "@/utils";
import Talker from "@assets/talker.svg";
import { IconLogin } from "@tabler/icons-vue";
import { IconLock } from "@tabler/icons-vue";
import { IconAt } from "@tabler/icons-vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const route = useRoute();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const isLoggingIn = ref<boolean>(false);
const error = ref<LoginError | null>(null);

const handleLogin = async () => {
  if (auth) {
    isLoggingIn.value = true;
    const [data, status] = await useAuthErrorHandler(
      async () =>
        await signInWithEmailAndPassword(auth, email.value, password.value)
    );
    isLoggingIn.value = false;

    if (status === API_STATUSES.SUCCESS) {
      router.push({ path: (route.query.redirect as string) ?? "/app" });
    } else {
      error.value = data;
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
    <div
      class="input-group"
      :class="{ error: error?.field === 'email' || error?.field === 'all' }"
    >
      <IconAt class="absolute w-[3rem] text-[#12121290]" />
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="input-group__input"
      />
    </div>
    <span class="text-sm text-[red]" v-if="error && error.field === 'email'">{{
      error?.message
    }}</span>
    <div
      class="input-group"
      :class="{ error: error?.field === 'password' || error?.field === 'all' }"
    >
      <IconLock class="absolute w-[3rem] text-[#12121290]" />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input-group__input"
      />
    </div>
    <span
      class="text-[0.7rem] w-[70%] text-justify mt-[0.3rem] text-[red]"
      v-if="
        error &&
        (error.field === 'password' ||
          error.field === 'all' ||
          error.field === 'none')
      "
      >{{ error?.message }}</span
    >
    <RouterLink
      :to="APP_ROUTE_NAMES.FORGOTTEN_PASSWORD"
      class="text-[0.7rem] text-left w-[70%] mt-2"
    >
      Forgotten password?
    </RouterLink>
    <button
      @click="handleLogin"
      class="relative flex justify-center bg-black rounded-md mt-10 p-2 pl-4 pr-4 text-white"
      :class="{ isLoggingIn }"
    >
      <IconLogin class="scale-[80%] mr-1" />
      Log in
      <span
        v-if="isLoggingIn"
        class="animate-spin border-r-transparent border-l-white border-b-white border-t-white border-2 absolute w-6 h-6 rounded-full"
      >
      </span>
    </button>
    <p class="absolute bottom-2 text-[#121212]">
      Don't have account yet?
      <RouterLink
        class="text-[#19804F] font-bold"
        :to="{ name: APP_ROUTE_NAMES.REGISTER }"
      >
        Sign up
      </RouterLink>
    </p>
  </div>
</template>

<style lang="scss">
.input-group {
  display: flex;
  position: relative;
  align-items: center;
  width: 70%;
  border-bottom: 1px solid rgba(#121212, 60%);
  margin-top: 1rem;

  &__input {
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-left: 3rem;
    background-color: #fafffc;

    &::placeholder {
      color: lighten(#121212, 30%);
    }

    &:focus,
    &:hover,
    &:-webkit-autofill {
      background-color: darken(#fafffc, 1%);
      outline: none;
    }
  }
}

.isLoggingIn {
  background: lighten(#121212, 30%);
}

.success {
  svg {
    color: #0ce667;
  }

  input {
    background-color: darken(#fafffc, 10%);
    border-bottom: 1px solid #0ce667;
    color: #0ce667;
  }
}

.error {
  svg {
    color: red;
  }

  input {
    background-color: darken(#fffafb, 5%);
    border-bottom: 1px solid red;
    color: red;
  }
}
</style>
