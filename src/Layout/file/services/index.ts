import { AxiosRequestConfig } from "axios";
import configServices from "../../../utils/configServices";
import { FileTypeEnum } from "../../../utils/enum";
import { IFile, IFileAction } from "./file.model";
export const uploadFile = async (body: IFileAction) => {
  const data = new FormData();
  const type = body.type ? body.type as string : FileTypeEnum.DEFAULT as string;
  data.append("file", body.file, body.name);
  data.append("type", type);
  const config: AxiosRequestConfig = {
    url: `file-manager/upload`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await configServices.axonizeRequestService(config);
};

export const deleteFile = async (param: number) => {
  const result = await configServices.deleteService<IFile>(
    `file-manager/${param}`
  );
  return result;
};

export const updateFile = async (id: number, param: any) => {
  const result = await configServices.patchService<IFile>(
    `file-manager/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getFile = async (id: number) => {
  const result = await configServices.getService<IFile>(
    `file-manager/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getFilets = async (filter?: any) => {
  const result = await configServices.getService<IFile>(
    `file`,
    filter,
    null,
    true
  );
  return result;
};
