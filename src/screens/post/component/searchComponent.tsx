import {
  Col,
  Input,
  Row,
  Select
} from "antd";
import { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useAsyncFn } from "react-use";
import CategorySelectTreeComponent from "../../../Layout/CategorySelectTree";
import Label from "../../../Layout/Form/Label";
import LanguageComponent from "../../../Layout/languageComponent";
import { ISearchPost } from "../../../models/post";
import { getPostsAction } from "../slice";
// import { ExportToExcel } from '../../../app/components/exportExcel';
// import { useAppSelector } from '../../../app/hooks';
// import { searchCourse } from '../../../services/course';
// import { getCoursesAction, setSearchParamAction, setStatusModalAction } from '../slice';
// import { columnTable } from '../validation';
// const { Option } = Select;

const SearchComponent = (props: any) => {
  const history = useHistory();
  const location = useLocation();
  const parmams = new URLSearchParams(props.location.search);
  const langDefault = parmams.get("language") || undefined;
  const getQuery = () => {
    const param = new URLSearchParams(props.location.search);
    const name = param.get("name") || "";
    const title = param.get("title") || "";
    const category = param.get("category") || "";
    const content = param.get("content") || "";
    const language = param.get("language") || "";
    const query: any = {};
    if (name) query.name = name;
    if (title) query.title = title;
    if (category) query.category = category;
    if (content) query.content = content;
    if (language) query.language = language;
    return query;
  };

  const defaultState: ISearchPost = {
    ...getQuery(),
    page: 1,
  };
  //#region declare
  const dispatch = useDispatch();
  // const { searchParam } = useAppSelector((state) => state.screens.course);
  // const category = useAppSelector((state) => state.screens.category);
  const [state, setState] = useState<ISearchPost>({
    ...defaultState,
  });

  const [postState, postStateFn] = useAsyncFn(async (params: ISearchPost) => {
    return dispatch(getPostsAction(params) as any);
  });

  const debounceLoadPost = useMemo(
    () =>
      debounce((query: ISearchPost) => {
        return postStateFn(query);
      }, 500),
    [postStateFn]
  );

  const onSelectedCategory = (category: string) => {
    const newState = { ...state, category: category };
    const query: any = getQuery();
    query["category"] = category;
    const params = new URLSearchParams(query);
    history.replace({ pathname: location.pathname, search: params.toString() });
    setState(newState);
    dispatch(getPostsAction(newState) as any);
  };

  const onSelectedLanguage = (language: string) => {
    const query: any = getQuery();
    query["language"] = language;
    const params = new URLSearchParams(query);
    history.replace({ pathname: location.pathname, search: params.toString() });
    const newState = { ...state, language };
    setState(newState);
    dispatch(getPostsAction(newState) as any);
  };

  const onCleanLanguage = () => {
    const newState = { ...state, language: undefined };
    const query: any = getQuery();
    delete query["language"];
    const params = new URLSearchParams(query);
    history.replace({ pathname: location.pathname, search: params.toString() });
    setState(newState);
    dispatch(getPostsAction(newState) as any);
  };

  const onClearCategory = () => {
    const newState = { ...state, category: undefined };
    const query: any = getQuery();
    delete query["category"];
    const params = new URLSearchParams(query);
    history.replace({ pathname: location.pathname, search: params.toString() });
    setState(newState);
    dispatch(getPostsAction(newState) as any);
  };

  //#end category

  const onChangeState = (value: string, path: string) => {
    const query: any = getQuery();
    if (value) query[path] = value;
    else delete query[path];
    const params = new URLSearchParams(query);
    history.replace({ pathname: location.pathname, search: params.toString() });
    const newState: any = { ...state };
    newState[path] = value;
    setState({ ...newState });
    return debounceLoadPost(newState);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={6}>
          <Label title="Tiêu đề" />
          <Input
            value={defaultState.title}
            onChange={(e) => onChangeState(e.target.value, "title")}
          />
        </Col>
        <Col xl={6}>
          <Label title="Nội dung" />
          <Input
            value={defaultState.content}
            // name={post.content}
            onChange={(e) => onChangeState(e.target.value, "content")}
          />
        </Col>
        <Col xl={6}>
          <Label title="Danh mục" />
          <CategorySelectTreeComponent
            filter={props.filterCate}
            categoryId={state.category}
            onSelect={onSelectedCategory}
            onClear={onClearCategory}
          />
          {/* {_renderCategoryOptions()} */}
          {/* </Select> */}
        </Col>
        <Col xl={6}>
          <Label title="Ngôn ngữ" />
          <LanguageComponent
            codeDefault={langDefault}
            onSelect={onSelectedLanguage}
            onClear={onCleanLanguage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
