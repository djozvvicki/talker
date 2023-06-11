import { FIRESTORE_COLLECTION_NAMES } from "@/constants";
import { useCurrentUser } from "vuefire";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import useLoggerService from "@services/logger-service";
import { db } from "@services/firebase";
import type { IUser } from "@/types";
import { NOTIFICATION_TYPES } from "@/constants";
import { ref } from "vue";

export const useFriendsService = () => {
  const currentUser = useCurrentUser();
  const { print } = useLoggerService();
  const friends = ref<IUser[]>([]);

  const initFriendsListener = () => {
    if (currentUser.value) {
      const friendsQuery = query(
        collection(
          db,
          FIRESTORE_COLLECTION_NAMES.USERS,
          currentUser.value.uid,
          FIRESTORE_COLLECTION_NAMES.FRIENDS
        )
      );

      return onSnapshot(
        friendsQuery,
        { includeMetadataChanges: true },
        (friendsSnapshot) => {
          friendsSnapshot.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            const user = doc.data() as IUser;

            if (type === "added") {
              friends.value.splice(newIndex, 0, user);
            } else if (type === "modified") {
              friends.value.splice(oldIndex, 1);
              friends.value.splice(newIndex, 0, user);
            } else if (type === "removed") {
              friends.value.splice(oldIndex, 1);
            }
          });
        }
      );
    }
  };

  const createFriendRequest = async (to: IUser) => {
    try {
      if (currentUser.value) {
        const fromRef = doc(
          db,
          FIRESTORE_COLLECTION_NAMES.USERS,
          currentUser.value.uid
        );
        const fromDoc = await getDoc(fromRef);
        const fromData = fromDoc.data();

        if (fromData) {
          const notificationData = {
            type: NOTIFICATION_TYPES.FRIEND_REQUEST,
            isNotified: false,
            isReaded: false,
            icon: fromData.profilePicture ?? "",
            from: fromRef,
            message: `want to be your friend`,
            title: `Friend request`,
          };

          await addDoc(
            collection(
              db,
              FIRESTORE_COLLECTION_NAMES.USERS,
              to.authID,
              FIRESTORE_COLLECTION_NAMES.NOTIFICATIONS
            ),
            notificationData
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const declineFriendRequest = async (notifyID: string) => {
    const currentUser = useCurrentUser();

    if (currentUser.value) {
      await updateDoc(
        doc(
          db,
          `${FIRESTORE_COLLECTION_NAMES.USERS}/${currentUser.value.uid}/${FIRESTORE_COLLECTION_NAMES.NOTIFICATIONS}/${notifyID}`
        ),
        {
          type: NOTIFICATION_TYPES.DECLINED_FRIEND_REQUEST,
          message: `Friend request was declined.`,
        }
      );
      print("log", [`Request '${notifyID}' was declined.`]);
    }
  };

  const acceptFriendRequest = async (
    notifyID: string,
    friendRef: DocumentReference<IUser>
  ) => {
    try {
      const currentUser = useCurrentUser();

      if (currentUser.value) {
        const userRef = doc(
          db,
          `${FIRESTORE_COLLECTION_NAMES.USERS}`,
          currentUser.value.uid
        );
        const userData = (await getDoc(userRef)).data() as IUser;
        const friendData = (await getDoc(friendRef)).data() as IUser;

        await addDoc(
          collection(
            db,
            `${FIRESTORE_COLLECTION_NAMES.USERS}/${userData.authID}/friends`
          ),
          {
            ...friendData,
          }
        );
        await addDoc(
          collection(
            db,
            `${FIRESTORE_COLLECTION_NAMES.USERS}/${friendData.authID}/friends`
          ),
          {
            ...userData,
          }
        );
        await updateDoc(
          doc(
            db,
            `${FIRESTORE_COLLECTION_NAMES.USERS}/${currentUser.value.uid}/${FIRESTORE_COLLECTION_NAMES.NOTIFICATIONS}/${notifyID}`
          ),
          {
            type: NOTIFICATION_TYPES.ACCEPTED_FRIEND_REQUEST,
            message: `${friendData?.name} is your friend now!`,
          }
        );
        print("log", [`Request '${notifyID}' was accepted.`]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    friends,
    initFriendsListener,
    createFriendRequest,
    declineFriendRequest,
    acceptFriendRequest,
  };
};

export default useFriendsService;
