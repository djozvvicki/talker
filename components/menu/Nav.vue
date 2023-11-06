<script lang="ts" setup>
import {
  IconPhone,
  IconBell,
  IconMessages,
  IconUsersGroup,
  IconUser,
} from "@tabler/icons-vue";

const APP_NAVIGATION = {
  INDEX: "/app",
  USERS: "/app/users",
  CALLS: "/app/calls",
  NOTIFICATIONS: "/app/notifications",
  PROFILE: "/app/profile",
};

const activeClass = "text-[#39e26c] bg-[#121212]";
</script>

<template>
  <footer
    class="absolute bottom-0 z-[9999] flex h-16 w-full justify-around bg-dark p-2 md:h-full md:w-16 md:flex-col md:justify-start"
  >
    <NuxtLink
      class="flex h-full w-12 items-center justify-center rounded-full md:h-12"
      :class="[
        $route.path === APP_NAVIGATION.INDEX ? activeClass : 'text-light',
      ]"
      :to="APP_NAVIGATION.INDEX"
    >
      <IconMessages />
    </NuxtLink>
    <NuxtLink
      class="flex h-full w-12 items-center justify-center rounded-full md:h-12"
      :class="[
        $route.path === APP_NAVIGATION.USERS ? activeClass : 'text-light',
      ]"
      :to="APP_NAVIGATION.USERS"
    >
      <IconUsersGroup />
    </NuxtLink>
    <NuxtLink
      class="flex h-full w-12 items-center justify-center rounded-full md:h-12"
      :class="[
        $route.path === APP_NAVIGATION.CALLS ? activeClass : 'text-light',
      ]"
      :to="APP_NAVIGATION.CALLS"
    >
      <IconPhone />
    </NuxtLink>
    <NuxtLink
      class="flex h-full w-12 items-center justify-center rounded-full md:h-12"
      :class="[
        $route.path === APP_NAVIGATION.NOTIFICATIONS
          ? activeClass
          : 'text-light',
      ]"
      :to="APP_NAVIGATION.NOTIFICATIONS"
    >
      <IconBell />
    </NuxtLink>
    <NuxtLink
      class="flex h-full w-12 items-center justify-center rounded-full md:h-12"
      :class="[
        $route.path === APP_NAVIGATION.PROFILE ? activeClass : 'text-light',
      ]"
      :to="APP_NAVIGATION.PROFILE"
    >
      <IconUser />
    </NuxtLink>
  </footer>
</template>
