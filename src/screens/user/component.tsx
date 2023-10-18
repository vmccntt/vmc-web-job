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
import { deleteUserAction, getRoleGroupAction, getUsersAction } from "./slice";
import { IUser } from "./user.model";
import { formatDate, isCheckPermisson } from "../../utils";
import Search from "../../Layout/search";
import { IUserState } from "./propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const UserPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isUserUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.USER_UPDATE
  );
  const isUserCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.USER_CREATE
  );
  const isUserList = isCheckPermisson(permissionObj, PERMISSION_ENUM.USER_LIST);
  const isUserDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.USER_DELETE
  );
  const header: any = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tên",
      key: "firstName",
      dataIndex: "firstName",
      align: "center",
      render: (_text: string, record: IUser, index: number) => {
        return <>{record.firstName + " " + record.lastName}</>;
      },
    },
    {
      title: "Tên đăng nhập",
      key: "username",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      key: "avatar",
      align: "center",
      render: (_text: string, record: IUser, index: number) => {
        return <Image src={record.avatar} height={30} width={30} />;
      },
    },
    {
      title: "Vai trò",
      key: "role",
      align: "center",
      render: (_text: string, record: IUser) => {
        const group = dataReducer?.roleGroup?.find(
          (f) => f.value === record.role
        );
        return <p>{group?.label}</p>;
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (_text: string, record: IUser, index: number) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: IUser, index: number) => {
        return (
          <Dropdown
            key={`dr-${index}`}
            overlay={menu(record, index)}
            className="cursor-pointer"
          >
            <Kebab className="m-auto"/>
          </Dropdown>
        );
      },
    },
  ];
  const dataReducer = useAppSelector((state) => state.screens.user);
  const menu = (item: IUser, index: number) => {
    return (
      <Menu key={index}>
        {isUserUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/user/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isUserDelete && (
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
    isUserList && dispatch(getUsersAction({}) as any);
    if (!dataReducer.roleGroup?.length) {
      // dispatch(getRoleGroupAction({}) as any);
    }
  }, [dispatch, dataReducer.roleGroup, isUserList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: IUser) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa người dùng không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteUserAction({ id }) as any);
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
            <h3 className="text-xl">Người dùng</h3>
          </>
        }
        className="rounded-none"
        extra={
          isUserCreate && (
            <Link key="5" to={{ pathname: `/user/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isUserList && (
          <Search>
            <SearchComponent />
          </Search>
        )}
        {isUserList && (
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

export default UserPage;
