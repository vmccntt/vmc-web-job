import { Button, Card, Col, DatePicker, DatePickerProps, List, Row, Space, Tag } from "antd";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useEffectOnce } from "react-use";
import { useAppSelector } from "../../app/hooks";
import { currencyVnd } from "../../utils";
import { getGrandAmountCompany } from "../crm/customer/services";
import "./styles.scss";
import Table, { ColumnsType } from "antd/es/table";
import { getListCustomerAction, getAllGroupAction } from "../crm/customer/pages/listCustomer/slice";
import { useDispatch } from "react-redux";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const start = () => {
    dispatch(
      getListCustomerAction({
        LaNhanVien: "N",
      }) as any
    );
  };

  return (
    <div className="d-flex">
      <div className="mr-3">
        <Card title="Tiến trình đồng bộ dữ liệu giá trị doanh thu TCT" bordered={false} style={{ width: 500 }}>
          <div className="d-flex justify-content-between">
            <p>Đang thực thi...</p>
            <div>
              <Button type="primary" className="mr-1">
                Bắt đầu
              </Button>
              <Button type="primary" className="mr-1" danger>
                Dừng
              </Button>
              <Button>
                Logs
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Tiến trình đồng bộ dữ liệu Khách hàng" bordered={false} style={{ width: 500 }}>
        <div className="d-flex justify-content-between">
          <p>Đã dừng...</p>
          <div>
            <Button type="primary" className="mr-1" onClick={start}>
              Bắt đầu
            </Button>
            <Button type="primary" className="mr-1" danger>
              Dừng
            </Button>
            <Button>
              Logs
            </Button>
          </div>
        </div>
      </Card>
    </div >
  );
};

export default DashBoardPage;
