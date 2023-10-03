<template>
  <div class="flex flex-col w-full h-screen bg-black">
    <div
      class="flex flex-col items-center justify-center w-full h-[calc(100%_-_4rem)] bg-[#FAFFFC] rounded-b-[50px]"
    >
      <slot />
    </div>
    <MenuNav />
  </div>
</template>
