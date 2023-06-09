type LoginError = {
  field: string;
  message: string;
  code: string;
};

type IRequestType = "FRIEND_REQUEST";

interface IRequest {
  id: string;
  isReaded?: boolean;
  isNotified?: boolean;
  type: IRequestType;
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
