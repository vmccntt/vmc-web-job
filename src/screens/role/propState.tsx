import { RouteComponentProps } from "react-router";
import { IRoleGroupModel } from "./role.model";

export interface IProps extends RouteComponentProps {}

export interface IRoleState {
  data: IRoleGroupModel[];
  currentPage: number;
  count: number;
}
