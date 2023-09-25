import { RouteComponentProps } from "react-router";
import { IProductInterface } from "./product.model";

export interface IProps extends RouteComponentProps {}

export interface IProductState {
  data: IProductInterface[];
  detail: IProductInterface;
  currentPage: number;
  count: number;
  modal: {
    isOpenModal: boolean;
    item: IProductInterface | null;
    type: "addNew" | "update";
  };
}
