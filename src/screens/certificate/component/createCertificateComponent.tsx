import { useEffect, useState } from "react";
import { update, cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createUserAction, getUserDetail } from "../slice";
import { IPartner, IPartnerAction } from "../certificate.model";
import { Card, Form, Input, Divider, Button, Row, Col, Select } from "antd";
import Label from "../../../Layout/Form/Label";
import { useHistory, useParams } from "react-router";
import UploadImgComponent from "../../../Layout/uploadImg";
import TextArea from "antd/es/input/TextArea";

const CreateCertificateComponent = () => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const [isUploadImg, setUploadImg] = useState<boolean>(false);
  const dataReducer = useAppSelector((state) => state.screens.partner);
  const [form] = Form.useForm();
  const [dataAction, setDataAction] = useState<IPartnerAction>({});
  const { id }: any = useParams();
  //#endregion declare

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...dataAction } as IPartnerAction;
    await dispatch(
      createUserAction({
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
    if (id) {
      const detail = async () => {
        await dispatch(getUserDetail({ id }) as any);
        setUploadImg(true);
      };
      detail();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dataReducer.detail && id) {
      setDataAction(dataReducer.detail);
      form.setFieldsValue(dataReducer.detail);
    }
  }, [dataReducer, id, setDataAction, form]);
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
            <Col lg={{ span: 24 }}>
              <Form.Item
                label="Tên chứng chỉ"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập tên chứng chỉ`,
                  },
                ]}
              >
                <Input
                  value={dataAction.name}
                  onChange={(e) => onChangeValue(e.target.value, `name`)}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 24 }}>
              <Form.Item label="Mô tả">
                <TextArea
                  value={dataAction.description}
                  onChange={(e) => onChangeValue(e.target.value, `description`)}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 24 }}>
              <Row>
                <Col xl={2} lg={2} md={2} sm={2}>
                  <Form.Item label="Ảnh chứng chỉ">
                    {((id && isUploadImg) || !id) && (
                      <UploadImgComponent
                        className="partner-upload w-full"
                        keyPath="image"
                        setImg={onChangeValue}
                        url={dataAction.image}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={22} lg={22} md={22} sm={22}>
                  <Form.Item label="Liên kết ảnh">
                    <Input
                      className="h-26"
                      value={dataAction.image}
                      onChange={(e) => onChangeValue(e.target.value, `image`)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Divider className="mt-0" />
            <Col>
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

export default CreateCertificateComponent;
