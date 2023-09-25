import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Dropdown, Image, Menu, Modal, Row, Table } from "antd";
import { useAppSelector } from "../../app/hooks";
import SearchComponent from "./component/searchComponent";
import { ReactComponent as Kebab } from "../../assets/img/kebab.svg";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteRecruimentAction, getRecruimentsAction } from "./slice";
import { IRecruiment } from "./recruiment.model";
import Search from "../../Layout/search";
import { IUserState } from "../user/propState";
import { isCheckPermisson } from "../../utils";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const RecruimentPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isRecruimentCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.RECRUIMENT_CREATE
  );
  const isRecruimentUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.RECRUIMENT_UPDATE
  );
  const isRecruimentList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.RECRUIMENT_LIST
  );
  const isRecruimentDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.RECRUIMENT_DELETE
  );

  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: IRecruiment, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Họ và tên",
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (_text: string, record: IRecruiment, index: number) => {
        return <>{record.name}</>;
      },
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
      align: "center",
    },
    {
      title: "name",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Vị trí ứng tuyển",
      key: "nominee",
      dataIndex: "nominee",
      align: "center",
    },
    {
      title: "Chuyên ngành đào tạo",
      key: "specialized",
      dataIndex: "specialized",
      align: "center",
    },
    {
      title: "Nơi đào tạo",
      key: "trainingPlaces",
      dataIndex: "trainingPlaces",
      align: "center",
    },
    {
      title: "Trình độ",
      key: "ranking",
      dataIndex: "ranking",
      align: "center",
    },
    {
      title: "CV",
      key: "cv",
      dataIndex: "cv",
      align: "center",
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: IRecruiment, index: number) => {
        return (
          <Dropdown
            key={`dr-${index}`}
            overlay={menu(record, index)}
            className="cursor-pointer"
          >
            <Kebab className="m-auto" />
          </Dropdown>
        );
      },
    },
  ];
  const dataReducer = useAppSelector((state) => state.screens.recruiment);
  const menu = (item: IRecruiment, index: number) => {
    return (
      <Menu key={index}>
        {isRecruimentUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/recruiment/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isRecruimentDelete && (
          <Menu.Item
            key={`itd-${index}`}
            icon={<DeleteOutlined />}
            danger
            onClick={_confirmDelete(item)}
          >
            Xóa
          </Menu.Item>
        )}
      </Menu>
    );
  };

  useEffect(() => {
    isRecruimentList && dispatch(getRecruimentsAction({}) as any);
  }, [dispatch, isRecruimentList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: IRecruiment) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa người dùng không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteRecruimentAction({ id }) as any);
      },
    });
  };

  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };

  return (
    <>
      <Card
        title={
          <>
            <h3 className="text-xl">Tuyển dụng</h3>
          </>
        }
        className="rounded-none"
        extra={
          isRecruimentCreate && (
            <Link
              key="5"
              to={{ pathname: `/recruiment/create` }}
              title="Create"
            >
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isRecruimentList && (
          <Search>
            <SearchComponent />
          </Search>
        )}
        {isRecruimentList && (
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
        )}
      </Card>
    </>
  );
};

export default RecruimentPage;
