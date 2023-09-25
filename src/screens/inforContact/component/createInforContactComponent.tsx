import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Row, Switch } from "antd";
import { cloneDeep, get, update } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { InforContactAction } from "../inforContact.model";

import { useEffectOnce } from "react-use";

const CreateInforContactComponent = (props: any) => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [dataAction, setDataAction] = useState<InforContactAction>({
    address: [""],
  });
  const { id }: any = useParams();
  //#endregion declare

  const goBack = () => {
    history.goBack();
  };

  const addAdress = () => {
    const newData = cloneDeep(dataAction);
    newData.address?.push("");
    setDataAction(newData);
    props.setInforContactListIndex(
      newData.address,
      "address",
      props.inforContactInit.language,
      props.languageDetail,
      props.commonPoint
    )
  };
  const onRemoveAddress = (index: number) => {
    const newData = cloneDeep(dataAction);
    newData.address?.splice(index, 1);
    setDataAction(newData);
    props.setInforContactListIndex(
      newData.address,
      "address",
      props.inforContactInit.language,
      props.languageDetail,
      props.commonPoint
    )
  };
  const onChangeValue = (valueUp: any, path: string) => {
    const newData = cloneDeep({ ...dataAction });
    update(newData, path, function (value) {
      return valueUp;
    });
    setDataAction({ ...newData });
    props.setInforContactListIndex(
      newData.address,
      "address",
      props.inforContactInit.language,
      props.languageDetail,
      props.commonPoint
    )
  };
  const _onFinish = async () => {
    props.onSubmit(props.languageDetail, props.commonPoint);
  };

  useEffectOnce(() => {
    props.inforContactInit && form.setFieldsValue(props.inforContactInit);
    const address = get(props, "inforContactInit.address");
    if (address && Array.isArray(address)) {
      setDataAction({...dataAction, address});
      address.map((add: string, index: number) =>
        form.setFieldValue(`address.[${index}]`, add)
      );
    }
  });

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
            <Col xl={10} lg={10}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề",
                  },
                ]}
              >
                <Input
                  value={props.inforContactInit.title}
                  onChange={(e) =>
                    props.setInforContactListIndex(
                      e.target.value,
                      `title`,
                      props.inforContactInit.language,
                      props.languageDetail,
                      props.commonPoint
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                ]}
              >
                <Input
                  value={props.inforContactInit.email}
                  onChange={(e) =>
                    props.setInforContactListIndex(
                      e.target.value,
                      `email`,
                      props.inforContactInit.language,
                      props.languageDetail,
                      props.commonPoint
                    )
                  }
                />
              </Form.Item>
            </Col>

            <Col xl={6} lg={6}>
              <Form.Item
                label="Hotline"
                name="hotline"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Hotline",
                  },
                ]}
              >
                <Input
                  value={props.inforContactInit.hotline}
                  onChange={(e) =>
                    props.setInforContactListIndex(
                      e.target.value,
                      `hotline`,
                      props.inforContactInit.language,
                      props.languageDetail,
                      props.commonPoint
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={2} lg={2} className="text-center">
              <Form.Item label="Xuất bản" className="switch-label-center">
                <Switch
                  className="bg-gray-600"
                  checked={props.commonPoint.isActive}
                  onChange={() =>
                    props.onCommonPoint(
                      !props.commonPoint.isActive,
                      'isActive',
                      props.commonPoint,
                      props.languageDetail
                    )
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={24}>
              <Card title="Địa chỉ" className="mt-2">
                {dataAction &&
                  dataAction.address &&
                  Array.isArray(dataAction.address) &&
                  dataAction.address.map(
                    (item: string, index: number) => (
                      <Form.Item
                        className="w-full"
                        name={`address.[${index}]`}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập địa chỉ",
                          },
                        ]}
                      >
                        <div className="flex w-full">
                          <Input
                            className="w-full"
                            key={index}
                            value={item}
                            onChange={(e) =>
                              onChangeValue(
                                e.target.value,
                                `address[${index}]`
                              )
                            }
                          />
                          <MinusCircleOutlined
                            className="text-xl ml-2 cursor-pointer text-red-600"
                            onClick={() => onRemoveAddress(index)}
                          />
                        </div>
                      </Form.Item>
                    )
                  )}
                <Button
                  type="primary"
                  className="mt-2"
                  ghost
                  onClick={addAdress}
                >
                  Thêm
                </Button>
              </Card>
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

export default CreateInforContactComponent;
