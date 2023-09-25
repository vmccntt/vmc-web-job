import { RouteComponentProps } from "react-router";
import { IRecruiment } from "./recruiment.model";

export interface IProps extends RouteComponentProps {}

export interface IRecruimentState {
  data: IRecruiment[];
  currentPage: number;
  detail?: IRecruiment;
  modal: {
    isOpenModal: boolean;
    item: IRecruiment | null;
    type: "addNew" | "update";
  };
}
