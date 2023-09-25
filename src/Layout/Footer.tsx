import { Layout } from "antd";
import { TabBar } from 'antd-mobile';
import {
  HistogramOutline,
  LinkOutline,
  MoreOutline,
  PieOutline,
  TeamOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import { memo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./styles.scss";

const { Footer } = Layout;

const FooterComponent = () => {
  const tabs = [
    {
      key: '/',
      // title: '首页',
      icon: <HistogramOutline />,
    },
    {
      key: '/customer',
      // title: '首页',
      icon: <TeamOutline />,
    },
    {
      key: '/customer-care',
      // title: '待办',
      icon: <LinkOutline />,
    },
    {
      key: '/marketing',
      // title: '消息',
      icon: <PieOutline />,
    },
    {
      key: '/task-management',
      // title: '我的',
      icon: <UnorderedListOutline />,
    },
    {
      key: 'report',
      // title: '我的',
      icon: <MoreOutline />,
    },
  ]

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    history.push(value)
  }

  return <div className="footer-fixed">
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} />
      ))}
    </TabBar>
  </div>;
};

export default memo(FooterComponent);
