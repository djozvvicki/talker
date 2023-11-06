type Nullable<T> = T | null;
export interface IUser {
  displayName: string;
  userName: string;
  photoURL: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
