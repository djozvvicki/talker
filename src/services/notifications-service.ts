const useNotificationService = () => {
  const requestPermission = async () => {
    if (Notification.permission !== "granted") {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.log("Something wrong with notifications!");
        return false;
      }
    }

    return true;
  };

  const handleNotificationClick = (tag: string) => {
    if (tag === "FRIEND_REQUEST") {
    }
  };

  return {
    requestPermission,
    handleNotificationClick,
  };
};

export default useNotificationService;
