import { initializeApp } from "firebase/app";
import firebaseConfig from "@services/firebase/config";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getMessaging } from "firebase/messaging";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const functions = getFunctions(app, "europe-west1");
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;
