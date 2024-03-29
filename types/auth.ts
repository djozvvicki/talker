export interface ILoginUser {
  userName: string;
  password: string;
}

export interface IRegisterUser extends ILoginUser {
  displayName: string;
}
