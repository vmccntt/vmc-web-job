import { RouteComponentProps } from "react-router";
import { IRoleGroupModel, IRoleModuleModel, IUser } from "./user.model";

export interface IProps extends RouteComponentProps {}

export interface IUserState {
  data: IUser[];
  currentPage: number;
  detail?: IUser;
  roleGroup?: IRoleGroupModel[];
  permission: IRoleModuleModel[];
  permissionObj: any,
  modal: {
    isOpenModal: boolean;
    item: IUser | null;
    type: "addNew" | "update";
  };
}
