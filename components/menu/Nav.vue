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
    class="w-full h-16 absolute bottom-0 bg-black flex justify-around md:flex-col md:w-16 md:h-full md:justify-start p-2"
  >
    <NuxtLink
      class="w-12 flex items-center justify-center h-full md:h-12 rounded-full"
      :class="[
        $route.path === APP_NAVIGATION.INDEX ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.INDEX"
    >
      <IconMessages />
    </NuxtLink>
    <NuxtLink
      class="w-12 flex items-center justify-center h-full md:h-12 rounded-full"
      :class="[
        $route.path === APP_NAVIGATION.USERS ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.USERS"
    >
      <IconUsersGroup />
    </NuxtLink>
    <NuxtLink
      class="w-12 flex items-center justify-center h-full md:h-12 rounded-full"
      :class="[
        $route.path === APP_NAVIGATION.CALLS ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.CALLS"
    >
      <IconPhone />
    </NuxtLink>
    <NuxtLink
      class="w-12 flex items-center justify-center h-full md:h-12 rounded-full"
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
      class="w-12 flex items-center justify-center h-full md:h-12 rounded-full"
      :class="[
        $route.path === APP_NAVIGATION.PROFILE ? activeClass : 'text-white',
      ]"
      :to="APP_NAVIGATION.PROFILE"
    >
      <IconUser />
    </NuxtLink>
  </footer>
</template>
