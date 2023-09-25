import { useEffect, useState } from "react";
import { set, update, cloneDeep } from "lodash";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import { createBannerAction, getBannerDetail } from "../slice";
import {
  BannerInterface,
  IBanner,
  ISliderLanguage,
  SliderInterface,
} from "../banner.model";
import { MinusCircleOutlined } from "@ant-design/icons";
import {
  Card,
  Form,
  Input,
  Divider,
  Button,
  Row,
  Col,
  TabsProps,
  Tabs,
} from "antd";
import Label from "../../../Layout/Form/Label";
import AnimateSider from "../../../Layout/sliders/animate-slider";
import { useHistory, useParams } from "react-router";
import UploadImgComponent from "../../../Layout/uploadImg";
import { FileTypeEnum } from "../../../utils/enum";
import { ILanguage } from "../../language/language.model";
import { useEffectOnce } from "react-use";

const { TextArea } = Input;
const CreateBannerComponent = () => {
  //#region declare
  const sliderInit = {
    title: "",
    content: "",
    description: "",
    imgage: "",
    path: "",
  };
  const bannerInit: IBanner = {
    name: "",
    sliders: [
      {
        title: "",
        content: "",
        description: "",
        imgage: "",
        path: "",
      },
    ],
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const bannerData = useAppSelector((state) => state.screens.banner);
  const [form] = Form.useForm();
  const [isUploadImg, setUploadImg] = useState<boolean>(false);
  const languageLocal = localStorage.getItem("language");
  const [languages] = useState<ILanguage[]>(
    languageLocal ? JSON.parse(languageLocal) : []
  );
  const [items, setItems] = useState<any[]>([]);
  const [nameBanner, setNameBanner] = useState<string>();
  const [banner, setBanner] = useState<IBanner>({ ...bannerInit });
  const { id }: any = useParams();
  //#endregion declare

  //#region useEffect

  const _addSlider = () => {
    const newBanner: IBanner = { ...cloneDeep(banner) };
    newBanner.languages = newBanner.languages?.map((lang) => {
      lang.sliders.push({ ...sliderInit });
      return lang;
    });
    setBanner({ ...newBanner });
    refreshItem(newBanner.languages || []);
  };

  const _removeSlider = (index: number) => {
    const newBanner: IBanner = { ...banner };
    newBanner.languages = newBanner.languages?.map((lang) => {
      lang.sliders = lang.sliders.filter((m, i) => i !== index);
      return lang;
    });
    setBanner({ ...newBanner });
    refreshItem(newBanner.languages || []);
  };

  const goBack = () => {
    history.goBack();
  };

  const _onSubmitCourse = async () => {
    const body = { ...banner } as BannerInterface;
    if (body.languages) {
      const sliderLang =
        body.languages.find((f) => f.isDefault) || body.languages[0];
      if (sliderLang) {
        body.sliders = sliderLang.sliders;
      }
    }
    body.name = nameBanner;
    await dispatch(
      createBannerAction({
        body,
        type: !id ? "addNew" : null,
        id,
      }) as any
    );
    history.goBack();
  };
  const setImg = (
    imgage: string,
    key: string,
    listSliders: ISliderLanguage[]
  ) => {
    const newBanner = cloneDeep(banner);
    newBanner.languages = listSliders.map((lang) => {
      const newLang = cloneDeep(lang);
      const sliders = lang.sliders.map((s) => {
        const slide = cloneDeep(s);
        slide.imgage = imgage;
        return slide;
      });
      newLang.sliders = sliders;
      return newLang;
    });

    setBanner({ ...newBanner });
    refreshItem(newBanner.languages || []);
  };
  const onChangeBanner = (
    valueUp: any,
    path: string,
    listSliders: ISliderLanguage[]
  ) => {
    const languages = cloneDeep(listSliders);
    set(languages, path, valueUp);
    setBanner({ ...banner, languages });
    refreshItem(languages || []);
  };
  const _renderSliders = ({
    langSlider,
    indexLang,
    listSliders,
  }: {
    langSlider: SliderInterface[];
    indexLang: number;
    listSliders: ISliderLanguage[];
  }) => {
    return langSlider.map((slider, index) => (
      <Card
        title={`Trang trình bày ${index + 1}`}
        className="mt-4"
        key={`st-${index}`}
        extra={
          <MinusCircleOutlined
            color="#ff4b2b"
            className="text-red-600 text-xl cursor-pointer"
            onClick={() => _removeSlider(index)}
          />
        }
      >
        <Row>
          <Col lg={{ span: 12 }}>
            <Row gutter={16}>
              <Col lg={{ span: 24 }}>
                <Label title="Tiêu đề" />
                <Input
                  value={slider.title}
                  onChange={(e) =>
                    onChangeBanner(
                      e.target.value,
                      `[${indexLang}].sliders[${index}].title`,
                      listSliders
                    )
                  }
                />
              </Col>
              <Col lg={{ span: 24 }}>
                <Label title="Nội dung" />
                <Input
                  value={slider.content}
                  onChange={(e) =>
                    onChangeBanner(
                      e.target.value,
                      `[${indexLang}].sliders[${index}].content`,
                      listSliders
                    )
                  }
                />
              </Col>
              <Col xl={24}>
                <Row>
                  <Col xl={4}>
                    <Row>
                      <Col xl={24}>
                        <Label title={`Ảnh bìa`} />
                        {((id && isUploadImg) || !id) && 
                          <UploadImgComponent
                            className="banner-upload"
                            url={slider.imgage}
                            setImg={setImg}
                            keyPath={`imgage`}
                            addOtp={listSliders}
                            type={FileTypeEnum.BANNER}
                          />
                        }
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={20}>
                    <Row>
                      <Col lg={{ span: 24 }}>
                        <div className="pl-2">
                          <Label title="Mô tả" />
                          <TextArea
                            style={{ minHeight: "102px" }}
                            value={slider.description}
                            onChange={(e) =>
                              onChangeBanner(
                                e.target.value,
                                `[${indexLang}].sliders[${index}].description`,
                                listSliders
                              )
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={{ span: 24 }}>
                    <div className="mt-2">
                      <Input
                        value={slider.imgage}
                        placeholder="Liên kết ảnh"
                        onChange={(e) =>
                          onChangeBanner(
                            e.target.value,
                            `[${indexLang}].sliders[${index}].imgage`,
                            listSliders
                          )
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col lg={{ span: 12 }}>
            <div className="ml-5">
              {((id && isUploadImg) || !id) && index >= 0 && (
                <AnimateSider {...slider} />
              )}
            </div>
          </Col>
        </Row>
      </Card>
    ));
  };

  const _onFinish = async () => {
    _onSubmitCourse();
  };

  const itemInit = (listSliderLanguage: ISliderLanguage[]) => {
    const listSliders: ISliderLanguage[] = languages.map((lang) => {
      const langSlider = listSliderLanguage?.find(
        (s) => s.language === lang.code
      );
      const sliderInit: ISliderLanguage = langSlider
        ? {
            sliders: langSlider.sliders,
            language: lang.code,
            isDefault: lang.isDefault,
          }
        : {
            sliders: [
              {
                title: "",
                content: "",
                description: "",
                imgage: "",
                path: "",
              },
            ],
            language: lang.code,
            isDefault: lang.isDefault,
          };
      return sliderInit;
    });
    const newBanner = cloneDeep(banner);
    set(newBanner, "languages", listSliders);
    setBanner(newBanner);
    refreshItem(listSliders);
  };

  const refreshItem = (listSliders: ISliderLanguage[]) => {
    const items: TabsProps["items"] = listSliders.map((sliderLan, index) => ({
      key: `${sliderLan.language}`,
      label: languages[index].name,
      id: sliderLan.language,
      children: _renderSliders({
        langSlider: sliderLan.sliders,
        indexLang: index,
        listSliders,
      }),
    }));
    setItems(items);
  };

  useEffectOnce(() => {
    itemInit([]);
  });

  useEffect(() => {
    const getDetail = async () => {
      if (id) {
        await dispatch(getBannerDetail({ id }) as any);
      }
    };
    getDetail();
  }, [dispatch, id]);

  useEffect(() => {
    if (bannerData.detail && id) {
      const dataBan: BannerInterface = bannerData.detail;
      setNameBanner(dataBan.name);
      const ban: IBanner = {
        name: dataBan.name,
        sliders: dataBan.sliders,
      };
      setBanner(ban);
      form.setFieldsValue({ ...ban, name: dataBan.name });
      refreshItem(dataBan.languages || []);
      setUploadImg(true);
    }
  }, [bannerData, id, form]);
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
            <Col lg={{ span: 8 }}>
              <Form.Item
                label="Tên trình chiếu"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên trình chiếu",
                  },
                ]}
              >
                <Input
                  value={nameBanner}
                  name={nameBanner}
                  onChange={(e) => setNameBanner(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Tabs items={items} />
            </Col>
            <Col span={24} className="mt-3">
              <Button type="primary" ghost onClick={() => _addSlider()}>
                Thêm
              </Button>
            </Col>
          </Row>
          <Divider className="mt-3" />
          <Row>
            <Button type="primary" ghost htmlType="submit">
              {id ? "Cập nhật" : "Thêm mới"}
            </Button>
            <Button className="ml-3" danger onClick={goBack}>
              Hủy
            </Button>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default CreateBannerComponent;
