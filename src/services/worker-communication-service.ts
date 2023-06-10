import { sendUserToken } from "@services/users-service";

const useWorkerCommunicationService = () => {
  const bc = new BroadcastChannel("talker-sw");

  const handleTokenDownload = async (token: string) => {
    await sendUserToken(token);
  };

  bc.onmessage = async (ev) => {
    if (ev.data) {
      switch (ev.data.type) {
        case "TOKEN_DOWNLOAD":
          handleTokenDownload(ev.data.token as string);
          break;
        default:
          console.log(ev);
      }
    }
  };

  return {
    bc,
  };
};

export default useWorkerCommunicationService;
