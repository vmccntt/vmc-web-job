import { RouteComponentProps } from "react-router";
import { IContact } from "./contact.model";

export interface IProps extends RouteComponentProps {}

export interface IContactState {
  data: IContact[];
  currentPage: number;
  detail?: IContact;
  modal: {
    isOpenModal: boolean;
    item: IContact | null;
    type: "addNew" | "update";
  };
}
