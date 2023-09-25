import { Moment } from "moment";
import { INFOR_TYPE_ENUM, InforPurposeEnum } from "../../utils/enum";


export interface IContact {
  id: number;
  name: string;
  phone: string;
  purpose?: InforPurposeEnum;
  company?: string;
  email?: string;
  content: string;
  type?: INFOR_TYPE_ENUM;
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface IContactAction {
  name: string;
  phone: string;
  purpose?: InforPurposeEnum;
  company?: string;
  email?: string;
  content: string;
  type?: INFOR_TYPE_ENUM;
}
export interface ISearchContact {
  name?: string;
  phone?: string;
  content?: string;
  type?: INFOR_TYPE_ENUM;
}
