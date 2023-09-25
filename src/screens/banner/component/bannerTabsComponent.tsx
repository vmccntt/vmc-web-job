import { useState } from "react";
import { cloneDeep, get, set } from "lodash";

import { Tabs } from "antd";
import type { TabsProps } from "antd";

import "react-quill/dist/quill.snow.css";
// import "../../quill.scss";
import { ILanguage } from "../../language/language.model";
import CreateBannerComponent from "./createBannerComponent";
import { useEffectOnce } from "react-use";
import { useHistory, useParams } from "react-router-dom";
import { formatDataObj } from "../../../utils";
import { IBanner } from "../banner.model";
import { createBanner, getBanner, updateBanner } from "../services";

const BannerTabsComponent = (props: any) => {
  const history = useHistory();
  const { id }: any = useParams();
  const param = new URLSearchParams(props.location.search);
  const language = param.get("language") || undefined;
  //#region declare
  const [bannerDetail, setbannerDetail] = useState<IBanner>({
    name: "",
    sliders: [],
  });
  const [commonPoint, setCommonPoint] = useState<any>({});
  const [items, setItems] = useState<any[]>([]);
  //#region useEffect
  const setBannerInit = (
    value: any,
    path: string,
    listBanner: IBanner[],
  ) => {
    const newBanner = cloneDeep(listBanner);
    set(newBanner, path, value)
    refreshItem(newBanner);
  };

  const onCommonPoint = (
    value: any,
    path: string,
    bannerDetails?: IBanner[],
  ) => {
    const newBanner: IBanner[] = cloneDeep(bannerDetails) || [];
    set(newBanner, path, value);
    refreshItem(newBanner);
  };

  const onSubmit = async (
    listBanner: IBanner[],
  ) => {
    
    // const languages = languageDetails.filter((f) => f.name);
    // const update = {
    //   ...bannerDetails,
    //   languages: languages.map((m) => ({
    //     ...m,
    //     id,
    //   })),
    // };
    // if (!id) {
    //   await createBanner(formatDataObj(update));
    // } else {
    //   await updateBanner(id, update);
    // }
    // history.goBack();
  };

  const refreshItem = (listLang?: IBanner[]) => {
    const languageLocal = localStorage.getItem("language");
    const languages: ILanguage[] = languageLocal
      ? JSON.parse(languageLocal)
      : [];
    function compare(a: any, b: any) {
      if (a.isDefault > b.isDefault) {
        return -1;
      }
      if (a.isDefault < b.isDefault) {
        return 1;
      }
      return 0;
    }
    const listBanner = languages
      .sort((a, b) => compare(a, b))
      .map((lang, index) => {
        if (!id && lang.isDefault && bannerDetail)
          bannerDetail["language"] = lang.code;
        const langs = listLang?.find((s) => s.language === lang.code);
        const bannerInit: IBanner = langs
          ? {
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
              name: "",
            };

        return bannerInit;
      });
    const items: TabsProps["items"] = listBanner.map((banner, index) => ({
      key: `${banner.language}`,
      label: languages[index].name,
      id: banner.language,
      children: (
        <CreateBannerComponent
          {...props}
          isDefault={banner.isDefault}
          setBannerInit={setBannerInit}
          languageDetail={listLang}
          onSubmit={onSubmit}
          bannerInit={banner}
          onCommonPoint={onCommonPoint}
          commonPoint={bannerDetail}
          listBanner={listBanner}
          index={index}
        />
      ),
    }));
    setItems(items);
  };

  useEffectOnce(() => {
    let postDetail;
    const detail = async () => {
      if (id) {
        const postResponse = await getBanner(id);
        postDetail = get(postResponse, "data");
        if (postDetail) {
          const banner = postDetail as IBanner;
          setbannerDetail(banner);
          const languages: IBanner[] = banner.languages || [];
          const checkLang = languages.find(
            (s) => s.language === banner.language
          );
          if (!checkLang) {
            const newBanner = cloneDeep(banner);
            const listLang: IBanner[] = cloneDeep(newBanner.languages) || [];
            delete newBanner.languages;
            listLang.push(newBanner);
            refreshItem(listLang);
          } else {
            refreshItem(languages);
          }
        }
      } else {
        refreshItem([]);
      }
    };
    detail();
  });

  const TabComp = async (language: any) => {
    setbannerDetail(bannerDetail);
    setCommonPoint(commonPoint);
  };
  return (
    <>
      <Tabs defaultActiveKey={language} items={items} onChange={TabComp} />
    </>
  );
};

export default BannerTabsComponent;
