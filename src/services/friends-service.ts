import { useCurrentUser, useFirestore } from "vuefire";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import useLoggerService from "@services/logger-service";
import { ref } from "vue";

const { print } = useLoggerService();
const db = useFirestore();

export const useUser = () => {
  const user = ref<IUser | null>(null);
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    const userRef = doc(db, "users", currentUser.value.uid);
    onSnapshot(userRef, { includeMetadataChanges: true }, (snapshot) => {
      const userData = snapshot.data() as IUser;

      if (
        !user.value ||
        user.value.friends.length !== userData.friends.length
      ) {
        user.value = userData;
      }
    });
  }

  return user.value;
};

export const createFriendRequest = async (from: IUser, to: IUser) => {
  const requestData = {
    type: "FRIEND_REQUEST",
    isNotified: "no",
    isReaded: "no",
    fromAuthID: from.authID,
    fromProfilePicture: from.photoURL,
    message: `${from.name} want to be your friend`,
  };

  await addDoc(collection(db, "users", to.authID, "requests"), requestData);
};

export const declineUserRequest = async (requestID: string) => {
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    await updateDoc(
      doc(db, `users/${currentUser.value.uid}/requests/${requestID}`),
      {
        type: "FRIEND_REQUEST_DECLINED",
        message: `Friend request was declined.`,
      }
    );
    print("log", [`Request '${requestID}' was declined.`]);
  }
};

export const acceptUserRequest = async (
  requestID: string,
  requestFromAuthID: string
) => {
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    const userRef = doc(db, "users", currentUser.value.uid);
    const friendRef = doc(db, "users", requestFromAuthID);
    const userData = (await getDoc(userRef)).data();
    const friendData = (await getDoc(friendRef)).data();

    await updateDoc(userRef, {
      friends: arrayUnion(friendData),
    });
    await updateDoc(friendRef, {
      friends: arrayUnion(userData),
    });
    await updateDoc(
      doc(db, `users/${currentUser.value.uid}/requests/${requestID}`),
      {
        type: "FRIEND_REQUEST_ACCEPTED",
        message: `${friendData?.name} is your friend now!`,
      }
    );
    print("log", [`Request '${requestID}' was accepted.`]);
  }
};
