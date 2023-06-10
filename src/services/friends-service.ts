import { useFirestore } from "vuefire";
import { addDoc, collection } from "firebase/firestore";

export const createFriendRequest = async (from: IUser, to: IUser) => {
  const db = useFirestore();

  await addDoc(collection(db, "users", to.authID, "requests"), {
    id: `friend-request-${Date.now()}-${Math.random() * 10 ** 6}`,
    type: "FRIEND_REQUEST",
    from: {
      ...from,
    },
    message: `want to be your friend`,
  });
};
