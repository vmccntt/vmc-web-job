import { useState } from "react";
import { cloneDeep, get, set } from "lodash";
import { ICateCommom, ICategory } from "../../category.model";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import "react-quill/dist/quill.snow.css";
// import "../../quill.scss";
import { ILanguage } from "../../../language/language.model";
import CategoryComponent from "./categoryComponent";
import { useEffectOnce } from "react-use";
import { useHistory, useParams } from "react-router-dom";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../services";
import { formatDataObj } from "../../../../utils";
import { useDispatch } from "react-redux";
import { setLoadingAction } from "../../../../app/commonSlice";

const CategoryTabsComponent = (props: any) => {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const param = new URLSearchParams(props.location.search);
  const language = param.get("language") || undefined;
  //#region declare
  const [cateDetail, setCateDetail] = useState<ICategory>({ title: "" });
  const [commonPoint, setCommonPoint] = useState<any>({});
  const [languageDetail, setLanguageDetail] = useState<ICategory[]>([]);
  const [items, setItems] = useState<any[]>([]);
  //#region useEffect
  const setPostListIndex = (value: string, path: string, lang: string, languageDetails: ICategory[], cateDetails: ICategory) => {
    const newCate = cloneDeep(cateDetails);
    
    if (newCate && lang === newCate.language) {
      set(newCate, path, value);
      setCateDetail(newCate);
    }
    const languageDetailNew: ICategory[] = cloneDeep(languageDetails);
    const index = languageDetailNew.map((m) => m.language).indexOf(lang);
    if (index > -1) {
      set(languageDetailNew, `[${index}].${path}`, value);
      setLanguageDetail(languageDetailNew);
    } else {
      const newCateLang = cloneDeep({ ...commonPoint, language: lang });
      newCateLang[path] = value;
      languageDetailNew.push(newCateLang);
    }
    setLanguageDetail(languageDetailNew);
    
    refreshItem(languageDetailNew, newCate);
  };

  const onCommonPoint = (value: any, path: string, cateDetails?: ICategory, languageDetails?: ICategory[]) => {
    const newCate: ICategory = cloneDeep(cateDetails) || { title: "" };
    set(newCate, path, value);
    setCateDetail(newCate);
    if(languageDetails) setLanguageDetail(languageDetails);
    refreshItem(languageDetails, newCate);
  };

  const onSubmit = async (languageDetails: ICategory[], cateDetails: ICategory) => {
    const languages = languageDetails.filter((f) => f.title);
    const update = {
      ...cateDetails,
      languages: languages.map((m) => ({
        ...m,
        parentId: cateDetail?.parentId,
        categoryId: cateDetail?.categoryId,
        id,
      })),
    };
    dispatch(setLoadingAction(true));
    if (!id) {
      await createCategory(formatDataObj(update));
    } else {
      await updateCategory(id, update);
    }
    dispatch(setLoadingAction(false));
    history.goBack();
  };

  const refreshItem = (listLang?: ICategory[], cateDetail?: ICategory) => {
    if (cateDetail) setCateDetail(cateDetail);
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
    setLanguageDetail(listLang || []);
    const items: TabsProps["items"] = languages
      .sort((a, b) => compare(a, b))
      .map((lang, index) => {
        const langs = listLang?.find((s) => s.language === lang.code);
        if(!id && lang.isDefault && cateDetail) cateDetail['language'] = lang.code;
        const categoryInit: ICategory = langs
          ? { ...cateDetail, title: langs.title, language: lang.code, isDefault: lang.isDefault }
          : {
              ...cateDetail,
              language: lang.code,
              isDefault: lang.isDefault,
              title: "",
            };
        return {
          key: `${lang.code}`,
          label: lang.name,
          id: lang.code,
          children: (
            <CategoryComponent
              {...props}
              isDefault={lang.isDefault}
              setPostListIndex={setPostListIndex}
              languageDetail={listLang}
              onSubmit={onSubmit}
              categoryInit={categoryInit}
              onCommonPoint={onCommonPoint}
              commonPoint={cateDetail}
              index={index}
            />
          ),
        };
      });
    setItems(items);
  };

  useEffectOnce(() => {
    let postDetail;
    const detail = async () => {
      if (id) {
        const postResponse = await getCategory(id).catch((e) => null);
        postDetail = get(postResponse, "data");
        if (postDetail) {
          const cateC = postDetail as ICategory;
          setCateDetail(cateC);
          const languages: ICategory[] = cateC.languages || [];
          const checkLang = languages.find(
            (s) => s.language === cateC.language
          );
          if (!checkLang) {
            const coppyCate = cloneDeep(cateC);
            const listLang: ICategory[] = cloneDeep(coppyCate.languages) || [];
            delete coppyCate.languages;
            listLang.push(coppyCate);
            setLanguageDetail(listLang);
            refreshItem(listLang, cateC);
          } else {
            setLanguageDetail(languages);
            refreshItem(languages, cateC);
          }
        }
      } else {
        refreshItem([], { title: '' });
      }
    };
    detail();
  });

  const TabComp = async (language: any) => {

    setCateDetail(cateDetail);
    setCommonPoint(commonPoint);
    if (id) {
      // const postResponse = await getCategory(id, language).catch((e) => null);
      // postDetail = get(postResponse, "data");

      refreshItem(languageDetail, cateDetail);
    } else {
      // setPostList([...postList]);
      // refreshItem([...postList]);
    }
    // return <></>;
  };
  return (
    <>
      <Tabs defaultActiveKey={language} items={items} onChange={TabComp} />
    </>
  );
};

export default CategoryTabsComponent;
