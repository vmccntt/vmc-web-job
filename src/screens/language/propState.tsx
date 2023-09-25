import { RouteComponentProps } from "react-router";
import { ILanguage } from "./language.model";

export interface IProps extends RouteComponentProps {}

export interface ILanguageState {
  data: ILanguage[];
  currentPage: number;
  detail?: ILanguage;
  modal: {
    isOpenModal: boolean;
    item: ILanguage | null;
    type: "addNew" | "update";
  };
}
