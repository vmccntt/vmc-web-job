import { useEffect, useState } from "react";
import { update, cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createLanguageAction, getLanguageDetail } from "../slice";
import { ILanguage, ILanguageAction } from "../language.model";
import { Card, Form, Input, Divider, Button, Row, Col, Switch } from "antd";
import { useHistory, useParams } from "react-router";
import UploadImgComponent from "../../../Layout/uploadImg";
import { FileTypeEnum } from "../../../utils/enum";
import TextArea from "antd/es/input/TextArea";

const CreateLanguageComponent = () => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const dataReducer = useAppSelector((state) => state.screens.language);
  const [form] = Form.useForm();
  const [dataAction, setDataAction] = useState<ILanguageAction>({});
  const [isUploadImg, setUploadImg] = useState<boolean>(false);
  const { id }: any = useParams();
  //#endregion declare

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...dataAction } as ILanguage;
    await dispatch(
      createLanguageAction({
        body,
        type: !id ? "addNew" : null,
        id,
      }) as any
    );
    history.goBack();
  };
  const onChangeValue = (valueUp: any, path: string) => {
    const newData = cloneDeep({ ...dataAction });
    update(newData, path, function (value) {
      return valueUp;
    });
    setDataAction({ ...newData });
  };
  const _onFinish = async () => {
    _onSubmitCourse();
  };

  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        await dispatch(getLanguageDetail({ id }) as any);
        setUploadImg(true);
      }
    };
    getDetail();
  }, [dispatch, id]);

  useEffect(() => {
    if (dataReducer.detail && id) {
      setDataAction(dataReducer.detail);
      form.setFieldsValue(dataReducer.detail);
    }
  }, [dataReducer, id, form]);
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
            <Col lg={12}>
              <Form.Item
                label="Tên ngôn ngữ"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên ngôn ngữ",
                  },
                ]}
              >
                <Input
                  value={dataAction.name}
                  onChange={(e) => onChangeValue(e.target.value, `name`)}
                />
              </Form.Item>
            </Col>
            <Col lg={10}>
              <Form.Item
                label="Mã ngôn ngữ"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã ngôn ngữ",
                  },
                ]}
              >
                <Input
                  value={dataAction.code}
                  onChange={(e) => onChangeValue(e.target.value, `code`)}
                  disabled={!!id}
                />
              </Form.Item>
            </Col>
            <Col lg={2}>
              <Form.Item
                className="text-center switch-label-center"
                label="Mặc định"
                name="isDefault"
              >
                <Switch
                  className="bg-gray-600"
                  checked={dataAction.isDefault}
                  onChange={() =>
                    onChangeValue(!dataAction.isDefault, `isDefault`)
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item label="Mô tả">
                <TextArea
                  value={dataAction.description}
                  onChange={(e) => onChangeValue(e.target.value, `description`)}
                />
              </Form.Item>
            </Col>
            <Col xl={24}>
              <Row>
                <Col xl={{ span: 24 }} className="flex">
                  <div>
                    <Form.Item label="Quốc kỳ">
                      {((id && isUploadImg) || !id) && (
                        <UploadImgComponent
                          url={dataAction.image}
                          setImg={onChangeValue}
                          keyPath="image"
                          type={FileTypeEnum.IMAGE}
                        />
                      )}
                    </Form.Item>
                  </div>
                  <div className="w-full">
                    <Form.Item label="Liên kết ảnh quốc kỳ">
                      <Input
                        className="w-full h-26"
                        value={dataAction.image}
                        onChange={(e) => onChangeValue(e.target.value, `image`)}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col xl={24}>
              <Button type="primary" ghost htmlType="submit">
                {id ? "Cập nhật" : "Thêm mới"}
              </Button>
              <Button className="ml-3" danger onClick={goBack}>
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default CreateLanguageComponent;
