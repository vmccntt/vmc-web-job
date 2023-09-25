import { useEffect, useState } from "react";
import { update, cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createUserAction, getUserDetail } from "../slice";
import { IUser, IUserAction } from "../user.model";
import { Card, Form, Input, Divider, Button, Row, Col, Select } from "antd";
import { useHistory, useParams, useLocation } from "react-router";
import UploadImgComponent from "../../../Layout/uploadImg";
import { FileTypeEnum, GenderEnum } from "../../../utils/enum";
import { REGEX, isCheckPermisson } from "../../../utils";
import RoleSelectComponent from "../../../Layout/RoleGroupSelect";
import { IUserState } from "../propState";
import { PERMISSION_ENUM } from "../../../utils/permisson.enum";

const CreateUserComponent = () => {
  //#region declare

  const history = useHistory();

  const dispatch = useDispatch();
  const dataReducer = useAppSelector((state) => state.screens.user);
  const [form] = Form.useForm();
  const [dataAction, setDataAction] = useState<IUserAction>({});
  const [isUploadImg, setUploadImg] = useState<boolean>(false);
  const { id }: any = useParams();
  const location = useLocation();
  //#endregion declare
  const pathProfile = `/user/profile/${id}`;

  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;
  const isUserUpdate = isCheckPermisson(
    permissionObj,
    PERMISSION_ENUM.USER_UPDATE
  );

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...dataAction } as IUser;
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
    form.setFieldsValue(newData);
    setDataAction({ ...newData });
  };
  const onSelectRole = (role: string) => {
    onChangeValue(role, "role");
  };
  const onClearRole = () => {
    onChangeValue(undefined, "role");
  };
  const _onFinish = async () => {
    _onSubmitCourse();
  };

  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        await dispatch(getUserDetail({ id }) as any);
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
            <Col lg={6}>
              <Form.Item label="Họ và tên đệm">
                <Input
                  value={dataAction.firstName}
                  onChange={(e) => onChangeValue(e.target.value, `firstName`)}
                />
              </Form.Item>
            </Col>
            <Col lg={6}>
              <Form.Item
                label="Tên người dùng"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên người dùng",
                  },
                ]}
              >
                <Input
                  value={dataAction.lastName}
                  onChange={(e) => onChangeValue(e.target.value, `lastName`)}
                />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    pattern: dataAction.phoneNumber
                      ? REGEX.phoneNumber
                      : undefined,
                    message: "Số điện thoại không đúng định dạng",
                  },
                ]}
              >
                <Input
                  value={dataAction.phoneNumber}
                  onChange={(e) => onChangeValue(e.target.value, `phoneNumber`)}
                />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item label="Giới tính">
                <Select
                  optionFilterProp="name"
                  className="w-full"
                  onSelect={(value) => onChangeValue(value, "gender")}
                  // onClear={clearBrand}
                  allowClear
                  value={dataAction.gender}
                  options={[
                    {
                      label: "--",
                      value: "",
                    },
                    {
                      label: "Nam",
                      value: GenderEnum.MALE,
                    },
                    {
                      label: "Nữ",
                      value: GenderEnum.FEMALE,
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item
                label="Vai trò"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vai trò",
                  },
                ]}
              >
                <RoleSelectComponent
                  role={dataAction.role}
                  disabled={pathProfile === location.pathname}
                  onSelect={onSelectRole}
                  onClear={onClearRole}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập",
                  },
                ]}
              >
                <Input
                  value={dataAction.username}
                  onChange={(e) => onChangeValue(e.target.value, `username`)}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    pattern: dataAction.email ? REGEX.email : undefined,
                    message: "Email không đúng định dạng",
                  },
                ]}
              >
                <Input
                  value={dataAction.email}
                  onChange={(e) => onChangeValue(e.target.value, `email`)}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: !id ? true : false,
                    message: "Vui lòng nhập vào mật khẩu",
                  },
                  {
                    pattern: dataAction.password ? REGEX.passWord : undefined,
                    message: (
                      <span>
                        <p>- Mật khẩu phải có ít nhất:</p>
                        <p> + Độ dài 8 ký tự</p>
                        <p> + Một chữ cái in hoa</p>
                        <p> + Một chữ cái thường</p>
                        <p> + Một chữ số</p>
                        <p> + Một ký tự đặc biệt</p>
                      </span>
                    ),
                  },
                ]}
              >
                <Input
                  type="password"
                  value={dataAction.password}
                  onChange={(e) => onChangeValue(e.target.value, `password`)}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                label="Nhập lại mật khẩu"
                name="passwordConfirm"
                rules={[
                  {
                    required: !id || dataAction.password ? true : false,
                    message: "Vui lòng nhập mật khẩu",
                  },
                  {
                    validator(rule, value, callback) {
                      if (
                        dataAction.password &&
                        value !== dataAction.password
                      ) {
                        callback(`Vui lòng nhập lại mật khẩu`);
                      } else {
                        callback();
                      }
                    },
                    message: "Mật khẩu không đúng",
                  },
                ]}
              >
                <Input
                  type="password"
                  value={dataAction.passwordConfirm}
                  onChange={(e) =>
                    onChangeValue(e.target.value, `passwordConfirm`)
                  }
                />
              </Form.Item>
            </Col>
            <Col xl={12}>
              <Row>
                <Col xl={{ span: 24 }} className="flex">
                  <div>
                    <Form.Item label="Ảnh đại diện">
                      {((id && isUploadImg) || !id) && (
                        <UploadImgComponent
                          className="Category-upload"
                          url={dataAction.avatar}
                          setImg={onChangeValue}
                          keyPath="avatar"
                          type={FileTypeEnum.AVATAR}
                        />
                      )}
                    </Form.Item>
                  </div>
                  <Form.Item label="Liên kết ảnh đại diện" className="w-full ">
                    <Input
                      className="w-full h-26"
                      value={dataAction.avatar}
                      onChange={(e) => onChangeValue(e.target.value, `avatar`)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Divider className="mt-3" />
            <Col>
              {(isUserUpdate || pathProfile === location.pathname) && (
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
