import { IUserInfo, LoginForm } from "../models/user";
import configServices from "../utils/configServices";
export interface ILoginResponse {
  data: IUserInfo
  access_token: string,
  expiresIn: number,
  statusCode: number,
  tokenType: string,
} 
export const login = async (param: LoginForm) => {
  const response = await configServices.postService<ILoginResponse>(
    "auth/login",
    { ...param, isAdmin: true, deviceType: "WEB" },
    false,
    false
  );
  return response;
};

export const logOut = async () => {
  const response = await configServices.postService<any>(
    "auth/logout",
    null,
    false,
    false
  );
  return response;
};

export const getUserInfo = async (id: number) => {
  const response = await configServices.getService<IUserInfo>(
    `user/${id}`,
    null,
    null,
    true
  );
  return response;
};
