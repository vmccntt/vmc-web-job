import { RouteComponentProps } from "react-router";
import { InforContact } from "./inforContact.model";

export interface IProps extends RouteComponentProps {}

export interface InforContactState {
  data: InforContact[];
  currentPage: number;
  detail?: InforContact;
  modal: {
    isOpenModal: boolean;
    item: InforContact | null;
    type: "addNew" | "update";
  };
}
