import type {
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";

export interface IGeneralError {
  message: string;
  code: string;
}

export interface IFile {
  src: string;
}

export interface IEmojiFile extends IFile {
  shortcut: string;
}

export interface ICreateAccountError extends IGeneralError {
  field: string;
}

export type ICallTypes = "VIDEO" | "VOICE";
export type IMessageTypes = "VIDEO" | "TEXT" | "IMAGE" | "FILE" | "VOICE";
export type IConsoleMethod =
  | "log"
  | "groupCollapsed"
  | "warn"
  | "error"
  | "debug"
  | "groupEnd";

export interface INotification {
  id: string;
  isNotified: boolean;
  isReaded: boolean;
  title: string;
  icon: string;
  type: string;
  message: string;
}

export interface IMessageNotification extends INotification {
  content?: string;
}

export interface IFriendRequestNotification extends INotification {
  from: DocumentReference<IUser>;
}

export interface IChat {
  members: IUser[];
  messages: CollectionReference<IMessage>;
}

export interface ITeam {
  name: string;
  photo: string;
  createdBy: string;
  members: IUser[];
  messages: CollectionReference<IMessage>;
}

export interface ISettings {
  primary: string | IFile;
  background: string | IFile;
  bellDotColor: string;
  activeElementColor: string;
  otherCanDoScreenshots: string;
  customEmojis: IFile[];
}

export interface ICall {
  type: ICallTypes;
  from: IUser;
  to: IUser;
  startTime: Date;
  endTime: Date;
}

export interface IUser {
  id: string;
  authID: string;
  profilePicture: string;
  nick: string;
  name: string;
  friends: string[];
  notifications: CollectionReference<INotification>;
  chats: CollectionReference<IChat>;
  teams: CollectionReference<ITeam>;
  settings: CollectionReference<ISettings>;
  calls: CollectionReference<ICall>;
}

export interface IMessage {
  from: IUser;
  to: IUser;
  file?: string | IFile;
  image?: string | IFile;
  voice?: string | IFile;
  video?: string | IFile;
  content?: string;
  type: IMessageTypes;
}
