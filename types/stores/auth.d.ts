export interface IToken {
  access_token: string;
}

export interface IUser {
  id: number;
  displayName: string;
  userName: string;
  password: string;
  photoURL: string;
  age: number;
  createdAt: string;
}

export type IAuthStatus = "error" | "authenticated" | "waiting";
