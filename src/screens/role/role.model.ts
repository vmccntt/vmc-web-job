
export interface IRoleModuleModel {
  module?: string;
  lable?: string;
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
  roles: IRoleModuleModel[]
}

export interface IRoleGroupResponseModel {
  statusCode: number,
  data: IRoleGroupModel[],
  count: number,
}

export interface IRoleGroupDetailResponseModel {
  statusCode: number,
  data: IRoleGroupModel,
}

