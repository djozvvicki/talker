import { setGlobalOptions } from "firebase-functions/v2/options";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

setGlobalOptions({
  region: "europe-west1",
});

interface IRequest {
  id: string;
  isReaded?: boolean;
  isNotified?: boolean;
  type: string;
  from: IUser;
  message: string;
}

interface IUser {
  id: string;
  authID: string;
  photoURL: string;
  nick: string;
  name: string;
  requests: IRequest[];
}

export const documentCreated = onDocumentWritten(
  "users/{userID}/requests/{requestID}",
  async (event) => {
    if (event) {
      try {
        // const { userID } = event.params;
        const {
          type,
          from: { name },
          message,
        } = event.data?.after.data() as IRequest;

        const id = await admin.messaging().send({
          token:
            "fsWCHp4v1vIm7jNaZ7S0c8:APA91bHoCLsJ3XfQw77DyxusMNVswRvvfYwzAa8stoPUcFdS6VYQBO3TsxTzqv9UKBt4W28N7aLJqVZ0Xf9M6ZqnSwZQvZArRKjc8NecTuu9rE4lkC9EJ2glAccCsVXTjO_4DTaiMEY_",
          data: {
            type,
            name,
            message,
          },
        });

        logger.log(`Sended message ID: ${id}`);
      } catch (err) {
        logger.error(err);
      }
    }
  }
);
