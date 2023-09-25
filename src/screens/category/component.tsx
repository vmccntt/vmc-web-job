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
} from "@ant-design/icons";
import { deleteCategoryAction, getCategorysTreeAction } from "./slice";
import { ICategory } from "./category.model";
import Search from "../../Layout/search";
import { IUserState } from "../user/propState";
import { isCheckPermisson } from "../../utils";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    total: 1,
    currentPage: 1,
  });

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isCategoryCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CATEGORY_CREATE
  );
  const isCategoryUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CATEGORY_UPDATE
  );
  const isCategoryList = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CATEGORY_LIST
  );
  const isCategoryDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.CATEGORY_DELETE
  );

  const header: any = [
    {
      title: "Tiêu đề",
      key: "title",
      dataIndex: "title",
      align: "left",
    },
    {
      title: "Đường dẫn",
      key: "slug",
      dataIndex: "slug",
      align: "center",
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Sắp xếp",
      key: "indexSort",
      dataIndex: "indexSort",
      align: "center",
    },
    {
      title: "Là menu",
      key: "isMenu",
      dataIndex: "isMenu",
      align: "center",
      render: (_text: string, record: ICategory, index: number) => {
        return (
          <>{record.isMenu && <CheckOutlined className="text-green-500" />}</>
        );
      },
    },
    {
      title: "Ảnh",
      key: "url",
      align: "center",
      render: (_text: string, record: ICategory, index: number) => {
        return <Image src={record.url} height={30} width={30} />;
      },
    },
    {
      title: "Kiểu hiển thị",
      key: "type",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: ICategory, index: number) => {
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
  const categoryData = useAppSelector((state) => state.screens.category);
  const menu = (item: ICategory, index: number) => {
    return (
      <Menu key={index}>
        {isCategoryUpdate && (
          <Menu.Item
            key={`ite-${index}`}
            icon={<EditOutlined />}
            // onClick={_editItem(item)}
          >
            <Link
              key="categoryUpdate"
              to={{
                pathname: `/category/update/${item.categoryId || item.id}`,
              }}
              title="Create"
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isCategoryDelete && (
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
    isCategoryList && dispatch(getCategorysTreeAction({}) as any);
  }, [dispatch, isCategoryList]);

  useEffect(() => {
    if (categoryData.data) {
      setState(categoryData);
    }
  }, [categoryData]);

  const _confirmDelete = (item: ICategory) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa danh mục không?`,
      icon: <ExclamationCircleOutlined />,
      content: item.title,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deleteCategoryAction({ id }) as any);
      },
    });
  };

  const _onChangePage = async (page: number) => {
    setState({ ...state, currentPage: page });
    dispatch(getCategorysTreeAction({ page }) as any);
  };

  return (
    <>
      <Card
        title={
          <>
            <h3 className="text-xl">Danh mục</h3>
          </>
        }
        className="rounded-none"
        extra={
          isCategoryCreate && (
            <Row className="mt-2 mb-2">
              <Link
                key="5"
                to={{ key: "categoryCreate", pathname: `/category/create` }}
                title="Create"
              >
                <Button type="primary" ghost>
                  {" "}
                  Thêm mới{" "}
                </Button>
              </Link>
            </Row>
          )
        }
      >
        {isCategoryList && (
          <Search>
            <SearchComponent />
          </Search>
        )}
        {isCategoryList && (
          <Table
            dataSource={state?.data || []}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: state.count,
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

export default CategoryPage;
