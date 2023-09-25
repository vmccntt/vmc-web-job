import { RouteComponentProps } from "react-router";
import { IPartner } from "./partner.model";

export interface IProps extends RouteComponentProps {}

export interface IPartnerState {
  data: IPartner[];
  currentPage: number;
  detail?: IPartner;
  modal: {
    isOpenModal: boolean;
    item: IPartner | null;
    type: "addNew" | "update";
  };
}
