import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";
import { db } from "@services/firebase";
// import useNotificationService from "./notifications-service";

const useUsers = () => {
  const usersList = ref<IUser[]>([]);
  const q = query(collection(db, "users"));

  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const { newIndex, oldIndex, doc, type } = change;
      const user = doc.data() as IUser;

      if (type === "added") {
        usersList.value.splice(newIndex, 0, user);
      } else if (type === "modified") {
        usersList.value.splice(oldIndex, 1);
        usersList.value.splice(newIndex, 0, user);
      } else if (type === "removed") {
        usersList.value.splice(oldIndex, 1);
      }
    });
  });

  return usersList.value;
};

export const useRequests = (returnAsRef: boolean = true) => {
  const currentUser = useCurrentUser();
  const requests = ref([] as IRequest[]);

  if (currentUser.value) {
    const q = query(collection(db, "users", currentUser.value.uid, "requests"));

    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const { newIndex, oldIndex, doc, type } = change;
        const request = {
          ...doc.data(),
          id: doc.id,
        } as IRequest;

        if (type === "added") {
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
  const requestsCollection = await getDocs(
    collection(db, "users", userAuthID, "requests")
  );

  const requestPromises: { (): Promise<void> }[] = [];

  requestsCollection.forEach((request) => {
    requestPromises.push(async () => {
      await updateDoc(request.ref, {
        isReaded: "yes",
      });
    });
  });

  await Promise.all(
    requestPromises.map(async (requestPromise) => await requestPromise())
  );
};

export const sendUserToken = async (token: string) => {
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    const docRef = doc(db, "users", currentUser.value.uid);

    await updateDoc(docRef, {
      notificationToken: token,
    });
  }
};

export default useUsers;
