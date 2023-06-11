type LoginError = {
  field: string;
  message: string;
  code: string;
};

type IRequestType = "FRIEND_REQUEST";

interface IRequest {
  id: string;
  isReaded: string;
  isNotified: string;
  type: IRequestType;
  fromAuthID: string;
  fromProfilePicture: string;
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

declare const documentPictureInPicture = {
  requestWindow: ({}: {
    width?: number;
    height?: number;
  }): Promise<window> => {},
  window: window,
};
