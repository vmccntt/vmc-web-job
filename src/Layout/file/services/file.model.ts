import { FileTypeEnum } from "../../../utils/enum";

export interface IFileAction {
  file: any;
  minType?: string | undefined;
  name?: string | undefined;
  type?: FileTypeEnum;
}
export interface IFile {
  id: number;
  size: 0;
  mimeType: string;
  ext: string;
  type: FileTypeEnum;
  name: string;
  fileName: string;
  path: string;
  forder: string;
}
