import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table
} from "antd";
import { cloneDeep, get, set } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useEffectOnce } from "react-use";
import { setLoadingAction } from "../../../app/commonSlice";
import { useAppSelector } from "../../../app/hooks";
import { isCheckPermisson } from "../../../utils";
import {
  LABLE_MODULE_ENUM,
  ModulePermisson,
  PERMISSION_ENUM,
} from "../../../utils/permisson.enum";
import { IUserState } from "../../user/propState";
import { IUserAction } from "../../user/user.model";
import { IRoleGroupModel } from "../role.model";
import { getRoleDetail } from "../services";
import { createRoleAction } from "../slice";

const CreateUserComponent = () => {
  //#region declare

  const history = useHistory();

  const dispatch = useDispatch();
  const dataReducer = useAppSelector((state) => state.screens.user);
  const [form] = Form.useForm();

  const [dataAction, setDataAction] = useState<IUserAction>({});
  const dataPermission: IRoleGroupModel = {
    label: "",
    value: "",
    roles: ModulePermisson.map((module) => ({
      label: LABLE_MODULE_ENUM[module],
      module,
      permission: {
        list: false,
        create: false,
        update: false,
        delete: false,
        isPublish: false,
      },
    })),
  };
  const [data, setData] = useState<IRoleGroupModel>(dataPermission);

  const { id }: any = useParams();
  //#endregion declare

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isUserUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.USER_UPDATE
  );

  const onChangeData = (value: any, path: string) => {
    const newData: any = cloneDeep(data);
    set(newData, path, value);
    setData(newData);
    form.setFieldsValue(newData);
  };
  const goBack = () => {
    history.goBack();
  };

  const _onFinish = async () => {
    const body = {
      ...data,
    } as IRoleGroupModel;
    await dispatch(
      createRoleAction({
        body,
        type: !id ? "addNew" : null,
        id,
      }) as any
    );
    history.goBack();
  };

  useEffectOnce(() => {
    form.setFieldsValue(dataPermission);
    const getDetail = async () => {
      if (id) {
        dispatch(setLoadingAction(true));
        const respon = await getRoleDetail(id);
        const dataDetailt = respon.data;
        if (dataDetailt) {
          const newData = cloneDeep(data);
          newData.label = dataDetailt.label;
          newData.value = dataDetailt.value;
          if (dataDetailt.roles) {
            newData.roles = dataDetailt.roles;
          }
          setData(newData);
          form.setFieldsValue(newData);
        }
        dispatch(setLoadingAction(false));
      }
    };
    getDetail();
  });

  const header: any = [
    {
      title: "Module",
      key: "label",
      dataIndex: "label",
      align: "center",
    },
    {
      title: "Xem danh sách",
      key: "permission.list",
      dataIndex: "permission.list",
      width: "15%",
      align: "center",
      render: (_text: string, record: any, index: number) => {
        return (
          <Checkbox
            checked={get(record, "permission.list")}
            value={get(record, "permission.list")}
            onChange={(e) =>
              onChangeData(!e.target.value, `roles[${index}].permission.list`)
            }
          />
        );
      },
    },
    {
      title: "Thêm",
      key: "permission.create",
      dataIndex: "permission.create",
      width: "15%",
      align: "center",
      render: (_text: string, record: any, index: number) => {
        return (
          <Checkbox
            checked={get(record, "permission.create")}
            value={get(record, "permission.create")}
            onChange={(e) =>
              onChangeData(!e.target.value, `roles[${index}].permission.create`)
            }
          />
        );
      },
    },
    {
      title: "Sửa",
      key: "permission.update",
      dataIndex: "permission.update",
      align: "center",
      width: "15%",
      render: (_text: string, record: any, index: number) => {
        return (
          <Checkbox
            checked={get(record, "permission.update")}
            value={get(record, "permission.update")}
            onChange={(e) =>
              onChangeData(!e.target.value, `roles[${index}].permission.update`)
            }
          />
        );
      },
    },
    {
      title: "Xóa",
      key: "permission.delete",
      dataIndex: "permission.delete",
      align: "center",
      width: "15%",
      render: (_text: string, record: any, index: number) => {
        return (
          <Checkbox
            checked={get(record, "permission.delete")}
            value={get(record, "permission.delete")}
            onChange={(e) =>
              onChangeData(!e.target.value, `roles[${index}].permission.delete`)
            }
          />
        );
      },
    },
    {
      title: "Xuất bản",
      key: "permission.isPublish",
      dataIndex: "permission.isPublish",
      width: "15%",
      align: "center",
      render: (_text: string, record: any, index: number) => {
        return (
          <Checkbox
            checked={get(record, "permission.isPublish")}
            value={get(record, "permission.isPublish")}
            onChange={(e) =>
              onChangeData(
                !e.target.value,
                `roles[${index}].permission.isPublish`
              )
            }
          />
        );
      },
    },
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
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Tên nhóm quyền"
                name="label"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhóm quyền",
                  },
                ]}
              >
                <Input
                  value={data.label}
                  onChange={(e) => onChangeData(e.target.value, `label`)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mã nhóm quyền"
                name="value"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã nhóm quyền",
                  },
                ]}
              >
                <Input
                  value={data.value}
                  onChange={(e) => onChangeData(e.target.value, `value`)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Table
                dataSource={data.roles || []}
                pagination={false}
                columns={header}
                rowKey={"module"}
                bordered
              />
            </Col>
            <Divider className="mt-3" />
            <Col>
              {isUserUpdate && (
                <Button type="primary" ghost htmlType="submit">
                  {id ? "Cập nhật" : "Thêm mới"}
                </Button>
              )}
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

export default CreateUserComponent;
