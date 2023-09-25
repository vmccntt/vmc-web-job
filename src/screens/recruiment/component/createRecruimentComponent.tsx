import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DownloadOutlined } from "@ant-design/icons";
import { update, cloneDeep, get } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { FileTypeEnum } from "../../../utils/enum";
import { createRecruimentAction, getRecruimentDetail } from "../slice";
import { IRecruiment, IRecruimentAction } from "../recruiment.model";
import {
  Card,
  Form,
  Input,
  Divider,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  UploadProps,
  message,
  UploadFile,
} from "antd";
import { useHistory, useParams } from "react-router";
import { DegreeOtp, GenderEnum, RankingOtp } from "../../../utils/enum";
import moment from "moment";
import UploadFileComponent from "../../../Layout/uploadFile";
import { uploadFile } from "../../../Layout/file/services";
import { REGEX } from "../../../utils";

const CreateRecruimentComponent = () => {
  //#region declare

  const history = useHistory();
  const dispatch = useDispatch();
  const dataReducer = useAppSelector((state) => state.screens.recruiment);
  const [form] = Form.useForm();
  const [dataAction, setDataAction] = useState<IRecruimentAction>({});
  const { id }: any = useParams();
  //#endregion declare

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...dataAction } as IRecruiment;
    await dispatch(
      createRecruimentAction({
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
  const _onDownloadCv = (cvId?: number) => {
    if (cvId) {
      const url = process.env.REACT_APP_API_URL + "file/download/" + cvId;
      window.open(url, "_blank");
    }
  };
  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        await dispatch(getRecruimentDetail({ id }) as any);
      }
    };
    getDetail();
  }, [dispatch, id]);

  useEffect(() => {
    if (dataReducer.detail && id) {
      const newDetail: any = cloneDeep(dataReducer.detail);
      newDetail.birthday = newDetail.birthday
        ? moment(newDetail.birthday)
        : undefined;
      newDetail.graduationYear = newDetail.graduationYear
        ? moment(newDetail.graduationYear, "YYYY")
        : undefined;
      setDataAction(dataReducer.detail as any);
      form.setFieldsValue(newDetail);
      if (dataReducer.detail.cv && dataReducer.detail.cvId) {
        setFileList([
          { uid: `${dataReducer.detail.cvId}`, name: dataReducer.detail.cv },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [dataReducer, id, setDataAction, form]);

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

  const propsFile: UploadProps = {
    onChange: async (info) => {
      if (info.file.status !== "removed") {
        const data = await uploadFile({
          file: info.file,
          name: info.file.name,
          minType: info.file.type,
          type: FileTypeEnum.CV,
        });
        if (data) {
          const cvId = get(data, "data.id");
          const cv = get(data, "data.name");
          form.setFieldsValue({ cvId });
          setDataAction({ ...dataAction, cvId, cv });
        }
        setFileList([info.file]);
      } else if (info.file.status === "removed") {
        form.setFieldsValue({ cvId: undefined });
        setDataAction({ ...dataAction, cvId: undefined, cv: undefined });
        setFileList([]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    fileList,
    children: (
      <>
        {" "}
        {dataAction.cvId && (
          <Button
            className="ml-3"
            type="dashed"
            onClick={() => _onDownloadCv(dataAction.cvId)}
            icon={<DownloadOutlined />}
          >
            Tải xuống CV
          </Button>
        )}
      </>
    ),
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
            <Col lg={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập họ và tên`,
                  },
                ]}
              >
                <Input
                  value={dataAction.name}
                  onChange={(e) => onChangeValue(e.target.value, `name`)}
                />
              </Form.Item>
            </Col>

            <Col lg={{ span: 6 }}>
              <Form.Item label="Ngày sinh" name="birthday">
                <DatePicker
                  format={"DD-MM-YYYY"}
                  className="w-full"
                  onChange={(value) => onChangeValue(value, `birthday`)}
                  value={
                    dataAction.birthday
                      ? dayjs(moment(dataAction.birthday).format("yyyy/MM/DD"))
                      : undefined
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 6 }}>
              <Form.Item label="Giới tính" name="gender">
                <Select
                  optionFilterProp="name"
                  className="w-full"
                  onSelect={(value) => onChangeValue(value, `gender`)}
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
                />
              </Form.Item>
            </Col>

            <Col lg={{ span: 6 }}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập email`,
                  },
                  {
                    pattern: REGEX.email,
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
            <Col lg={6}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập số điện thoại`,
                  },
                  {
                    pattern: REGEX.phoneNumber,
                    message: "Số điện thoại không đúng định dạng",
                  },
                ]}
              >
                <Input
                  value={dataAction.phone}
                  onChange={(e) => onChangeValue(e.target.value, `phone`)}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 6 }}>
              <Form.Item
                label="Chuyên nghành đào tạo"
                name="specialized"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập chuyên nghành đào tạo`,
                  },
                ]}
              >
                <Input
                  value={dataAction.specialized}
                  onChange={(e) => onChangeValue(e.target.value, `specialized`)}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 6 }}>
              <Form.Item
                label="Loại tốt nghiệp"
                name="ranking"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập loại tốt nghiệp`,
                  },
                ]}
              >
                <Select
                  optionFilterProp="ranking"
                  className="w-full"
                  onSelect={(value) => onChangeValue(value, `ranking`)}
                  // onClear={clearBrand}
                  allowClear
                  value={dataAction.ranking}
                  options={RankingOtp}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 12 }}>
              <Form.Item
                label="Vị trí ứng tuyển"
                name="nominee"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập vị trí ứng tuyển`,
                  },
                ]}
              >
                <Input
                  value={dataAction.nominee}
                  onChange={(e) => onChangeValue(e.target.value, `nominee`)}
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 12 }}>
              <Form.Item
                label="Nơi đào tạo"
                name="trainingPlaces"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập nơi đào tạo`,
                  },
                ]}
              >
                <Input
                  value={dataAction.trainingPlaces}
                  onChange={(e) =>
                    onChangeValue(e.target.value, `trainingPlaces`)
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={{ span: 12 }}>
              <Form.Item
                label="Trình độ"
                name="degree"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập trình độ`,
                  },
                ]}
              >
                <Select
                  optionFilterProp="degree"
                  className="w-full"
                  onSelect={(value) => onChangeValue(value, `degree`)}
                  // onClear={clearBrand}
                  allowClear
                  value={dataAction.degree}
                  options={DegreeOtp}
                />
              </Form.Item>
            </Col>

            <Col lg={5}>
              <Form.Item
                label="Năm tốt nghiệp"
                name="graduationYear"
                rules={[
                  {
                    required: true,
                    message: `Vui lòng nhập năm tốt nghiệp`,
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  onChange={(value) =>
                    onChangeValue(value?.year().toString(), `graduationYear`)
                  }
                  picker="year"
                  value={
                    dataAction.graduationYear
                      ? dayjs(
                          moment(dataAction.graduationYear, "YYYY").format(
                            "YYYY"
                          ),
                          "YYYY"
                        )
                      : undefined
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={7}>
              <Form.Item
                label="CV"
                name="cvId"
                className="flex"
                rules={[
                  {
                    required: true,
                    message: `Vui tải lên cv`,
                  },
                ]}
              >
                <UploadFileComponent title="Tải lên CV" propsFile={propsFile} />
              </Form.Item>
            </Col>
            <Divider className="mt-0" />
            <Col span={24}>
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

export default CreateRecruimentComponent;
