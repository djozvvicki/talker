import { NuxtSocket } from "nuxt-socket-io";

const useSocketService = () => {
  const nuxtApp = useNuxtApp();
  const socket = ref<NuxtSocket | null>(null);

  const initSocket = () => {
    socket.value = nuxtApp.$nuxtSocket({});
  };

  const defineListener = <Input, Output>(
    eventName: string,
    data: Input | null,
    callback: (res: Output) => void
  ) => {
    socket.value?.emit(eventName, data, (res: Output) => {
      console.log("[WS Response]", res);
      callback(res);
    });
  };

  const clearSocket = () => {
    socket.value = null;
  };

  return { initSocket, clearSocket, defineListener };
};

export default useSocketService;
