import { useFirestore } from "vuefire";
import { addDoc, collection } from "firebase/firestore";

export const createFriendRequest = async (from: IUser, to: IUser) => {
  const db = useFirestore();

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
