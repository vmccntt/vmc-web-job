import { Moment } from "moment";
import { PartnerTypeEnum } from "../../utils/enum";
export interface IPartner {
  id?: number;
  name?: string,
  image?: string,
  type?: PartnerTypeEnum,
  description?: string
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface IPartnerAction {
  name?: string,
  image?: string,
  type?: PartnerTypeEnum,
  description?: string
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface ISearchUser {
  type?: PartnerTypeEnum;
  name?: string | undefined;
  description?: string | undefined;
}
