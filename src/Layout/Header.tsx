import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { signOutAction } from "../app/authSlice";
import { useAppSelector } from "../app/hooks";
import { ISider } from "./propsState";
import LogoVietTel from "../assets/img/logo/logo_viettel_manufacturing.png";

import "./styles.scss";

const { Header } = Layout;

// router menu
const HeaderComponent = (props: ISider) => {
  const dispatch = useDispatch();
  const _logout = () => {
    dispatch(signOutAction() as any);
  };
  const { userInfo } = useAppSelector((state) => state.auth);
  const mobileMode = useAppSelector((state) => state.common.isMobile);
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<ProfileFilled style={{ color: "darkcyan" }} />}>
        <NavLink to={`/user/profile/${userInfo?.id}`}>
          <span style={{ color: "darkcyan" }}>Trang cá nhân</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<LoginOutlined style={{ color: "red" }} />}
        onClick={_logout}
      >
        <span className="text-red-600">Đăng Xuất</span>
      </Menu.Item>
    </Menu>
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      className="header-app z-10"
      style={{
        padding: 0,
        background: !mobileMode ? "#ea0029" : "#cccccc",
        boxShadow: !mobileMode ? "#ffbf80 0px 1px 2px" : "none",
      }}
    >
      {
        !mobileMode ? (
          <>
            <div className="ml-6">
              {React.createElement(
                props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger text-xl",
                  style: { color: "#fff" },
                  onClick: () => props.changeCollapsed(true),
                }
              )}
            </div>
            <div>
              <h1 className="head-title-vmc">QUẢN LÝ TIẾN TRÌNH ĐỒNG BỘ</h1>
            </div>
            <div className="mr-8">
              <Dropdown overlay={menu} trigger={["click"]}>
                <div>
                  <Avatar src={userInfo.avatar}>
                    {userInfo.firstName
                      ? userInfo.firstName.charAt(0).toUpperCase()
                      : ""}
                  </Avatar>
                  <strong
                    className="fullname hover:text-red-500"
                    style={{
                      color: "#fff",
                    }}
                  >
                    {userInfo.lastName}
                  </strong>
                </div>
              </Dropdown>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-between w-100 text-center">
            <a href="/"><img key="logo" width={130} about="logo" src={LogoVietTel} className="p-2" style={{ margin: "auto" }} /></a>
            <Dropdown overlay={menu} trigger={["click"]}>
              <div>
                <strong
                  className="fullname hover:text-red-500"
                  style={{
                    color: "#000000",
                  }}
                >
                  <span style={{ textTransform: 'uppercase' }}>{userInfo.lastName}</span>
                </strong>
                <Avatar src={userInfo.avatar}>
                  {userInfo.firstName
                    ? userInfo.firstName.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
              </div>
            </Dropdown>
          </div>
        )
      }
    </Header>
  );
};

export default withRouter(HeaderComponent);
