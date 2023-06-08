import { FirebaseError } from "firebase/app";
import { API_STATUSES, FIREBASE_AUTH_ERRORS } from "./constants";
export const getFirstCapital = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
