import * as antIc from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { useAppSelector } from "../app/hooks";
import LogoVietTel from "../assets/img/logo/logo_viettel_manufacturing.png";
import { getLanguagesAction } from "../screens/language/slice";
import { IUserState } from "../screens/user/propState";
import { getUserRoleAction } from "../screens/user/slice";
import { isCheckPermisson } from "../utils";
import { PERMISSION_ENUM } from "../utils/permisson.enum";
import { ISider } from "./propsState";
import "./styles.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;
type MenuItem = Required<MenuProps>["items"][number];
// router menu
const SiderBarComponent = (props: ISider) => {
  const dispatch = useDispatch();
  const [defaultOpenKeys] = useState([props.location.pathname || "/post"]);
  const [selectedkey, setSelectedKey] = useState([
    props.location.pathname || "/post",
  ]);

  const getRole = async () => {
    await dispatch(getUserRoleAction({}) as any);
    const language = localStorage.getItem("language");
    if (!language) {
      dispatch(getLanguagesAction({}) as any);
    }
  };
  useEffectOnce(() => {
    getRole();
  });
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;

  useEffect(() => {
    // let sKey = props.location.pathname;
    // let dOkey = "";
    // const sGroup = _.findLast(
    //   subs,
    //   (sub) => sub.pathname === props.location.pathname
    // );
    // if (sGroup) {
    //   sKey = sGroup.key;
    //   dOkey = sGroup.sub;
    // }
    // setDefaultOpenKeys(dOkey);
    // setSelectedKey(sKey);
  }, [props.location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey([e.key]);
  };

  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    permission?: PERMISSION_ENUM | PERMISSION_ENUM[],
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return isCheckPermisson(permissionObj, permission)
      ? ({
        key,
        icon,
        children,
        label,
        type,
      } as MenuItem)
      : null;
  }
  const items: MenuItem[] = [
    getItem(
      <NavLink to="/">
        <span>Trang chủ</span>
      </NavLink>,
      "dashboard",
      <antIc.DashboardOutlined style={{ color: "orange" }} />
    ),
    // getItem(
    //   <NavLink to="/customer">
    //     <span>Quản lý thông tin khách hàng</span>
    //   </NavLink>,
    //   "customerManagement",
    //   <antIc.ProfileFilled style={{ color: "darkcyan" }} />,
    //   // [PERMISSION_ENUM.USER_CREATE, PERMISSION_ENUM.USER_LIST],
    // ),
    // getItem(
    //   <NavLink to="/customer-care">
    //     <span>Chăm sóc khách hàng</span>
    //   </NavLink>,
    //   "customerCare",
    //   <antIc.PhoneOutlined style={{ color: "gray" }} />,
    //   // [PERMISSION_ENUM.USER_CREATE, PERMISSION_ENUM.USER_LIST],
    // ),
    // getItem(
    //   <NavLink to="/marketing">
    //     <span>Marketing</span>
    //   </NavLink>,
    //   "marketing",
    //   <antIc.ShoppingOutlined style={{ color: "deeppink" }} />,
    //   // [PERMISSION_ENUM.USER_CREATE, PERMISSION_ENUM.USER_LIST],
    // ),
    // getItem(
    //   <NavLink to="/task-management">
    //     <span>Quản lý công việc</span>
    //   </NavLink>,
    //   "taskManagement",
    //   <antIc.GoldOutlined style={{ color: "#ff4b2b" }} />,
    //   // [PERMISSION_ENUM.USER_CREATE, PERMISSION_ENUM.USER_LIST],
    // ),
    // getItem(
    //   <NavLink to="/report">
    //     <span>Báo cáo</span>
    //   </NavLink>,
    //   "report",
    //   <antIc.ProjectOutlined  style={{ color: "#ff4b2b" }} />,
    //   // [PERMISSION_ENUM.USER_CREATE, PERMISSION_ENUM.USER_LIST],
    // )
  ];

  return (
    <Sider
      className="h-screen overflow-auto scrollbar"
      theme="light"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      breakpoint="lg"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <div className="logo p-4">
        <img key="logo" about="logo" src={LogoVietTel} className="p-1" />
        {/* <Logo /> */}
      </div>
      <Menu
        theme="light"
        mode="inline"
        onClick={onClick}
        selectedKeys={selectedkey}
        defaultOpenKeys={defaultOpenKeys}
        className="mt-2"
        items={items}
      // className="position-fixed"
      />
    </Sider>
  );
};

export default withRouter(SiderBarComponent);
