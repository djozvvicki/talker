import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";
import { db } from "@services/firebase";
import { type User } from "firebase/auth";
import type { IUser } from "@/types";

const useUsersService = () => {
  const usersList = ref<IUser[]>([]);
  const usersListQuery = query(collection(db, "users"));

  const initUsersListener = () => {
    return onSnapshot(
      usersListQuery,
      { includeMetadataChanges: true },
      (usersListSnapshot) => {
        usersListSnapshot.docChanges().forEach((change) => {
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
      }
    );
  };

  const createUserDocument = async (createdUser: User) => {
    await setDoc(doc(db, "users", createdUser.uid), {
      authID: createdUser.uid,
      name: createdUser.email?.slice(0, createdUser.email.indexOf("@")),
      nick: `@${createdUser.email?.slice(0, createdUser.email.indexOf("@"))}`,
      profilePicture: "",
    });

    return await getActualUserData(createdUser.uid);
  };

  const getActualUserData = async (uid: string) => {
    return (await getDoc(doc(db, "users", uid))).data() as IUser;
  };

  return {
    usersList,
    initUsersListener,
    createUserDocument,
    getActualUserData,
  };
};

export const sendClientToken = async (token: string) => {
  const currentUser = useCurrentUser();

  if (currentUser.value) {
    const clientTokenRef = collection(
      db,
      "users",
      currentUser.value.uid,
      "clientTokens"
    );

    addDoc(clientTokenRef, {
      token,
    });
  }
};

export default useUsersService;
