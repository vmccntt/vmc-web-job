import configServices from "../../../utils/configServices";
import { IRoleGroupResponseModel, IPermissionGroupResponseModel, IRoleGroupDetailResponseModel, IRoleGroupModel } from "../role.model";

export const createRole = async (body: IRoleGroupModel) => {
  const result = await configServices.postService<IRoleGroupDetailResponseModel>("role", {
    ...body,
  });
  return result;
};

export const deleteRole = async (id: number) => {
  const result = await configServices.deleteService<IRoleGroupDetailResponseModel>(
    `role/${id}`
  );
  return result;
};
export const getRoleDetail = async (id: number) => {
  const result = await configServices.getService<IRoleGroupDetailResponseModel>(
    `role/${id}`
  );
  return result;
};

export const updateRole = async (id: number, param: any) => {
  const result = await configServices.patchService<IRoleGroupDetailResponseModel>(
    `role/${id}`,
    { ...param }
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

export const getListRoleGroup = async (filter: any) => {
  const result = await configServices.getService<IRoleGroupResponseModel>(
    `role`,
    filter,
    null,
    true
  );
  return result;
};
