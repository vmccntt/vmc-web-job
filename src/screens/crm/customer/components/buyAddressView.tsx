import { Table } from "antd";
import { memo, useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";

const BuyAddressView = () => {
  const [state, setState] = useState<any>({
    data: [],
    // total: 1,
    currentPage: 1,
  });
  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };
  const dataReducer = useAppSelector((state) => state.screens.customer);

  useEffect(() => {
    var newData = dataReducer?.dataDetail?.represents;
    setState({ ...state, data: newData });
  }, [dataReducer]);
  const header: any = [
    {
      title: "Họ và tên(Danh xưng)",
      key: "title",
      dataIndex: "title",
      align: "center",
    }, {
      title: "Giới tính",
      key: "gender",
      dataIndex: "gender",
      align: "center",
    }, {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
      align: "center",
    }, {
      title: "Ngày sinh",
      key: "birthDay",
      dataIndex: "birthDay",
      align: "center",
    },
    , {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    , {
      title: "Fax",
      key: "fax",
      dataIndex: "fax",
      align: "center",
    }, {
      title: "Chức vụ",
      key: "position",
      dataIndex: "position",
      align: "center",
    }, {
      title: "Phòng ban",
      key: "department",
      dataIndex: "department",
      align: "center",
    },
  ];
  const paginationOptions = {
    items_per_page: '/ Trang',
    jump_to: 'Đến',
    jump_to_confirm: 'Xác nhận',
    page: '',
    prev_page: 'Trang trước',
    next_page: 'Trang tiếp',
    prev_5: '5 trang trước',
    next_5: '5 trang tiếp',
    prev_3: '3 trang trước',
    next_3: '3 trang tiếp',
  };

  return (
    <div className="rounded">
      <div className="pl-4 pr-4 rounded-3 wap-responsive">
        <div className="row gx-5">
          <div className="right-address">
            <h6 className="titleH">Thông tin liên hệ</h6>
            <div className="address-box">
              <Table
                dataSource={state?.data}
                columns={header}
                size="small"
                // locale={{ emptyText: 'Không có dữ liệu' }}
                pagination={{
                  locale: paginationOptions,
                  defaultPageSize: 1,
                  total: state.length || 0,
                  showSizeChanger: true,
                  onChange: _onChangePage,
                  pageSizeOptions: ['3', '5', '10']
                }}
                // rowKey={"id"}
                bordered
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default memo(BuyAddressView)