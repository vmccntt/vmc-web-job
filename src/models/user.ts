interface IChildRef {
  createdAt: string;
  id: number;
  levelPath: number;
  mpath: string;
  parentUser?: IUserInfo;
}
export interface IUserInfo {
  email: string;
  avatar?: string;
  password?: string;
  passwordConfirm?: string;
  access_token?: string;
  userId?: number;
  username?: string;
  firstName: string;
  fullName: string;
  id: number;
  isActive: boolean;
  lastName: string;
  phoneNumber: string;
  roles?: string;
}

export type LoginForm = {
  username: string;
  password: string;
};
