import { useState } from "react";
import { cloneDeep, get, set } from "lodash";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

import "react-quill/dist/quill.snow.css";
// import "../../quill.scss";
import { ILanguage } from "../../language/language.model";
import { useEffectOnce } from "react-use";
import { useHistory, useParams } from "react-router-dom";
import { formatDataObj } from "../../../utils";
import { useDispatch } from "react-redux";
import { setLoadingAction } from "../../../app/commonSlice";
import CreateInforContactComponent from "./createInforContactComponent";
import {
  createInforContact,
  getInforContact,
  updateInforContact,
} from "../services";
import { InforContact } from "../inforContact.model";

const InforContactTabsComponent = (props: any) => {
  const history = useHistory();
  const { id }: any = useParams();
  const dispatch = useDispatch();
  const param = new URLSearchParams(props.location.search);
  const language = param.get("language") || undefined;
  //#region declare
  const [commonPoint, setCommonPoint] = useState<any>({});
  const [languageDetail, setLanguageDetail] = useState<InforContact[]>([]);
  const [items, setItems] = useState<any[]>([]);
  //#region useEffect
  const setInforContactListIndex = (
    value: any,
    path: string,
    lang: string,
    languageDetails: InforContact[],
    cateDetails: InforContact
  ) => {
    const newCate = cloneDeep(cateDetails);

    if (newCate && lang === newCate.language) {
      set(newCate, path, value);
    }

    let languageDetailNew: InforContact[] = cloneDeep(languageDetails);
    if (path === "isActive") {
      languageDetailNew = languageDetailNew.map((con) => ({
        ...con,
        isActive: value,
      }));
    } else {
      const index = languageDetailNew.map((m) => m.language).indexOf(lang);
      if (index > -1) {
        set(languageDetailNew, `[${index}].${path}`, value);
        setLanguageDetail(languageDetailNew);
      } else {
        const newCateLang = cloneDeep({ ...commonPoint, language: lang });
        newCateLang[path] = value;
        languageDetailNew.push(newCateLang);
      }
    }
    setLanguageDetail(languageDetailNew);
    refreshItem(languageDetailNew, newCate);
  };

  const onCommonPoint = (
    value: any,
    path: string,
    cateDetails?: InforContact,
    languageDetails?: InforContact[]
  ) => {
    const newCate: InforContact = cloneDeep(cateDetails) || { title: "" };
    set(newCate, path, value);
    if (languageDetails) setLanguageDetail(languageDetails);
    refreshItem(languageDetails, newCate);
  };

  const onSubmit = async (
    languageDetails: InforContact[],
    cateDetails: InforContact
  ) => {
    const languages = languageDetails.filter((f) => f.title);
    const update = {
      ...cateDetails,
      languages: languages.map((m) => ({
        ...m,
        id,
      })),
    };
    dispatch(setLoadingAction(true));
    if (!id) {
      await createInforContact(formatDataObj(update));
    } else {
      await updateInforContact(id, update);
    }
    dispatch(setLoadingAction(false));
    history.goBack();
  };

  const refreshItem = (
    listLang?: InforContact[],
    cateDetail?: InforContact
  ) => {
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
        if (!id && lang.isDefault && cateDetail)
          cateDetail["language"] = lang.code;
        const inforContactInit: InforContact = langs
          ? {
              ...cateDetail,
              title: langs.title,
              email: langs.email,
              hotline: langs.hotline,
              address: langs.address,
              language: lang.code,
              isDefault: lang.isDefault,
            }
          : {
              ...cateDetail,
              language: lang.code,
              isDefault: lang.isDefault,
              title: "",
              email: "",
              hotline: "",
              address: [],
            };
        // listLang?.push(inforContactInit);
        return {
          key: `${lang.code}`,
          label: lang.name,
          id: lang.code,
          children: (
            <CreateInforContactComponent
              {...props}
              isDefault={lang.isDefault}
              setInforContactListIndex={setInforContactListIndex}
              languageDetail={listLang}
              onSubmit={onSubmit}
              inforContactInit={inforContactInit}
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
    let inforDetail;
    const detail = async () => {
      if (id) {
        const inforResponse = await getInforContact(id).catch((e) => null);
        inforDetail = get(inforResponse, "data");
        if (inforDetail) {
          const inforContact = inforDetail as InforContact;
          const languages: InforContact[] = inforContact.languages || [];
          const checkLang = languages.find(
            (s) => s.language === inforContact.language
          );
          if (!checkLang) {
            const coppyCate = cloneDeep(inforContact);
            delete coppyCate.languages;
            languages.push(coppyCate);
          }
          const languageLocal = localStorage.getItem("language");
          const languagesSystem: ILanguage[] = languageLocal
            ? JSON.parse(languageLocal)
            : [];

          languagesSystem.map((lang) => {
            const isCheck = languages.some((s) => s.language === lang.code);
            if (!isCheck)
              languages.push({
                language: lang.code,
                isDefault: lang.isDefault,
                isActive: inforContact.isActive,
                title: "",
                email: "",
                hotline: "",
                address: [],
              });
          });
          refreshItem(languages, inforContact);
        }
      } else {
        refreshItem([], { title: "", isActive: false });
      }
    };
    detail();
  });

  return (
    <>
      <Tabs defaultActiveKey={language} items={items} />
    </>
  );
};

export default InforContactTabsComponent;
