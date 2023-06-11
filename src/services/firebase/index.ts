import { initializeApp } from "firebase/app";
import firebaseConfig from "@services/firebase/config";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, "europe-west1");
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;
