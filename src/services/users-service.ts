import useGeneralStore from "@/store/general-store";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";

const useUsers = () => {
  const db = useFirestore();
  const usersList = useCollection(collection(db, "users"));

  const sortedUsersList = (usersList.value as IUser[]).sort((a, b) =>
    a.nick > b.nick ? 1 : -1
  );

  return sortedUsersList;
};

export const useRequests = (
  returnAsRef: boolean = true,
  showNotifications: boolean = false
) => {
  const db = useFirestore();
  const currentUser = useCurrentUser();
  const generalStore = useGeneralStore();
  const requests = ref([] as IRequest[]);

  if (currentUser.value) {
    const q = query(collection(db, "users", currentUser.value.uid, "requests"));

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        const request = doc.data() as IRequest;

        if (type === "added") {
          if (!request.isNotified && !request.isReaded && showNotifications) {
            navigator.serviceWorker.ready.then((reg) => {
              if (generalStore.notificationPermission !== "granted") {
                Notification.requestPermission().then((r) => {
                  if (r === "granted") {
                    generalStore.notificationPermission = "granted";
                  }
                });
              }

              if (generalStore.notificationPermission === "granted") {
                reg.showNotification(request.type, {
                  icon: "/talker.svg",
                  body: `${request.from.name} ${request.message}`,
                  data: {
                    requestID: request.id,
                    requestType: request.type,
                    requestFromID: request.from.authID,
                  },
                  actions: [
                    {
                      action: "decline",
                      title: "Decline",
                    },
                    {
                      action: "accept",
                      title: "Accept",
                    },
                  ],
                });
              }
            });
          }

          requests.value.splice(newIndex, 0, request);
        } else if (type === "modified") {
          requests.value.splice(oldIndex, 1);
          requests.value.splice(newIndex, 0, request);
        } else if (type === "removed") {
          requests.value.splice(oldIndex, 1);
        }
      });
    });
  }

  return returnAsRef ? requests : requests.value;
};

export const setReadedRequests = async (userAuthID: string) => {
  const db = useFirestore();
  const requestsCollection = await getDocs(
    collection(db, "users", userAuthID, "requests")
  );

  const requestPromises: { (): Promise<void> }[] = [];

  requestsCollection.forEach((request) => {
    requestPromises.push(async () => {
      await updateDoc(request.ref, {
        isReaded: true,
        isNotified: true,
      });
    });
  });

  await Promise.all(
    requestPromises.map(async (requestPromise) => await requestPromise())
  );
};

export default useUsers;
