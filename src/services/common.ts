import { IresponseFile } from '../models';
import configServices from '../utils/configServices';

export const uploadFile = async (file: any, type: string) => {
  const response = await configServices.postService(`files/upload/${type}`, file, true, true);
  return response;
};

export const uploadFileVideo = async (file: any) => {
  const response = await configServices.postServiceMedia<IresponseFile>(`api/v1/media/upload`, file, true, true);
  return response;
};

export const checkFileUpload = async (id: string) => {
  const response = await configServices.getServiceMedia<IresponseFile>(`api/v1/media/${id}`, null, null, true);
  return response;
};

export const uploadFileThumb = async (file: any, id: string) => {
  const response = await configServices.postServiceMedia<IresponseFile>(`api/v1/media/${id}/thumbnail`, file, true, true);
  return response;
};

export const selectFileVideo = async (file: any, id: string) => {
  const response = await configServices.postServiceMedia<IresponseFile>(`api/v1/media/${id}/thumbnail/select`, file, true, false);
  return response;
};

