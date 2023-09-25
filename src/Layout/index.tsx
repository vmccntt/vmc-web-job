import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import SiderBarComponent from "./Sider";
import "./styles.scss";
import { useDispatch } from 'react-redux';
import { setMobileModeAction } from "../app/commonSlice";
import { useAppSelector } from "../app/hooks";
import { divide } from "lodash";
interface IProps {
  children: any;
}

const LayoutComponent = (props: IProps) => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    setState({
      ...state,
      collapsed: !state.collapsed,
    });
  };
  const mobileMode = useAppSelector((state) => state.common.isMobile);
  const { Content } = Layout;
  const dispatch = useDispatch();
  useEffect(() => {
    const isMobile = window.innerWidth <= 1024;
    dispatch(setMobileModeAction(isMobile));
  }, [window.innerWidth]);

  return (
    <>
      {!mobileMode ?
        <Layout id="layout" className="flex" style={{ background: "#f9fafb" }}>
          <SiderBarComponent collapsed={state.collapsed} changeCollapsed={toggle} />
          <Layout className="site-layout">
            <HeaderComponent collapsed={state.collapsed} changeCollapsed={toggle} />
            <Content className="site-layout-background content-layout m-0 h-10 overflow-auto scrollbar">
              {props.children}
            </Content>
            {/* <FooterComponent /> */}
          </Layout>
        </Layout> : (
          <div>
            <Layout id="layout" className="flex" style={{ background: "#f9fafb" }}>
              <Layout className="site-layout">
                <div className="header-custom-mobile">
                  <HeaderComponent collapsed={state.collapsed} changeCollapsed={toggle} />
                </div>
                <Content className="site-layout-background content-layout-mobile h-10 overflow-auto scrollbar">
                  {props.children}
                </Content>
                <FooterComponent />
              </Layout>
            </Layout>
          </div>
        )}
    </>
  );
};

export default LayoutComponent;
