<script lang="ts" setup>
import {
  IconPhone,
  IconBell,
  IconMessages,
  IconUsersGroup,
  IconUser,
} from "@tabler/icons-vue";

const APP_NAVIGATION = {
  INDEX: "/",
  USERS: "/users",
  CALLS: "/calls",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
};

const activeClass = "text-[#39e26c]";
</script>

<template>
  <footer class="w-full h-16 absolute bottom-0 bg-black flex">
    <NuxtLink
      class="w-full flex items-center justify-center"
      :class="[
        $route.path === APP_NAVIGATION.INDEX ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.INDEX"
    >
      <IconMessages />
    </NuxtLink>
    <NuxtLink
      class="w-full flex items-center justify-center"
      :class="[
        $route.path === APP_NAVIGATION.USERS ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.USERS"
    >
      <IconUsersGroup />
    </NuxtLink>
    <NuxtLink
      class="w-full flex items-center justify-center"
      :class="[
        $route.path === APP_NAVIGATION.CALLS ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.CALLS"
    >
      <IconPhone />
    </NuxtLink>
    <NuxtLink
      class="w-full flex items-center justify-center"
      :class="[
        $route.path === APP_NAVIGATION.NOTIFICATIONS
          ? activeClass
          : 'text-white',
      ]"
      :to="APP_NAVIGATION.NOTIFICATIONS"
    >
      <IconBell />
    </NuxtLink>
    <NuxtLink
      class="w-full flex items-center justify-center"
      :class="[
        $route.path === APP_NAVIGATION.PROFILE ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.PROFILE"
    >
      <IconUser />
    </NuxtLink>
  </footer>
</template>
