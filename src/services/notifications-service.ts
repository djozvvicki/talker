const useNotificationService = () => {
  const requestPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  const showNotification = async (title: string, body: NotificationOptions) => {
    const reg = await navigator.serviceWorker.ready;

    if (reg) {
      // reg.showNotification(title, body);
    }
  };

  return {
    requestPermission,
    showNotification,
  };
};

export default useNotificationService;
