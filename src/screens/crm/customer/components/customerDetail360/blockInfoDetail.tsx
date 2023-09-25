import { memo } from "react";
import { Button, Tabs } from "antd";
import type { TabsProps } from "antd";
import Dashboard from "../dashboard";
import CustomerInfoView from "../customerInfoView";
import DataHistory from "../dataHistory";
import Opportunity from "../opportunity";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../../../app/hooks";
import CustomerInfoMobileView from "../../../mobile-mode-page/customerInfoMobileView";

const BlockInfoDetail = () => {
  const onChange = (key: string) => {
    // console.log(key);
  };
  const mobileData = useAppSelector((state) => state.common.isMobile);
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const operations = (
    <Button className="back-btn" onClick={goBack}>
      Quay lại
    </Button>
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Dashboard`,
      children: <Dashboard />,
    },
    {
      key: "2",
      label: `Thông tin cá nhân`,
      children: !mobileData ? <CustomerInfoView /> : <CustomerInfoMobileView />,
    },
    {
      key: "3",
      label: `Dữ liệu quá khứ`,
      children: <DataHistory />,
    },
    {
      key: "4",
      label: `Quản lý cơ hội`,
      children: <Opportunity />,
    },
  ];

	return (
		<>
			{!mobileData ? (
				<div className="block-customer-detail">
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarExtraContent={operations} >
					</Tabs>
				</div>
			) : (
				<div className="block-customer-detail mt-3">
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} >
					</Tabs>
				</div>
			)}
		</>
	)
}

export default memo(BlockInfoDetail);
