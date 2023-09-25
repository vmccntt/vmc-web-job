import { memo } from "react";
import { Tabs, TabsProps } from "antd";
import PurchaseHistory from "./opportunityDetailTab/purchaseHistory";
import DebtControl from "./opportunityDetailTab/debtControl";
import TransactionHistory from "./opportunityDetailTab/transactionHistory";
import WarrantyHistory from "./opportunityDetailTab/warrantyHistory";
import ComplaintHistory from "./opportunityDetailTab/complaintHistory";
import ImpactHistory from "./opportunityDetailTab/impactHistory";
import Survey from "./opportunityDetailTab/survey";

const DataHistory = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Lịch sử giao dịch`,
      children: <TransactionHistory />,
    },
    // {
    // 	key: '1',
    // 	label: `Lịch sử mua hàng`,
    // 	children: <PurchaseHistory />,
    // },
    {
      key: "2",
      label: `Quản lý công nợ`,
      children: <DebtControl />,
    },
    {
      key: "3",
      label: `Lịch sử bảo hành`,
      children: <WarrantyHistory />,
    },
    {
      key: "4",
      label: `Lịch sử PA/KN`,
      children: <ComplaintHistory />,
    },
    {
      key: "5",
      label: `Lịch sử tác động`,
      children: <ImpactHistory />,
    },
    {
      key: "6",
      label: `Khảo sát`,
      children: <Survey />,
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

export default memo(DataHistory);
