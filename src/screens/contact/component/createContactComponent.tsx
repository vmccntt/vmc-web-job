import { useEffect, useState } from "react";
import { update, cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createContactAction, getContactDetail } from "../slice";
import { IContact, IContactAction } from "../contact.model";
import { Card, Form, Input, Divider, Button, Row, Col, Select } from "antd";
import { useHistory, useParams } from "react-router";
import TextArea from "antd/es/input/TextArea";
import {
  INFOR_TYPE_ENUM,
  InforPurpose,
  InforPurposeEnum,
} from "../../../utils/enum";

const CreateContactComponent = () => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const dataReducer = useAppSelector((state) => state.screens.contact);
  const [form] = Form.useForm();
  const [dataAction, setDataAction] = useState<IContactAction>({
    name: "",
    content: "",
    phone: "",
  });
  const { id }: any = useParams();
  //#endregion declare

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...dataAction } as IContact;
    await dispatch(
      createContactAction({
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
         await dispatch(getContactDetail({ id }) as any);
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
  const typeOptions = [
    { label: "Đang chờ", value: INFOR_TYPE_ENUM.WAIT },
    { label: "Đã liên hệ", value: INFOR_TYPE_ENUM.CONTACTED },
    { label: "Hủy", value: INFOR_TYPE_ENUM.CANCEL },
  ];
  const InforPurposeOptions = [
    { label: InforPurpose.client, value: InforPurposeEnum.CLIENT },
    { label: InforPurpose.order, value: InforPurposeEnum.ORDER },
  ];
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
            <Col xl={8} lg={8}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên",
                  },
                ]}
              >
                <Input
                  value={dataAction.name}
                  onChange={(e) => onChangeValue(e.target.value, `name`)}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8}>
              <Form.Item
                label="Số điện thoại / email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Số điện thoại / email",
                  },
                ]}
              >
                <Input
                  value={dataAction.email}
                  onChange={(e) => onChangeValue(e.target.value, `email`)}
                />
              </Form.Item>
            </Col>
            <Col xl={4} lg={4}>
              <Form.Item
                label="Mục đích"
                name="purpose"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mục đích",
                  },
                ]}
              >
                <Select
                  className="w-full"
                  value={dataAction.purpose}
                  onChange={(value) => onChangeValue(value, `purpose`)}
                  options={InforPurposeOptions}
                />
              </Form.Item>
            </Col>
            <Col xl={4} lg={4}>
              <Form.Item label="Trạng thái">
                <Select
                  className="w-full"
                  value={dataAction.type}
                  defaultValue={INFOR_TYPE_ENUM.WAIT}
                  onChange={(value) => onChangeValue(value, `type`)}
                  options={typeOptions}
                />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item
                label="Công ty"
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập công ty",
                  },
                ]}
              >
                <TextArea
                  value={dataAction.company}
                  onChange={(e) => onChangeValue(e.target.value, `company`)}
                />
              </Form.Item>
            </Col>

            <Col lg={16}>
              <Form.Item
                label="Tin nhắn"
                name="content"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tin nhắn",
                  },
                ]}
              >
                <TextArea
                  value={dataAction.content}
                  onChange={(e) => onChangeValue(e.target.value, `content`)}
                />
              </Form.Item>
            </Col>
            <Divider className="mt-0" />
            <Col lg={24}>
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

export default CreateContactComponent;
