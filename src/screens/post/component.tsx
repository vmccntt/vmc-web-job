import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsAction } from "./slice";
import "./styles.scss";
import { Dropdown, Menu, Modal, Table, Image, Row, Button, Card } from "antd";
import { useAppSelector } from "../../app/hooks";
import SearchComponent from "./component/searchComponent";
import Search from "../../Layout/search";
import { PostInterface } from "../../models/post";
import { ReactComponent as Kebab } from "../../assets/img/kebab.svg";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { deletePostAction } from "./slice";
import { Link, useLocation } from "react-router-dom";
import { get } from "lodash";
import { formatDate, isCheckPermisson, showToast } from "../../utils";
import { useHistory } from "react-router-dom";
import { ILanguage } from "../language/language.model";
import { useEffectOnce } from "react-use";
import { updatePost } from "./services";
import { getCategories } from "../category/services";
import { ICategory } from "../category/category.model";
import { setLoadingAction } from "../../app/commonSlice";
import { getLanguagesAction } from "../language/slice";
import { IUserState } from "../user/propState";
import { PERMISSION_ENUM } from "../../utils/permisson.enum";

const { confirm } = Modal;

function PostPage(props: any) {
  const location = useLocation();
  const getQuery = () => {
    const param = new URLSearchParams(props.location.search);
    const name = param.get("name") || "";
    const title = param.get("title") || "";
    const category = param.get("category") || "";
    const content = param.get("content") || "";
    const language = param.get("language") || "";

    const query: any = {};
    if (name) query.name = name;
    if (title) query.title = title;
    if (category) query.category = category;
    if (content) query.content = content;
    if (language) query.language = language;
    return query;
  };

  let history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isPostList = isCheckPermisson(permissionObj, PERMISSION_ENUM.POST_LIST);
  const isPostCreate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.POST_CREATE
  );
  const isPostUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.POST_UPDATE
  );
  const isPostDelete = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.POST_DELETE
  );
  const isPostPublish = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.POST_ISPUBLISH
  );

  const [listIdDelete, setListIdDelete] = useState<any[]>([]);

  const onPublish = async (id: number, isPublish: boolean) => {
    await updatePost(id, { isPublish }).then((r) => {
      const title = isPublish
        ? "Xuất bản thành công"
        : "Ngừng xuất bản thành công";
      showToast(title, "success");
      dispatch(getPostsAction({ ...getQuery() }) as any);
    });
  };

  const header: any = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tiêu đề bài viết",
      key: "title",
      width: "15%",
      // dataIndex: "title",
      align: "center",
      render: (_text: string, record: PostInterface, index: number) => {
        return (
          <p>
            {record.title && record.title.length <= 150
              ? record.title
              : record.title?.slice(0, 150) + "..."}
          </p>
        );
      },
    },
    {
      title: "Ảnh bìa",
      key: "icon",
      align: "center",
      render: (_text: string, record: PostInterface, index: number) => {
        return (
          <Image
            src={record.icon || "../../imgs/no_image.png"}
            width={100}
          />
        );
      },
    },
    {
      key: "Content",
      dataIndex: "content",
      width: "20%",
      height: 150,
      title: "Nội dung",
      isCanSort: true,
      align: "center",
      render: (_text: string, record: PostInterface, index: number) => {
        return (
          <p>
            {record.content && record.content.length >= 150
              ? record.content?.slice(0, 150) + "..."
              : record.content}
          </p>
        );
      },
    },
    {
      title: "Xuất bản",
      key: "ispublish",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: PostInterface, index: number) => {
        return (
          <>
            {record.isPublish ? (
              <CheckOutlined className="text-green-500" />
            ) : (
              <CloseOutlined className="text-red-500" />
            )}
          </>
        );
      },
    },
    {
      title: "Ngôn ngữ",
      key: "language",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: PostInterface, index: number) => {
        const languageLocal = localStorage.getItem("language");
        const languages: ILanguage[] = languageLocal
          ? JSON.parse(languageLocal)
          : [];
        const lang = languages.find((f) => f.code === record.language);
        return <p>{lang && lang.name}</p>;
      },
    },
    {
      title: "Tạo bởi",
      key: "createdBy",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: PostInterface, index: number) => {
        return <p>{get(record, "createdBy.username")}</p>;
      },
    },
    {
      key: "updatedBy",
      title: "Cập nhật bởi",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: PostInterface, index: number) => {
        return <p>{get(record, "updatedBy.username")}</p>;
      },
    },
    {
      key: "updatedAt",
      title: "Ngày Cập nhật",
      align: "center",
      isCanSort: true,
      render: (_text: string, record: PostInterface, index: number) => {
        return <p> {formatDate(record.createdAt)} </p>;
      },
    },
    {
      title: "Sắp xếp",
      key: "indexSort",
      align: "center",
      isCanSort: true,
    },
    {
      title: "",
      key: "action",
      align: "right" as "right",
      render: (_text: string, record: PostInterface, index: number) => {
        return (
          <Dropdown
            className="cursor-pointer"
            key={`dr-${index}`}
            overlay={menu(record, index)}
          >
            <Kebab className="m-auto" />
          </Dropdown>
        );
      },
    },
  ];
  const postData = useAppSelector((state) => state.screens.post);
  const languageData = useAppSelector((state) => state.screens.language.data);
  const menu = (item: PostInterface, index: number) => {
    return (
      <Menu key={index}>
        {isPostUpdate && (
          <Menu.Item
            key={`ite-${index}`}
            icon={<EditOutlined className="text-orange-500" />}
          >
            <Link
              to={{
                key: "updatePost",
                pathname: "/post/update/" + (item.postLanguageId || item.id),
                search: `language=${item.language}`,
              }}
            >
              Chỉnh sửa
            </Link>
          </Menu.Item>
        )}
        {isPostPublish && item.isPublish ? (
          <Menu.Item
            key={`langua-${index}`}
            icon={<CloseOutlined className="text-red-500" />}
            onClick={() => onPublish(item.id, !item.isPublish)}
          >
            Ngừng xuất bản
          </Menu.Item>
        ) : isPostPublish && !item.isPublish ? (
          <Menu.Item
            key={`langua-${index}`}
            icon={<CheckOutlined className="text-green-500" />}
            onClick={() => onPublish(item.id, !item.isPublish)}
          >
            Xuất bản
          </Menu.Item>
        ) : null}
        {isPostDelete && (
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
  const refesh = async () => {
    dispatch(setLoadingAction(true));
    let categoryId;
    const query: any = getQuery();
    if (!languageData.length) await dispatch(getLanguagesAction({}) as any);
    const languages: ILanguage[] = languageData || [];

    const language = query.language || languages[0]?.code || "";
    if (language) {
      query.language = language;
    }

    if (location.pathname === "/product") {
      const result = await getCategories({ slug: "/product" });
      const category: ICategory[] = get(result, "data", []);
      const categoryIds = category.map((m) => m.id);
      if (categoryIds.length) {
        query["category"] = categoryIds[0];
        categoryId = categoryIds[0];
      }
    }
    const params = new URLSearchParams(query);
    history.replace({
      pathname: location.pathname,
      search: params.toString(),
    });
    dispatch(getPostsAction({ category: categoryId, ...query }) as any);
  };
  useEffectOnce(() => {
    isPostList && refesh();
    // dispatch(getPostsAction({ ...getQuery() }) as any);
  });

  useEffect(() => {
    if (postData.data) {
      setState(postData);
    }
  }, [postData]);

  const _confirmDelete = (item: PostInterface) => () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa bài viết?`,
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk() {
        const id = item.id ? item.id : 0;
        dispatch(deletePostAction({ id }) as any);
      },
    });
  };

  const _confirmDeleteList = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${listIdDelete.length} bài viết?`,
      icon: <ExclamationCircleOutlined />,
      // content: item.name,
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: async () => {
        for (const id of listIdDelete) {
          await dispatch(deletePostAction({ id }) as any);
        }
      },
    });
  };

  const _onChangePage = async (page: number) => {
    dispatch(getPostsAction({ ...getQuery(), page }) as any);
    setState({ ...state, currentPage: page });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setListIdDelete(selectedRowKeys);
      // setIsDelete(selectedRowKeys.length > 0);
    },
  };
  return (
    <>
      <Card
        title={
          <>
            <h3 className="text-xl"> {props.title || "Bài viết"}</h3>
          </>
        }
        className="rounded-none"
        extra={
          <>
            {listIdDelete.length > 0 && (
              <Button
                className="mr-3"
                type="primary"
                danger
                ghost
                onClick={() => _confirmDeleteList()}
              >
                {" "}
                Xóa
              </Button>
            )}
            {isPostCreate && (
              <Button type="primary" ghost>
                <Link
                  key="postCreate"
                  to={{
                    pathname: `/post/create`,
                    search:
                      location.pathname === "/product" ? `?slug=/product` : "",
                  }}
                  title="Create"
                >
                  Thêm mới
                </Link>
              </Button>
            )}
          </>
        }
      >
        {isPostList && (
          <Search>
            <SearchComponent
              {...props}
              filterCate={{
                slug: location.pathname === "/product" ? "/product" : "",
              }}
            />
          </Search>
        )}
        {isPostList && (
          <Table
            className="mt-3"
            rowSelection={
              isPostDelete
                ? {
                    type: "checkbox",
                    ...rowSelection,
                  }
                : undefined
            }
            dataSource={state.data}
            columns={header}
            pagination={{
              defaultPageSize: 10,
              total: state.count,
              showSizeChanger: false,
              onChange: _onChangePage,
            }}
            bordered
            // scroll={{ y: 400 }}
            rowKey={"id"}
          />
        )}
      </Card>
    </>
  );
}

export default PostPage;
