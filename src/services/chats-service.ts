import type { IMessage } from "./../types/index";
import useGeneralStore from "@/store/general-store";
import type { IChat } from "@/types";
import {
  collection,
  onSnapshot,
  query,
  where,
  type Unsubscribe,
  addDoc,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref } from "vue";
import { db } from "./firebase";
import { FIRESTORE_COLLECTION_NAMES, MESSAGE_TYPES } from "@/constants";
import { NOTIFICATION_TYPES } from "@/constants";
import { formatMessageByType } from "@/utils";

const useChatsService = () => {
  const generalStore = useGeneralStore();
  const chats = ref<IChat[]>([]);
  const unsubscribeChatsListener = ref<Unsubscribe | null>(null);

  const initChatsListener = () => {
    if (generalStore.userData) {
      const chatsQuery = query(
        collection(db, "chats"),
        where("members", "array-contains", generalStore.userData.authID)
      );

      unsubscribeChatsListener.value = onSnapshot(
        chatsQuery,
        { includeMetadataChanges: true },
        (chatsSnapshot) => {
          chatsSnapshot.docChanges().forEach((change) => {
            const { newIndex, oldIndex, doc, type } = change;
            const user = doc.data() as IChat;

            if (type === "added") {
              chats.value.splice(newIndex, 0, user);
            } else if (type === "modified") {
              chats.value.splice(oldIndex, 1);
              chats.value.splice(newIndex, 0, user);
            } else if (type === "removed") {
              chats.value.splice(oldIndex, 1);
            }
          });
        }
      );
    }
  };

  const sendMessage = async (
    fromAuthID: string,
    toAuthID: string,
    message: IMessage,
    isNewChat?: boolean
  ) => {
    if (generalStore.userData) {
      if (isNewChat) {
        await addDoc(collection(db, "chats"), {
          members: arrayUnion(fromAuthID, toAuthID),
          messages: arrayUnion(message),
        });
      }

      const fromRef = doc(
        db,
        FIRESTORE_COLLECTION_NAMES.USERS,
        generalStore.userData.authID
      );
      const fromDoc = await getDoc(fromRef);
      const fromData = fromDoc.data();

      if (fromData) {
        const notificationData = {
          type: NOTIFICATION_TYPES.TEXT_MESSAGE,
          isNotified: false,
          isReaded: false,
          icon: fromData.profilePicture ?? "",
          from: fromRef,
          message: formatMessageByType(
            message.type as MESSAGE_TYPES,
            message.content as string
          ),
          createdTime: new Date(),
          title: `Friend request`,
        };

        await addDoc(
          collection(
            db,
            FIRESTORE_COLLECTION_NAMES.USERS,
            toAuthID,
            FIRESTORE_COLLECTION_NAMES.NOTIFICATIONS
          ),
          notificationData
        );
      }
    }
  };

  return {
    chats,
    initChatsListener,
    sendMessage,
    unsubscribeChatsListener,
  };
};

export default useChatsService;
