import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Dropdown, Image, Menu, Modal, Table } from "antd";
import { useAppSelector } from "../../app/hooks";
import { ReactComponent as Kebab } from "../../assets/img/kebab.svg";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { formatDate, isCheckPermisson } from "../../utils";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";
import { IUserState } from "../user/propState";
import { IUser } from "../user/user.model";
import {
  deleteUserAction,
} from "../user/slice";
import { useEffectOnce } from "react-use";
import { deleteRoleAction, getRoleGroupsAction } from "./slice";

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
  const isRoleUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.ROLE_UPDATE
  );
  const isRoleCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.ROLE_CREATE
  );
  const isRoleList = isCheckPermisson(permissionObj, PERMISSION_ENUM.ROLE_LIST);
  const isRoleDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.ROLE_DELETE
  );
  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: IUser, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Tên nhóm quyền",
      key: "label",
      dataIndex: "label",
      align: "center",
    },
    {
      title: "Mã nhóm quyền",
      key: "value",
      dataIndex: "value",
      align: "center",
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
            <Kebab className="m-auto" />
          </Dropdown>
        );
      },
    },
  ];
  const dataReducer = useAppSelector((state) => state.screens.role);

  const menu = (item: IUser, index: number) => {
    return (
      <Menu key={index}>
        {isRoleUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/role/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isRoleDelete && (
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
    isRoleList && dispatch(getRoleGroupsAction({}) as any);
  }, [dispatch, isRoleList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  // useEffectOnce(() => {
  //   dispatch(getRoleGroupsAction({}) as any);
  //   if (dataReducer) {
  //     console.log('dataReducer:: ', dataReducer);
  //     setState(dataReducer);
  //   }
  // });


  const _confirmDelete = (item: IUser) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa nhóm quyền không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteRoleAction({ id }) as any);
      },
    });
  };

  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
  };

  return (
    <>
      <Card
        title={<h3 className="text-xl">Phân quyền</h3>}
        className="rounded-none"
        extra={
          isRoleCreate && (
            <Link key="5" to={{ pathname: `/role/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isRoleList && (
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
