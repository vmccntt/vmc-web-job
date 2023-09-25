import configServices from "../../../utils/configServices";
import { IUser, ISearchUser, IRoleGroupResponseModel, IPermissionGroupResponseModel } from "../user.model";

export const createUser = async (body: IUser) => {
  const result = await configServices.postService<IUser>("user", {
    ...body,
    isCreateContent: false,
  });
  return result;
};

export const deleteUser = async (param: number) => {
  const result = await configServices.deleteService<IUser>(
    `user/${param}`
  );
  return result;
};

export const updateUser = async (id: number, param: any) => {
  const result = await configServices.patchService<IUser>(
    `user/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getUser = async (id: number) => {
  const result = await configServices.getService<IUser>(
    `user/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getUsers = async (filter?: ISearchUser) => {
  const result = await configServices.getService<IUser>(
    `user`,
    filter,
    null,
    true
  );
  return result;
};
export const getRole = async () => {
  const result = await configServices.getService<IPermissionGroupResponseModel>(
    `user/role`,
    null,
    null,
    true
  );
  return result;
};

export const getRoleGroup = async () => {
  const result = await configServices.getService<IRoleGroupResponseModel>(
    `user/group`,
    null,
    null,
    true
  );
  return result;
};
