import { FirebaseError } from "firebase/app";
import {
  API_STATUSES,
  APP_ROUTE_NAMES,
  APP_ROUTE_TITLES,
  FIREBASE_AUTH_ERRORS,
} from "./constants";
export const getCapitalTitle = (appRouteName: APP_ROUTE_NAMES) => {
  const routeLabel = APP_ROUTE_TITLES[appRouteName];

  return routeLabel.charAt(0).toUpperCase() + routeLabel.slice(1);
};

export const useAuthErrorHandler = async (
  action: () => any
): Promise<[any, string]> => {
  let data: any;
  let status: string;
  try {
    data = await action();

    status = API_STATUSES.SUCCESS;
  } catch (err) {
    status = API_STATUSES.ERROR;
    if (err instanceof FirebaseError) {
      console.log(err.code);
      data = {
        field: getFieldFromErrorCode(err.code),
        code: err.code,
        message: FIREBASE_AUTH_ERRORS[err.code.replace("auth/", "")],
      };
    } else {
      data = {
        code: "unknown",
        message: "Unknown error",
      };
    }
  }

  return [data, status];
};

export const getFieldFromErrorCode = (errCode: string) => {
  let field = "";

  switch (errCode) {
    case "auth/invalid-email":
      field = "email";
      break;
    case "auth/missing-password":
      field = "password";
      break;
    case "auth/user-not-found":
      field = "all";
      break;
    case "auth/wrong-password":
      field = "password";
      break;
    case "auth/too-many-requests":
      field = "none";
      break;
  }

  return field;
};

export function initSW() {
  window.addEventListener("load", async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/talker-sw.js", {
        type: "classic",
      });
    }
  });
}
