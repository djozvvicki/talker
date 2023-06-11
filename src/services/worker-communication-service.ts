import useGeneralStore from "@store/general-store";
import useLoggerService from "@services/logger-service";
import { sendClientToken } from "@services/users-service";
import useNotificationsService from "@services/notifications-service";
import { APP_ROUTE_NAMES } from "@/constants";

const useWorkerCommunicationService = () => {
  const bc = new BroadcastChannel("talker-sw");
  const generalStore = useGeneralStore();
  const { setNotifiedNotification } = useNotificationsService();
  const { print } = useLoggerService();

  const handleSendToken = async (token: string) => {
    await sendClientToken(token);
  };

  const initSWMessageListener = () => {
    print("log", ["Initialize message listener!"]);

    bc.onmessage = async (ev) => {
      if (ev.data) {
        switch (ev.data.type) {
          case "TOKEN_REGENERATED":
            handleSendToken(ev.data.token as string);
            break;
          case "CHANGE_VIEW":
            generalStore.setActualView(
              ev.data.newPage as APP_ROUTE_NAMES.NOTIFICATIONS
            );
            break;
          case "SET_NOTIFIED_NOTIFICATION":
            await setNotifiedNotification(ev.data.requestID as string);
            break;
          default:
            console.log(ev);
        }
      }
    };
  };

  return {
    bc,
    initSWMessageListener,
  };
};

export default useWorkerCommunicationService;
