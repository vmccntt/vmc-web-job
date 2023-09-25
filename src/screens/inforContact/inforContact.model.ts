import { Moment } from "moment";
import { INFOR_TYPE_ENUM } from "../../utils/enum";


export interface InforContact {
  id?: number;
  title?: string;
  email?: string;
  isActive?: boolean;
  isDefault?: boolean;
  hotline?: string;
  language?: string;
  address?: string[];
  languages?: InforContact[];
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface InforContactAction {
  language?: string;
  title?: string;
  email?: string;
  isDefault?: boolean;
  isActive?: boolean;
  languages?: InforContact[];
  hotline?: string;
  address?: string[];
}
export interface ISearchInforContact {
  title?: string;
  hotline?: string;
  email?: string;
  address?: string;
}
