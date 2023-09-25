import { Tabs, TabsProps } from "antd";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { memo } from "react";
import { useHistory } from "react-router-dom";
import DebtChart from "./dashboardDetailTab/debtChart";
import TotalOrdersChart from "./dashboardDetailTab/totalOrdersChart";
import TransactionChart from "./dashboardDetailTab/transactionChart";
import WarrantyChart from "./dashboardDetailTab/warrantyChart";
ChartJS.register(...registerables);

const Dashboard = () => {
  const isMobile = window.innerWidth <= 1024;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Giá trị ký hợp đồng`,
      children: <TransactionChart />,
    },
    {
      key: "2",
      label: `Công nợ kế hoạch`,
      children: <TotalOrdersChart />,
    },
    {
      key: "3",
      label: `Công nợ thực tế`,
      children: <DebtChart />,
    },
    // {
    //     key: '4',
    //     label: `Bảo hành`,
    //     children: <WarrantyChart />,
    // },
  ];
  const onChange = (key: string) => {
    // console.log(key);
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {!isMobile ? (
        <div className="fix_legend container">
          <div className="row">
            <div className="col-sm-12 p-2">
              <TransactionChart />
            </div>
            <div className="col-sm-6 p-2">
              <TotalOrdersChart />
            </div>
            <div className="col-sm-6 p-2">
              <DebtChart />
            </div>
            {/* <div className="col-sm-4 p-2">
                            <WarrantyChart />
                        </div> */}
          </div>
        </div>
      ) : (
        <>
          <div className="fix_legend container">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange}></Tabs>
          </div>
        </>
      )}
    </>
  );
};

export default memo(Dashboard);
