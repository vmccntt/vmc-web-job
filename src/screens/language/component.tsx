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
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { deleteLanguageAction, getLanguagesAction } from "./slice";
import { ILanguage } from "./language.model";
import { formatDate, isCheckPermisson } from "../../utils";
import { IUserState } from "../user/propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const LanguagePage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isLanguageCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.LANGUAGE_CREATE
  );
  const isLanguageUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.LANGUAGE_UPDATE
  );
  const isLanguageList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.LANGUAGE_LIST
  );
  const isLanguageDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.LANGUAGE_DELETE
  );
  const header: any = [
    {
      title: "STT",
      key: "id",
      dataIndex: "id",
      align: "center",
      render: (_text: string, record: ILanguage, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Tên ngôn ngữ",
      key: "name",
      dataIndex: "name",
      align: "center",
      render: (_text: string, record: ILanguage, index: number) => {
        return <>{record.name}</>;
      },
    },
    {
      title: "Mã code",
      key: "code",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Quốc kỳ",
      key: "image",
      align: "center",
      render: (_text: string, record: ILanguage, index: number) => {
        return <Image src={record.image} height={30} width={30} />;
      },
    },
    {
      title: "Mặc định",
      key: "ispublish",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: ILanguage, index: number) => {
        return (
          <>
            {record.isDefault ? (
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
      render: (_text: string, record: ILanguage) => {
        return <>{formatDate(record.updatedAt)}</>;
      },
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: ILanguage, index: number) => {
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
  const dataReducer = useAppSelector((state) => state.screens.language);
  const menu = (item: ILanguage, index: number) => {
    return (
      <Menu key={index}>
        {isLanguageUpdate && (
          <Menu.Item key={`ite-${index}`} icon={<EditOutlined />}>
            <Link
              key="update"
              to={{ pathname: `/language/update/${item.id}` }}
              title="update"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isLanguageDelete && (
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
    isLanguageList && dispatch(getLanguagesAction({}) as any);
  }, [dispatch, isLanguageList]);

  useEffect(() => {
    if (dataReducer) {
      setState(dataReducer);
    }
  }, [dataReducer]);

  const _confirmDelete = (item: ILanguage) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa người dùng không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteLanguageAction({ id }) as any);
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
            <h3 className="text-xl">Ngôn ngữ</h3>
          </>
        }
        className="rounded-none"
        extra={
          isLanguageCreate && (
            <Link key="5" to={{ pathname: `/language/create` }} title="Create">
              <Button type="primary" ghost>
                Thêm mới
              </Button>
            </Link>
          )
        }
      >
        {/* <SearchComponent /> */}
        {isLanguageList && (
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

export default LanguagePage;
