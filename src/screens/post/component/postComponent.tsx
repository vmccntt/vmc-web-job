import { useState } from "react";
import { cloneDeep, get, set } from "lodash";
import { PostInterface } from "../../../models/post";
import { Card, Form, Input, Divider, Button, Row, Col, Switch } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CategorySelectTreeComponent from "../../../Layout/CategorySelectTree";
import UploadImgComponent from "../../../Layout/uploadImg";
import PostHistoryPage from "../../postHistory/component";
import { FileTypeEnum } from "../../../utils/enum";
import "./quill.scss";
import { useEffectOnce } from "react-use";
import { IUserState } from "../../user/propState";
import { useAppSelector } from "../../../app/hooks";
import { PERMISSION_ENUM } from "../../../utils/permisson.enum";
import { isCheckPermisson } from "../../../utils";
import Tinymce from "../../../Layout/TyniMce";

const { TextArea } = Input;
const PostComponent = (props: any) => {
  const param = new URLSearchParams(props.location.search);
  const slug = param.get("slug") || "";
  const history = useHistory();
  const [form] = Form.useForm();
  form.setFieldsValue(props.postInit);
  const [post, setPost] = useState<PostInterface>(props.postInit);
  const [slugPost] = useState<string>(slug);
  const [isHistory, setIsHistory] = useState<boolean>(false);
  const { id }: any = useParams();

  const goBack = () => {
    history.goBack();
  };

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isPostPublish = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.POST_ISPUBLISH
  );

  const _onFinish = async () => {
    props.onSubmit(props.postList);
    // _onSubmitCourse();
  };
  useEffectOnce(() => {
    setPost({ ...post, ...props.postInit });
  });
  const onChangeHtml = (html: string) => {
    props.onChange(props.postList, html, "contentHtmlCoppy", props.index);
  };

  return (
    <>
      <Card>
        <Form
          className="form-create-currency row"
          form={form}
          layout="vertical"
          onFinish={_onFinish}
        >
          <Row gutter={10} className="m-0">
            <Col xl={8}>
              <Form.Item
                name="name"
                label={
                  slugPost === "/product" ? "Tên sản phẩm" : "Tên bài viết"
                }
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập ${
                      slugPost === "/product" ? "tên sản phẩm" : "tên bài viết"
                    } `,
                  },
                ]}
              >
                <Input
                  value={props.postInit.name}
                  name={props.postInit.name}
                  onChange={(e) =>
                    props.onChange(
                      props.postList,
                      e.target.value,
                      "name",
                      props.index
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={8}>
              <Form.Item
                name="title"
                label={
                  slugPost === "/product"
                    ? "Tiêu đề sản phẩm"
                    : "Tiêu đề bài viết"
                }
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập ${
                      slugPost === "/product"
                        ? "tiêu đề sản phẩm"
                        : "tiêu đề bài viết"
                    }`,
                  },
                ]}
              >
                <Input
                  value={props.postInit.title}
                  name={props.postInit.title}
                  onChange={(e) =>
                    props.onChange(
                      props.postList,
                      e.target.value,
                      "title",
                      props.index
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4}>
              <Form.Item name="isPublish" label="Danh mục">
                <CategorySelectTreeComponent
                  categoryId={props.postInit.category}
                  filter={{ slug }}
                  onSelect={(value) =>
                    props.onCommon(props.postList, value, "category")
                  }
                  languagesOther={
                    slug !== "/product"
                      ? [
                          {
                            title: "Danh mục gốc",
                            value: "null",
                          },
                        ]
                      : []
                  }
                  onClear={() =>
                    props.onCommon(props.postList, undefined, "category")
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={2}>
              <Form.Item
                className="post-isPubish text-center"
                name="isPublish"
                label="Xuất&nbsp;bản"
                // className="text-center"
              >
                <Switch
                  className="bg-gray-600"
                  checked={props.postInit.isPublish}
                  disabled={!isPostPublish}
                  onChange={() =>
                    props.onCommon(
                      props.postList,
                      !props.postInit.isPublish,
                      "isPublish"
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={2}>
              <Form.Item name="indexSort" label="Sắp xếp">
                <Input
                  value={props.postInit.indexSort}
                  name={props.postInit.indexSort}
                  onChange={(e) =>
                    props.onCommon(props.postList, e.target.value, "indexSort")
                  }
                />
              </Form.Item>
            </Col>

            <Col xl={8} className="flex">
              <Form.Item name="icon" label="Ảnh bìa">
                <UploadImgComponent
                  className="post-upload"
                  keyPath={"icon"}
                  setImg={(icon) =>
                    props.onCommon(props.postList, icon, "icon")
                  }
                  url={props.postInit.icon}
                  type={FileTypeEnum.POST}
                />
              </Form.Item>
              <Form.Item
                name="icon"
                label="Liên kết ảnh bìa"
                className="w-full"
              >
                <Input
                  className="break-words break-all"
                  style={{
                    minHeight: "102px",
                  }}
                  value={props.postInit.icon}
                  onChange={(e) =>
                    props.onCommon(props.postList, e.target.value, "icon")
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={16}>
              <Form.Item name="content" label="Mô tả" className="w-full">
                <TextArea
                  style={{
                    minHeight: "102px",
                  }}
                  className="h-24 important min-h-full w-full"
                  value={props.postInit.content}
                  name={props.postInit.content}
                  onChange={(e) =>
                    props.onChange(
                      props.postList,
                      e.target.value,
                      "content",
                      props.index
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={24}>
              <Tinymce
                initialValue={props.postInit.contentHtml}
                onChangeHtml={onChangeHtml}
              />
            </Col>

            <Divider className="mt-0" />
            <Col xl={24}>
              <Button type="primary" ghost htmlType="submit">
                {id ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button onClick={goBack} danger className="ml-3">
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      {id && (
        <Card
          className="mt-3"
          title="Lịch sử chỉnh sửa"
          extra={
            !isHistory ? (
              <EyeOutlined
                className=" text-green-600 text-xl cursor-pointer"
                onClick={() => setIsHistory(!isHistory)}
              />
            ) : (
              <EyeInvisibleOutlined
                color="#ff4b2b"
                className="text-red-600 text-xl cursor-pointer"
                onClick={() => setIsHistory(!isHistory)}
              />
            )
          }
        >
          {isHistory && <PostHistoryPage postId={id} />}
        </Card>
      )}
    </>
  );
};

export default PostComponent;
