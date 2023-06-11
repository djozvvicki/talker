import { sendUserToken } from "@services/users-service";
import useNotificationsService from "@services/notifications-service";
import { APP_ROUTE_NAMES } from "@/constants";
import useViewsService from "./views-service";

const useWorkerCommunicationService = () => {
  const bc = new BroadcastChannel("talker-sw");
  const { handleViewChange } = useViewsService();
  const { setNotifiedNotification } = useNotificationsService();

  const handleTokenDownload = async (token: string) => {
    await sendUserToken(token);
  };

  bc.onmessage = async (ev) => {
    if (ev.data) {
      switch (ev.data.type) {
        case "TOKEN_REGENERATED":
          handleTokenDownload(ev.data.token as string);
          break;
          break;
        case "CHANGE_VIEW":
          handleViewChange(ev.data.newPage as APP_ROUTE_NAMES.NOTIFICATIONS);
          break;
        case "SET_NOTIFIED_NOTIFICATION":
          await setNotifiedNotification(ev.data.requestID as string);
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
