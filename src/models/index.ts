import { SORT_ENUM } from "../utils/enum";

export interface IResponseErrorHandle {
  error: string;
  message: string;
  statusCode: number;
}

export interface ISearchParam {
  [key: string]: string | number | undefined | boolean | null | Date;
  limit?: number;
  skip?: number;
  page?: number;
}

export interface IresponseFile {
  id: string;
  userId: number;
  name: string;
  fileName: string;
  mimeType: string;
  size: number;
  durationInSeconds: number;
  contentId: string;
  status: string;
  thumbnail: {
    ["default"]: string;
    options: string[];
  };
  url: { mp4: string };
  createdAt: string;
  updatedAt: string;
}

export interface IDataResponse<T> {
  0: T[];
  1: number;
}

export interface IColumnExport {
  key: string;
  label: string;
  render?: (param: any) => string | boolean | number | any;
}

export interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

export class Filters {
  page?: number = 1;
  sort?: string;
  order?: SORT_ENUM;
}