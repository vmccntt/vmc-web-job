import { Card, DatePicker, Table } from "antd";
import {
  List,
  Modal,
  DatePicker as DPMobile,
  Space,
  Button,
  Toast,
  ConfigProvider,
} from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import { memo, useEffect, useState } from "react";
import Search from "../../../../../Layout/search";
import { useAppSelector } from "../../../../../app/hooks";
const { RangePicker } = DatePicker;

const TransactionHistory = () => {
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const formattedDate = date
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");
    return formattedDate;
  }
  function formatCurrency(amount: any) {
    const formatter = new Intl.NumberFormat("de-DE");
    return formatter.format(amount) + " VND";
  }
  const now = new Date();
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setendDate] = useState<Date>(new Date());

  const handlestartDateChange = (date: Date | null) => {
    date && setstartDate(date);
  };

  const handleendDateChange = (date: Date | null) => {
    date && setendDate(date);
  };
  const dataReducer = useAppSelector((state) => state.screens.customer);
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });
  const mobileData = useAppSelector((state) => state.common.isMobile);
  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };
  useEffect(() => {
    if (dataReducer?.dataDetail?.orders) {
      setState({ data: dataReducer?.dataDetail?.orders });
    }
  }, [dataReducer]);

  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: any, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Mã hợp đồng",
      key: "documentNo",
      dataIndex: "documentNo",
      align: "left",
    },
    {
      title: "Ngày giao dịch",
      key: "orderedAt",
      dataIndex: "orderedAt",
      align: "center",
      // responsive:
      render: (_text: string, record: any, index: number) => {
        return (
          <div>
            {new Date(_text)
              .toISOString()
              .slice(0, 10)
              .replace("T", " ")
              .split("-")
              .reverse()
              .join("-")}
            {/* Should modify to formatDate() */}
            {/* {formatDate(record.updatedAt)} */}
          </div>
        );
      },
    },
    {
      title: "Giá trị hợp đồng",
      key: "amount",
      dataIndex: "amount",
      align: "center",
      render: (_text: number, record: any, index: number) => {
        return new Intl.NumberFormat("de-DE").format(_text) + " VND";
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (_text: string, record: any, index: number) => {
        return (
          <div>{record.status === "CO" ? "Hoàn thành" : "Chưa hoàn thành"}</div>
        );
      },
    },
  ];

  const StatusOptions = [
    { label: "Hoàn thành", value: "CO" },
    { label: "Chưa hoàn thành", value: "DR" },
  ];

  const onChangeValue = (value: any) => {
    if (value) {
      const startDate = value[0];
      const endDate = value[1];
      var dataFilter = dataReducer?.dataDetail?.orders?.filter((item: any) => {
        const orderedAt = new Date(item?.orderedAt);
        return orderedAt >= startDate && orderedAt <= endDate;
      });
      setState({ ...state, data: dataFilter });
    }
  };

  // const onChangeValueMb = (startDate: any, endDate: any) => {
  //   var dataFilter = dataReducer?.dataDetail?.orders?.filter((item: any) => {
  //     const orderedAt = new Date(item?.orderedAt);
  //     return orderedAt >= startDate && orderedAt <= endDate;
  //   });
  //   setState({ ...state, data: dataFilter });
  // };

  const originalonChangeValueMb = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() >= endDate.getTime()) {
      Toast.show("Vui lòng nhập lại ngày");
    } else {
      var dataFilter = dataReducer?.dataDetail?.orders?.filter((item: any) => {
        const orderedAt = new Date(item?.orderedAt);
        return orderedAt >= startDate && orderedAt <= endDate;
      });
      setState({ ...state, data: dataFilter });
    }
  };

  const adjustedonChangeValueMb =
    (startDate: Date, endDate: Date) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      originalonChangeValueMb(startDate, endDate);
    };

  return (
    <div className="wap-customer p-2">
      <h3 className="text-xl bold pb-2 br-b">Thông tin giao dịch</h3>
      {!mobileData ? (
        <>
          <Search>
            <div className="filter-box">
              {/* Search Laptop */}
              <RangePicker
                placeholder={["Bắt đầu", "Kết thúc"]}
                onChange={(value) => onChangeValue(value)}
              />
            </div>
          </Search>
          <Table
            dataSource={state?.data || []}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: state?.count || 0,
              showSizeChanger: false,
              onChange: _onChangePage,
            }}
            rowKey={"id"}
            bordered
          />
        </>
      ) : (
        <div className="filter-box-mobile">
          {/* Search Mobile */}

          {/* <RangePicker
            placeholder={["Bắt đầu", "Kết thúc"]}
            onChange={(value) => onChangeValue(value)}
          /> */}
          <Search>
            <div className="search-container">
              <div className="text">Bắt đầu</div>
              <div className=" mobile-search mobile-search-startDate">
                <Space align="center">
                  <Button
                    onClick={() => {
                      setVisible1(true);
                    }}
                  >
                    Chọn
                  </Button>
                  <ConfigProvider locale={enUS}>
                    <DPMobile
                      // title="Ngày bắt đầu"
                      visible={visible1}
                      value={startDate}
                      onClose={() => {
                        setVisible1(false);
                      }}
                      defaultValue={now}
                      max={now}
                      onConfirm={handlestartDateChange}
                    >
                      {(startDate) => startDate?.toDateString()}
                    </DPMobile>
                  </ConfigProvider>
                </Space>
              </div>
              <div className="text">Kết thúc</div>
              <div className=" mobile-search mobile-search-endDate">
                <ConfigProvider locale={enUS}>
                  <Space align="center">
                    <Button
                      onClick={() => {
                        setVisible2(true);
                      }}
                    >
                      Chọn
                    </Button>
                    <DPMobile
                      // title="Ngày kết thúc"
                      visible={visible2}
                      value={endDate}
                      onClose={() => {
                        setVisible2(false);
                      }}
                      defaultValue={now}
                      max={now}
                      onConfirm={handleendDateChange}
                    >
                      {(endDate) => endDate?.toDateString()}
                    </DPMobile>
                  </Space>
                </ConfigProvider>
              </div>
              <Button
                className="mb-search-btn"
                onClick={adjustedonChangeValueMb(startDate, endDate)}
                color="success"
                fill="outline"
              >
                Tìm kiếm
              </Button>
            </div>
          </Search>

          <List>
            {state?.data.map((order: any, i: any) => (
              <List.Item
                key={i}
                onClick={() => {
                  // show data
                  Modal.show({
                    title: "Thông tin chi tiết",
                    content: (
                      <>
                        <div>
                          <span>
                            <b>Mã hợp đồng:</b>{" "}
                          </span>
                          {order.documentNo}
                        </div>
                        <div>
                          <span>
                            <b>Ngày giao dịch:</b>{" "}
                          </span>
                          {formatDate(order.orderedAt)}
                        </div>
                        <div>
                          <span>
                            <b>Giá trị hợp đồng:</b>{" "}
                          </span>
                          {formatCurrency(order.amount)}
                        </div>
                        <div>
                          <span>
                            <b>Trạng thái hợp đồng:</b>{" "}
                          </span>
                          {order.status === "CO"
                            ? "Hoàn thành"
                            : "Chưa hoàn thành"}
                        </div>
                      </>
                    ),
                    closeOnAction: true,
                    closeOnMaskClick: true,
                  });
                }}
              >
                {order.documentNo}
              </List.Item>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default memo(TransactionHistory);
