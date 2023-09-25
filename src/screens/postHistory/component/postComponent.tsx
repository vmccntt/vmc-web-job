import { useEffect, useMemo, useState } from "react";
import { set, get, debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createPostAction, getPostDetail } from "../slice";
import { useAsyncFn, useEffectOnce } from "react-use";
import { Card, Form, Input, Divider, Button, Row, Col, Select } from "antd";
import Label from "../../../Layout/Form/Label";
import AnimateSider from "../../../Layout/sliders/animate-slider";
import { useHistory, useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ICategory, ISearchCategory } from "../../category/category.model";
import { getCategories } from "../../category/services";
import CategorySelectTreeComponent from "../../../Layout/CategorySelectTree";
import UploadImgComponent from "../../../Layout/uploadImg";
import PostPage from "../component";
import { PostHistoryInterface } from "../postHistory.model";

const { Option } = Select;
const { TextArea } = Input;
const PostComponent = () => {
  //#region declare
  const postInit: PostHistoryInterface = {
    name: "",
    icon: "",
    content: "",
    contentHtml: "",
    id: 1,
    title: "",
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const postData = useAppSelector((state) => state.screens.postHistory);
  const [form] = Form.useForm();
  const [post, setPost] = useState<PostHistoryInterface>({ ...postInit });
  const [isUploadImg, setUploadImg] = useState<boolean>(false);
  const [contentHtml, setContentHtml] = useState<string>();
  const { id }: any = useParams();
  const [categoriesState, categoriesStateFn] = useAsyncFn(
    async (params: ISearchCategory) => {
      return getCategories(params);
    }
  );
  const debounceLoadCategory = useMemo(
    () => debounce((query: ISearchCategory) => categoriesStateFn(query), 500),
    [categoriesStateFn]
  );
  //#endregion declare

  //#region useEffect

  const selectedCategory = (categoryId: string) => {
    setPost({ ...post, category: categoryId });
  };
  const onClearCategory = () => {
    setPost({ ...post, category: undefined });
  };

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...post, contentHtml } as PostHistoryInterface;
    await dispatch(
      createPostAction({
        post: body,
        type: !id ? "addNew" : null,
        id,
      }) as any
    );
    history.goBack();
  };
  const onChangePost = (value: any, path: string) => {
    const newPost = { ...post };
    set(newPost, path, value);
    setPost({ ...newPost });
  };

  const _onFinish = async () => {
    _onSubmitCourse();
  };

  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        await dispatch(getPostDetail({ id }) as any);
        setUploadImg(true);
      }
    };
    getDetail();
  }, [dispatch, id]);

  useEffect(() => {
    if (postData.detail && id) {
      setPost(postData.detail);
      setContentHtml(postData.detail.contentHtml);
    }
  }, [postData, id]);

  useEffectOnce(() => {
    categoriesStateFn({});
  });
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };
  const setImg = (icon: string) => {
    setPost({ ...post, icon });
  };
  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];
  const icon = "icon";
  return (
    <>
      <Card>
        <Form
          className="form-create-currency row"
          form={form}
          layout="vertical"
          onFinish={_onFinish}
        >
          <Row gutter={16}>
            <Col xl={8}>
              <Label title={`Tên bài viết`} />
              <Input
                value={post.name}
                name={post.name}
                onChange={(e) => onChangePost(e.target.value, "name")}
              />
            </Col>
            <Col xl={12}>
              <Label title="Tiêu đề" />
              <Input
                value={post.title}
                name={post.title}
                onChange={(e) => onChangePost(e.target.value, "title")}
              />
            </Col>
            <Col xl={4}>
              <Label title="Danh mục" />
              <CategorySelectTreeComponent
                categoryId={post.category}
                onSelect={selectedCategory}
                onClear={onClearCategory}
              />
            </Col>

            <Col xl={2}>
              <Label title="Ảnh bìa bài viết" />
              {((id && isUploadImg) || !id) && (
                <UploadImgComponent
                  className="post-upload"
                  keyPath={"icon"}
                  setImg={setImg}
                  url={post.icon}
                />
              )}
              {/* <Input
                value={post.icon}
                name={post.icon}
                onChange={(e) => onChangePost(e.target.value, "icon")}
              /> */}
            </Col>
            <Col xl={22}>
              <Label title="Mô tả" />
              <TextArea
                style={{
                  minHeight: "102px",
                }}
                className="h-24 important min-h-full"
                value={post.content}
                name={post.content}
                onChange={(e) => onChangePost(e.target.value, "content")}
              />
            </Col>
            <Col xl={24}>
              <Label title="Nội dung" />
              <ReactQuill
                theme="snow"
                value={contentHtml}
                formats={formats}
                modules={modules}
                onChange={(value: any) => setContentHtml(value)}
              />
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Button type="primary" ghost htmlType="submit">
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
            <Button onClick={goBack} danger className="ml-3">
              Hủy
            </Button>
          </Row>
        </Form>
      </Card>
      <Card title="Lịch sử chỉnh sửa">
        <PostPage />
      </Card>
    </>
  );
};

export default PostComponent;
