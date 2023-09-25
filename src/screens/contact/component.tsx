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
import {
  setStatusModalAction,
  deleteContactAction,
  getContactsAction,
} from "./slice";
import { IContact } from "./contact.model";
import { formatDate, isCheckPermisson } from "../../utils";
import InforTypeFormat, {
  INFOR_TYPE_ENUM,
  InforPurpose,
  InforPurposeEnum,
} from "../../utils/enum";
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
  const isContactCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CONTACT_CREATE
  );
  const isContactUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CONTACT_UPDATE
  );
  const isContactList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CONTACT_LIST
  );
  const isContactDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CONTACT_DELETE
  );
  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: IContact, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Họ và tên",
      key: "name",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "Số điện thoại / email",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Mục đích",
      key: "purpose",
      dataIndex: "purpose",
      align: "center",
      render: (_text: string, record: IContact, index: number) => {
        const infor =
          record.purpose === InforPurposeEnum.ORDER
            ? InforPurpose.order
            : record.purpose === InforPurposeEnum.CLIENT
            ? InforPurpose.client
            : "";
        return <>{infor}</>;
      },
    },
    {
      title: "Tin nhắn",
      key: "content",
      dataIndex: "content",
      align: "center",
    },
    {
      title: "Công ty",
      key: "company",
      dataIndex: "company",
      align: "center",
    },
    {
      title: "Trạng thái",
      key: "type",
      dataIndex: "type",
      align: "center",
      render: (_text: string, record: IContact, index: number) => {
        return <>{InforTypeFormat[record?.type || ""]}</>;
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (_text: string, record: IContact, index: number) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: IContact, index: number) => {
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
  const dataReducer = useAppSelector((state: any) => state.screens.contact);
  const menu = (item: IContact, index: number) => {
    return (
      <Menu key={index}>
        {isContactUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/contact/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isContactDelete && (
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
    isContactList && dispatch(getContactsAction({}) as any);
  }, [dispatch, isContactList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: IContact) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa người dùng không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteContactAction({ id }) as any);
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
            <h3 className="text-xl">Thông tin</h3>
          </>
        }
        className="rounded-none"
        extra={
          isContactCreate && (
            <Link key="5" to={{ pathname: `/contact/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isContactList && (
          <Search>
            <SearchComponent />
          </Search>
        )}

        {isContactList && (
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
