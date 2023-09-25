import { EditOutlined } from "@ant-design/icons";
import { Card, Checkbox, Dropdown, Menu, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAsyncFn } from "react-use";
import Search from "../../../../../Layout/search";
import { useAppSelector } from "../../../../../app/hooks";
import { Image, List } from "antd-mobile";
import SearchComponent from "../../components/searchComponent";
import SearchMbComponent from "../../../mobile-mode-page/searchMbComponent";
import { users } from "../../dataFake/index";
import url from "../../../../../assets/img/no-avatar.jpg";
import "../../styles.scss";
import {
  getAllGroupAction,
  getDetailCustomerAction,
  getListCustomerAction,
} from "./slice";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });
  const [stateDetail, setStateDetail] = useState<any>({
    data: null,
  });
  const [dataDetailState, dataDetailStateFn] = useAsyncFn(
    async (params: any) => {
      return dispatch(getDetailCustomerAction(params) as any);
    }
  );

  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };

  const dataReducer = useAppSelector((state) => state.screens.customer);
  const mobileData = useAppSelector((state) => state.common.isMobile);

  useEffect(() => {
    dispatch(
      getListCustomerAction({
        LaNhanVien: "N",
      }) as any
    );
    dispatch(getAllGroupAction({}) as any);
  }, [dispatch]);

  useEffect(() => {
    if (dataReducer?.data) {
      var data1 = dataReducer?.data?.map((item: any) => {
        return { ...item };
      });
      setState({
        ...state,
        data: data1,
      });
    }
    if (dataReducer?.dataDetail) {
      setStateDetail(dataReducer?.dataDetail);
    }
  }, [dataReducer]);

  const onGetDetail = (query: any) => {
    return dataDetailStateFn(query);
  };

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
      title: "Mã đối tác",
      key: "maDoiTac",
      dataIndex: "maDoiTac",
      align: "center",
    },
    {
      title: "Tên đối tác",
      key: "tenDoiTac",
      dataIndex: "tenDoiTac",
      align: "center",
    },
    {
      title: "Nhóm đối tác",
      key: "nhomDoiTac",
      dataIndex: "nhomDoiTac",
      align: "center",
    },
    {
      title: "Tên ngân hàng",
      key: "tenNganHang",
      dataIndex: "tenNganHang",
      align: "center",
    },
    {
      title: "Người đại diện",
      key: "nguoiDaiDien",
      dataIndex: "nguoiDaiDien",
      align: "center",
    },
    {
      title: "Mô tả",
      key: "moTa",
      dataIndex: "moTa",
      align: "center",
    },
  ];

  const history = useHistory();

  const handleDoubleClick = (id: any) => {
    const url = "/customer-detail/" + id; // Thay đổi địa chỉ URL tùy thuộc vào yêu cầu của KH
    history.push(url);
  };

  return (
    <>
      <Card
        title={<h3 className="text-xl">Danh sách khách hàng</h3>}
        className="rounded-none wap-customer"
      >
        {!mobileData ? (
          <>
            <Search>
              <SearchComponent />
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
              onRow={(record: any) => {
                return {
                  onDoubleClick: () => {
                    handleDoubleClick(record?.maDoiTac);
                    onGetDetail(record?.maDoiTac);
                  },
                };
              }}
            />
          </>
        ) : (
          <div className="filter-box-mobile">
            <Search>
              <SearchMbComponent />
            </Search>
            <List>
              {state?.data.slice(0, 500).map((user: any, index: any) => (
                <List.Item
                  // key={user.name}
                  key={index}
                  onClick={() => {
                    handleDoubleClick(user?.maDoiTac);
                    onGetDetail(user?.maDoiTac);
                  }}
                  prefix={
                    <Image
                      src={url}
                      style={{ borderRadius: 20 }}
                      fit="cover"
                      width={40}
                      height={40}
                    />
                  }
                  description={user.nhomDoiTac}
                >
                  {user.tenDoiTac}
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </Card>
    </>
  );
};

export default CustomerPage;
