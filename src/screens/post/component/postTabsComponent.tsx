import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { get, set } from "lodash";
import { useState } from "react";
import { PostInterface } from "../../../models/post";

import "react-quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import { ILanguage } from "../../language/language.model";
import { createPost, createPostList, getPostLanguage, updatePost } from "../services";
import PostComponent from "./postComponent";
import "./quill.scss";

const PostTabsComponent = (props: any) => {
  const history = useHistory();
  const { id }: any = useParams();
  const param = new URLSearchParams(props.location.search);
  const language = param.get("language") || undefined;
  //#region declare
  // const [postList, setPostList] = useState<PostInterface[]>([]);
  const [items, setItems] = useState<any[]>([]);
  //#region useEffect
  const onChange = (
    listPost: PostInterface[],
    value: any,
    path: string,
    index: number
  ) => {
    set(listPost, `[${index}].${path}`, value);
    refreshItem(listPost);
  };

  const onCommon = (listPost: PostInterface[], value: any, path: string) => {
    const newListPost = listPost.map((m) => set(m, path, value));
    refreshItem(newListPost);
  };

  const onSubmit = async (postLists: PostInterface[]) => {
    if (!id) {
      await createPostList({
        data: postLists
          .filter((f) => f.title && f.name && f.title.length && f.name.length)
          .map((m) => ({
            ...m,
            category: m.category ? m.category : undefined,
            contentHtml: m.contentHtmlCoppy
              ? m.contentHtmlCoppy
              : m.contentHtml,
          })),
      });
    } else {
      for (const post of postLists) {
        if (post.id) {
          await updatePost(post.id, {
            ...post,
            contentHtml: post.contentHtmlCoppy
              ? post.contentHtmlCoppy
              : post.contentHtml,
          });
        } else {
          if (
            post.title &&
            post.title.length &&
            post.name &&
            post.name.length
          ) {
            post.postLanguageId = id;
            createPost({
              ...post,
              contentHtml: post.contentHtmlCoppy
                ? post.contentHtmlCoppy
                : post.contentHtml,
            });
          }
        }
      }
    }
    history.goBack();
  };

  const refreshItem = (newPostList?: PostInterface[], detail?: any) => {
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
    const listPosts: PostInterface[] = [];
    const langDefault = languages.find((f) => f.isDefault);
    const init = {
      isPublish: false,
      indexSort: "",
      category: "",
      icon: "",
    };

    if (langDefault) {
      const post = newPostList?.find((p) => p.language === langDefault.code);
      if (post) {
        init.isPublish = post.isPublish || false;
        init.indexSort = post.indexSort || "";
        init.category = post.category || "";
        init.icon = post.icon || "";
      }
    }
    const items: TabsProps["items"] = languages
      .sort((a, b) => compare(a, b))
      .map((lang, index) => {
        const findLang = newPostList?.find((f) => f.language === lang.code);
        const postInit: PostInterface = findLang
          ? { ...set(findLang, "isDefault", lang.isDefault), ...init }
          : {
              ...init,
              id: 0,
              contentHtml: "",
              contentHtmlCoppy: "",
              language: lang.code,
              isDefault: lang.isDefault,
              title: "",
              name: "",
              slug: "",
            };
        listPosts.push(postInit);
        return {
          key: `${lang.code}`,
          label: lang.name,
          id: lang.code,
          children: (
            <PostComponent
              {...props}
              isDefault={lang.isDefault}
              onChange={onChange}
              postList={listPosts}
              onSubmit={onSubmit}
              onCommon={onCommon}
              postInit={postInit}
              index={index}
            />
          ),
        };
      });
    setItems(items);
  };

  useEffectOnce(() => {
    const detail = async () => {
      if (id) {
        const postResponse = await getPostLanguage(Number(id)).catch(
          (e) => null
        );
        let postlistDetail: any[] = get(postResponse, "data", []);
        postlistDetail = postlistDetail.map((post) => ({
          ...post,
          contentHtmlCoppy: post.contentHtml,
        }));
        refreshItem(postlistDetail);
      } else {
        refreshItem();
      }
    };
    detail();
  });

  const TabComp = async (lang: any) => {};
  return (
    <>
      <Tabs defaultActiveKey={language} items={items} onChange={TabComp} />
    </>
  );
};

export default PostTabsComponent;
