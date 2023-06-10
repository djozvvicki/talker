import { sendUserToken } from "@services/users-service";
import useNotificationsService from "@services/notifications-service";
import { APP_ROUTE_NAMES } from "@/constants";
import useViewsService from "./views-service";

const useWorkerCommunicationService = () => {
  const bc = new BroadcastChannel("talker-sw");
  const { handleNotificationClick } = useNotificationsService();
  const { handleViewChange } = useViewsService();

  const handleTokenDownload = async (token: string) => {
    await sendUserToken(token);
  };

  bc.onmessage = async (ev) => {
    if (ev.data) {
      switch (ev.data.type) {
        case "TOKEN_DOWNLOAD":
          handleTokenDownload(ev.data.token as string);
          break;
        case "NOTIFICATION_CLICKED":
          handleNotificationClick(ev.data.tag);
          break;
        case "CHANGE_VIEW":
          handleViewChange(ev.data.newPage as APP_ROUTE_NAMES.NOTIFICATIONS);
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
