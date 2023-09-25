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
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { deleteInforContactAction, getInforContactsAction } from "./slice";
import { InforContact } from "./inforContact.model";
import { formatDate, isCheckPermisson } from "../../utils";

import Search from "../../Layout/search";
import { IUserState } from "../user/propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const ContactPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    currentPage: 1,
  });
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isInforContactCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.INFOR_CONTACT_CREATE
  );
  const isInforContactUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.INFOR_CONTACT_UPDATE
  );
  const isInforContactList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.INFOR_CONTACT_LIST
  );
  const isInforContactDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.INFOR_CONTACT_DELETE
  );
  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: InforContact, index: number) => {
        return <p>{ index + 1}</p>
      }
    },
    {
      title: "Tên",
      key: "title",
      dataIndex: "title",
      align: "center",
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
    },

    {
      title: "Hotline",
      key: "hotline",
      dataIndex: "hotline",
      align: "center",
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
      align: "center",
    },
    {
      title: "Xuất bản",
      key: "isActive",
      dataIndex: "isActive",
      align: "center",
      render: (_text: string, record: InforContact, index: number) => {
        return (
          <>
            {record.isActive ? (
              <CheckOutlined className="text-green-500" />
            ) : (
              <CloseOutlined className="text-red-500" />
            )}
          </>
        );
      },
    },

    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (_text: string, record: InforContact, index: number) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: InforContact, index: number) => {
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
  const dataReducer = useAppSelector((state) => state.screens.inforContact);
  const menu = (item: InforContact, index: number) => {
    return (
      <Menu key={index}>
        {isInforContactUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/infor/contact/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isInforContactDelete && (
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
    isInforContactList && dispatch(getInforContactsAction({}) as any);
  }, [dispatch, isInforContactList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: InforContact) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa người dùng không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.title,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteInforContactAction({ id }) as any);
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
            <h3 className="text-xl">Địa chỉ</h3>
          </>
        }
        className="rounded-none"
        extra={
          isInforContactCreate && (
            <Link
              key="5"
              to={{ pathname: `/infor/contact/create` }}
              title="Create"
            >
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isInforContactList && (
          <Search>
            <SearchComponent />
          </Search>
        )}

        {isInforContactList && (
          <Table
            dataSource={state?.data || []}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: 1,
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

export default ContactPage;
