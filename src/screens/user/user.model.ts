import { Moment } from "moment";

export interface IUser {
  id: number;
  name: string | undefined;
  username?: string | undefined;
  firstName?: string | undefined;
  role?: string | undefined;
  avatar?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface IUserAction {
  username?: string,
  email?: string,
  role?: string,
  password?: string,
  passwordConfirm?: string,
  firstName?: string,
  lastName?: string,
  avatar?: string,
  phoneNumber?: string,
  gender?: string,
  city?: string
}
export interface ISearchUser {
  name?: string | undefined;
  username?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  skip?: number;
  limit?: number;
}

export interface IRoleModuleModel {
  module?: string;
  permission?: IPermissionModuleModel;
}
export interface IPermissionModuleModel {
  list?: boolean;
  create?: boolean;
  update?: boolean;
  search?: boolean;
  delete?: boolean;
  isPublish?: boolean;
}

export interface IPermissionGroupResponseModel {
  statusCode: number,
  data: IRoleModuleModel[],
}
export interface IRoleGroupModel {
  label: string,
  value: string
}
export interface IRoleGroupResponseModel {
  statusCode: number,
  data: IRoleGroupModel[],
}

