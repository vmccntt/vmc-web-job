import { RouteComponentProps } from "react-router";
import { PostInterface } from "../../models/post";

export interface IProps extends RouteComponentProps {}

export interface IPostState {
  data: PostInterface[];
  detail: PostInterface;
  currentPage: number;
  count: number;
  modal: {
    isOpenModal: boolean;
    item: PostInterface | null;
    type: "addNew" | "update";
  };
}
