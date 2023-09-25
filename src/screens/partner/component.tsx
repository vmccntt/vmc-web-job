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
  deleteUserAction,
  getUsersAction,
} from "./slice";
import { IPartner } from "./partner.model";
import { formatDate, isCheckPermisson } from "../../utils";
import Search from "../../Layout/search";
import { IUserState } from "../user/propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const UserPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    currentPage: 1,
  });
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isPartnerCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.PARTNER_CREATE
  );
  const isPartnerUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.PARTNER_UPDATE
  );
  const isPartnerList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.PARTNER_LIST
  );
  const isPartnerDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.PARTNER_DELETE
  );

  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      width: 50,
      align: "center",
      render: (_text: string, record: IPartner, index: number) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Tên đối tác",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Ảnh bìa",
      key: "icon",
      align: "center",
      render: (_text: string, record: IPartner, index: number) => {
        return <Image src={record.image} width={80} />;
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAt",
      dataIndex: "createdAt",
      align: "center",
      render: (_text: string, record: IPartner, index: number) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: IPartner, index: number) => {
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
  const dataReducer = useAppSelector((state) => state.screens.partner);
  const menu = (item: IPartner, index: number) => {
    return (
      <Menu key={index}>
        {isPartnerUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/partner/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isPartnerDelete && (
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
    isPartnerList && dispatch(getUsersAction({}) as any);
  }, [dispatch, isPartnerList]);

  useEffect(() => {
    if (dataReducer.data) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: IPartner) => () => {
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
            <h3 className="text-xl">Đối tác</h3>
          </>
        }
        className="rounded-none"
        extra={
          isPartnerCreate && (
            <Link key="5" to={{ pathname: `/partner/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {isPartnerList && (
          <Search>
            <SearchComponent />
          </Search>
        )}
        {isPartnerList && (
          <Table
            dataSource={state?.data || []}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: 1,
              showSizeChanger: false,
              onChange: _onChangePage,
            }}
            bordered
            rowKey={"id"}
          />
        )}
      </Card>
    </>
  );
};

export default UserPage;
