import { RouteComponentProps } from "react-router";
import { BannerInterface } from "./banner.model";

export interface IProps extends RouteComponentProps {}

export interface IBannerState {
  data: BannerInterface[];
  currentPage: number;
  detail?: BannerInterface;
  modal: {
    isOpenModal: boolean;
    item: BannerInterface | null;
    type: "addNew" | "update";
  };
}
