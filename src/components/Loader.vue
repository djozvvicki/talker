<template>
  <div class="flex gap-2 absolute bottom-[25vh]">
    <span class="dot animate-bounce"></span>
    <span class="dot animate-bounce animation-delay-250"></span>
    <span class="dot animate-bounce animation-delay-500"></span>
  </div>
</template>

<style lang="scss">
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-40%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}

.animation-delay-250 {
  animation-delay: 250ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: #121212;
}
</style>
