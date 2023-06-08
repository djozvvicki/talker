<script lang="ts" setup>
import { APP_ROUTE_NAMES } from "@/constants";
import Talker from "@assets/talker.svg";
import { IconLogin } from "@tabler/icons-vue";
import { IconLock } from "@tabler/icons-vue";
import { IconAt } from "@tabler/icons-vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();
const route = useRoute();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
const repeatPassword = ref<string>("");
const isRegistering = ref<boolean>(false);

const handleRegister = async () => {
  if (auth && password.value === repeatPassword.value) {
    isRegistering.value = true;
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    router.push({ path: (route.query.redirect as string) ?? "/app" });
    isRegistering.value = false;
  }
};
</script>

<template>
  <div
    class="relative flex flex-col justify-center items-center w-full h-screen bg-[#FAFFFC]"
  >
    <img :src="Talker" alt="Talker - Chat app" width="152" />
    <h1 class="font-bold text-2xl text-center mb-10">
      Rozmawiaj, dziel się, śmiej i komunikuj skądkolwiek i z kimkolwiek chcesz
    </h1>
    <div class="input-group">
      <IconAt class="absolute w-[3rem] text-[#12121290]" />
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="input-group__input"
      />
    </div>
    <div class="input-group">
      <IconLock class="absolute w-[3rem] text-[#12121290]" />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input-group__input"
      />
    </div>
    <div class="input-group">
      <IconLock class="absolute w-[3rem] text-[#12121290]" />
      <input
        type="password"
        v-model="repeatPassword"
        placeholder="Repeat password"
        class="input-group__input"
      />
    </div>
    <button
      @click="handleRegister"
      class="relative flex justify-center bg-black rounded-md mt-10 p-2 pl-4 pr-4 text-white"
      :class="{ isRegistering }"
    >
      <IconLogin class="scale-[80%] mr-1" />
      Log in
      <span
        v-if="isRegistering"
        class="animate-spin border-r-transparent border-l-white border-b-white border-t-white border-2 absolute w-6 h-6 rounded-full"
      >
      </span>
    </button>
    <p class="absolute bottom-2 text-[#121212]">
      Have account already?
      <RouterLink
        class="text-[#19804F] font-bold"
        :to="{ name: APP_ROUTE_NAMES.LOGIN }"
      >
        Sign in
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

    &:focus,
    &:hover {
      background-color: darken(#fafffc, 6%);
      outline: none;
    }
  }
}

.isRegistering {
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
