import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsAction } from "./slice";
import "./styles.scss";
import {  Table, Image } from "antd";
import { useAppSelector } from "../../app/hooks";
import SearchComponent from "./component/searchComponent";

// import {
//   EditOutlined,
//   DeleteOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import {deletePostAction } from "./slice";
// import { Link } from "react-router-dom";
import { get } from "lodash";
import { PostHistoryInterface } from "./postHistory.model";
import { formatDate } from "../../utils";

// const { confirm } = Modal;

function PostHistoryPage({ postId }: { postId?: string }) {
  const dispatch = useDispatch();
  const [state, setState] = useState<any>({
    data: [],
    count: 0,
    currentPage: 1,
  });
  const header: any = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      align: "left",
    },
    {
      title: "Tên bài viết",
      key: "name",
      dataIndex: "name",
      align: "left",
    },
    {
      title: "Tiêu đề bài viết",
      key: "title",
      dataIndex: "title",
      align: "left",
    },
    {
      title: "Ảnh bìa",
      key: "icon",
      align: "center",
      render: (_text: string, record: PostHistoryInterface, index: number) => {
        return <Image src={record.icon} height={50} width={100} />;
      },
    },
    {
      key: "Content",
      dataIndex: "content",
      title: "Nội dung",
      isCanSort: true,
    },
    {
      title: "Tạo bởi",
      key: "createdBy",
      isCanSort: true,
      render: (_text: string, record: PostHistoryInterface, index: number) => {
        return (
          <p>
            {" "}
            {get(record, "createdBy.firstName")}{" "}
            {get(record, "createdBy.lastName")}{" "}
          </p>
        );
      },
    },
    {
      key: "updatedBy",
      title: "Cập nhật bởi",
      isCanSort: true,
      render: (_text: string, record: PostHistoryInterface, index: number) => {
        return (
          <p>
            {" "}
            {get(record, "updatedBy.firstName")}{" "}
            {get(record, "updatedBy.lastName")}{" "}
          </p>
        );
      },
    },
    {
      key: "updatedAt",
      title: "Ngày Cập nhật",
      isCanSort: true,
      render: (_text: string, record: PostHistoryInterface, index: number) => {
        return <p> {formatDate(record.updatedAt)} </p>;
      },
    },
    // {
    //   title: "",
    //   key: "action",
    //   align: "right" as "right",
    //   render: (_text: string, record: PostHistoryInterface, index: number) => {
    //     return (
    //       <Dropdown key={`dr-${index}`} overlay={menu(record, index)} className="cursor-pointer">
    //         <Kebab />
    //       </Dropdown>
    //     );
    //   },
    // },
  ];
  const postData = useAppSelector((state) => state.screens.postHistory);
  useEffect(() => {
    dispatch(getPostsAction({ postId }) as any);
  }, [dispatch, postId]);

  useEffect(() => {
    if (postData.data) {
      setState(postData);
    }
  }, [postData]);

  // const _confirmDelete = (item: PostHistoryInterface) => () => {
  //   confirm({
  //     title: `Bạn có chắc chắn muốn xóa bài viết?`,
  //     icon: <ExclamationCircleOutlined />,
  //     content: item.name,
  //     okText: "Đồng ý",
  //     cancelText: "Hủy",
  //     onOk() {
  //       const id = item.id ? item.id : 0;
  //       dispatch(deletePostAction({ id }) as any);
  //     },
  //   });
  // };

  const _onChangePage = async (page: number) => {
    dispatch(getPostsAction({ page }) as any);
    setState({ ...state, currentPage: page });
  };

  return (
    <>
      <SearchComponent />
      {/* <CreatePostComponent /> */}
      <Table
        dataSource={state.data}
        columns={header}
        pagination={{
          defaultPageSize: 10,
          total: state.count,
          showSizeChanger: false,
          onChange: _onChangePage,
        }}
        rowKey={"id"}
      />
    </>
  );
}

export default PostHistoryPage;
