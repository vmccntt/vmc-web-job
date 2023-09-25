import { RouteComponentProps } from "react-router";
import { ICategory } from "./category.model";

export interface IProps extends RouteComponentProps {}

export interface ICategoryState {
  data: ICategory[];
  currentPage: number;
  count: number;
  detail?: ICategory;
  modal: {
    isOpenModal: boolean;
    item: ICategory | null;
    type: "addNew" | "update";
  };
}
