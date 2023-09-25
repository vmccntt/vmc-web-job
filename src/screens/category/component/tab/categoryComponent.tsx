import { useEffect, useMemo, useState } from "react";
import { cloneDeep, debounce, get, set } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../app/hooks";
import "../../styles.scss";
import {
  Card,
  Form,
  Input,
  Divider,
  Button,
  Row,
  Col,
  Select,
  Switch,
  Modal,
} from "antd";

import { useHistory, useParams } from "react-router";
import { EyeOutlined } from "@ant-design/icons";
import { useAsyncFn, useEffectOnce } from "react-use";
import { getBanners } from "../../../banner/services";
import { BannerInterface, ISearchBanner } from "../../../banner/banner.model";
import CategorySelectTreeComponent from "../../../../Layout/CategorySelectTree";
import UploadImgComponent from "../../../../Layout/uploadImg";
import { FileTypeEnum } from "../../../../utils/enum";
import type { SelectProps } from "antd";
import DisplayTypeComponent from "../../../../Layout/DisplayType";
import { DisplayTypeCategory } from "../../../../utils/displayType";

const optionsDisplay: SelectProps["options"] = DisplayTypeCategory;

const { Option } = Select;
const { TextArea } = Input;

const CreateCategoryComponent = (props: any) => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  form.setFieldsValue(props.categoryInit);
  const [displayTypeCategoryData, setDisplayTypeCategoryData] =
    useState(DisplayTypeCategory);
  const { id }: any = useParams();

  const [bannerState, bannerStateFn] = useAsyncFn(
    async (params: ISearchBanner) => {
      return getBanners(params);
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const debounceLoadBanner = useMemo(
    () => debounce((query: ISearchBanner) => bannerStateFn(query), 500),
    [bannerStateFn]
  );
  //#endregion declare

  //#region useEffect

  const _renderBannerOptions = () => {
    const elements: JSX.Element[] = [];

    const banners: BannerInterface[] = get(bannerState, "value.data", []);
    const bannerIds: BannerInterface[] = get(bannerState, "value.data", []);
    let bannerList = [...banners.filter((m) => m.id !== id)];
    if (
      get(bannerIds, "[0].id") &&
      !banners.find((b) => b.id === bannerIds[0].id)
    ) {
      bannerList = [...bannerIds, ...banners];
    }
    bannerList.forEach((category) => {
      elements.push(
        <Option name={category.name} key={category.id} value={category.id}>
          {category.name}
        </Option>
      );
    });
    return elements;
  };

  const onChangeUrl = (value: any, path: string) => {
    props.onCommonPoint(value, path, props.commonPoint, props.languageDetail);
  };
  const selectedCategory = (parentId: string) => {
    props.onCommonPoint(
      parentId,
      "parentId",
      props.commonPoint,
      props.languageDetail
    );
    // setCategory({ ...category, parentId });
  };
  const onClearCategory = () => {
    props.onCommonPoint(
      undefined,
      "parentId",
      props.commonPoint,
      props.languageDetail
    );
    // setCategory({ ...category, parentId });
  };
  const selectedBanner = (bannerId: number) => {
    props.onCommonPoint(
      bannerId,
      "bannerId",
      props.commonPoint,
      props.languageDetail
    );
    // setCategory({ ...category, bannerId });s
  };

  const goBack = () => {
    history.goBack();
  };

  const _onFinish = async () => {
    // _onSubmitCourse();
    props.onSubmit(props.languageDetail, props.commonPoint);
  };

  useEffectOnce(() => {
    bannerStateFn({});
  });
  useEffect(() => {}, [dispatch, id]);

  const typeArray = new Array(50).fill(0).map((item, index) => ({
    value: index + 1,
    label: index + 1,
  }));
  const onSearchDisplayTypeCategoryData = (search: string) => {
    let newData = cloneDeep(displayTypeCategoryData);
    newData = newData.filter((type) => type.label.includes(search));
    setDisplayTypeCategoryData(newData);
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
            <Col xl={12}>
              <Form.Item
                label="Tên danh mục"
                name="title"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập tên danh mục`,
                  },
                ]}
              >
                <Input
                  value={props.categoryInit.title}
                  name={props.categoryInit.title}
                  onChange={(e) =>
                    props.setPostListIndex(
                      e.target.value,
                      "title",
                      props.categoryInit.language,
                      props.languageDetail,
                      props.commonPoint
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Col xl={4}>
              <Form.Item label="Danh mục cha">
                <CategorySelectTreeComponent
                  categoryId={props.commonPoint.parentId}
                  onSelect={selectedCategory}
                  onClear={onClearCategory}
                />
              </Form.Item>
            </Col>
            <Col xl={4}>
              <Form.Item label="Trình chiếu">
                <Select
                  optionFilterProp="name"
                  className="w-full"
                  onSelect={selectedBanner}
                  // onClear={clearBrand}
                  allowClear
                  value={props.commonPoint.bannerId}
                  showSearch
                  onSearch={(name: string) => debounceLoadBanner({ name })}
                >
                  {_renderBannerOptions()}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={4}>
              <Form.Item label="Thứ tự sắp xếp">
                <Input
                  value={props.commonPoint.indexSort}
                  name={props.commonPoint.indexSort}
                  onChange={(e) =>
                    props.onCommonPoint(
                      e.target.value,
                      "indexSort",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={8}>
              <Form.Item label="Đường dẫn">
                <Input
                  value={props.commonPoint.slug}
                  name={props.commonPoint.slug}
                  onChange={(e) =>
                    props.onCommonPoint(
                      e.target.value,
                      "slug",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} className="flex">
              <Form.Item label="Kiểu hiển thị" className="w-full pr-2">
                <Select
                  defaultValue=""
                  className="w-full"
                  value={props.commonPoint.type}
                  showSearch
                  // onSearch={(name: string) =>
                  //   onSearchDisplayTypeCategoryData(name)
                  // }
                  filterOption={(inputValue, option) =>
                    (option &&
                      option.label &&
                      option?.label
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())) ||
                    false
                  }
                  onChange={(value) =>
                    props.onCommonPoint(
                      value,
                      "type",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                  options={optionsDisplay}
                ></Select>
              </Form.Item>
              <EyeOutlined
                className="m-auto text-2xl text-teal-600 cursor-pointer"
                onClick={showModal}
              />
            </Col>
            <Col xl={4} className="text-center">
              <Form.Item label="Là menu" className="switch-label-center">
                <Switch
                  className="bg-gray-600"
                  checked={props.commonPoint.isMenu}
                  onChange={() =>
                    props.onCommonPoint(
                      !props.categoryInit.isMenu,
                      "isMenu",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={4} className="text-center">
              <Form.Item label="Là trang chủ" className="switch-label-center">
                <Switch
                  className="bg-gray-600"
                  checked={props.commonPoint.isHome}
                  onChange={() =>
                    props.onCommonPoint(
                      !props.commonPoint.isHome,
                      "isHome",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Col xl={4} className="text-center">
              <Form.Item
                label="Hiển thị trang chủ"
                className="switch-label-center"
              >
                <Switch
                  className="bg-gray-600"
                  checked={props.commonPoint.isHomePage}
                  onChange={() =>
                    props.onCommonPoint(
                      !props.commonPoint.isHomePage,
                      "isHomePage",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={8} className="flex gap-3">
              <div className="w-24">
                <Form.Item label="Icon">
                  <UploadImgComponent
                    url={props.commonPoint.url}
                    setImg={onChangeUrl}
                    keyPath="url"
                    type={FileTypeEnum.ICON}
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item label="Liên kết icon">
                  <Input
                    style={{
                      minHeight: "102px",
                    }}
                    value={props.commonPoint.url}
                    name={props.commonPoint.url}
                    onChange={(e) => onChangeUrl(e.target.value, "url")}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col xl={16}>
              <Form.Item label="Mô tả">
                <TextArea
                  style={{ minHeight: "102px" }}
                  value={props.commonPoint.description}
                  name={props.commonPoint.description}
                  onChange={(e) =>
                    props.onCommonPoint(
                      e.target.value,
                      "description",
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Divider className="mt-0" />

            <Col xl={24}>
              <Button type="primary" ghost htmlType="submit">
                {!id ? "Thêm mới" : "Cập nhật"}
              </Button>
              <Button onClick={goBack} danger className="ml-3">
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal
        style={{ top: "50px" }}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        width={"80%"}
        title="Danh sách kiểu hiển thị"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DisplayTypeComponent />
      </Modal>
    </>
  );
};

export default CreateCategoryComponent;
