import { Tabs, TabsProps } from "antd";
import { memo } from "react";

const Opportunity = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Gói thầu`,
      // children: <Dashboard />,
    },
    {
      key: "2",
      label: `Dự án`,
      // children: <CustomerInfoView />,
    },
    {
      key: "3",
      label: `Báo giá`,
      // children: <DataHistory />,
    },
  ];
  const onChange = (key: string) => {
    // console.log(key);
  };
  return (
    <Tabs
      tabPosition="top"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default memo(Opportunity);
