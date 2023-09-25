import { RouteComponentProps } from "react-router";
import { PostHistoryInterface } from "./postHistory.model";

export interface IProps extends RouteComponentProps {}

export interface IPostHistoryState {
  data: PostHistoryInterface[];
  detail: PostHistoryInterface;
  currentPage: number;
  count: number;
  modal: {
    isOpenModal: boolean;
    item: PostHistoryInterface | null;
    type: "addNew" | "update";
  };
}
