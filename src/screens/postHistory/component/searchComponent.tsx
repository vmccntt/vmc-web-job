import { Card, Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getPostsAction } from "../slice";
import Label from "../../../Layout/Form/Label";
import { useAsyncFn } from "react-use";
import { ISearchPostHistory } from "../postHistory.model";

const defaultState: ISearchPostHistory = {
  category: undefined,
  content: undefined,
  languages: undefined,
  name: undefined,
  title: undefined,
  order: undefined,
  page: 1,
  sort: undefined,
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();
  // const { searchParam } = useAppSelector((state) => state.screens.course);
  // const category = useAppSelector((state) => state.screens.category);
  const [state, setState] = useState<ISearchPostHistory>(
    _.cloneDeep(defaultState)
  );

  const postState = useAsyncFn(async (params: ISearchPostHistory) => {
    return dispatch(getPostsAction(params) as any);
  });

  const debounceLoadPost = useMemo(
    () =>
      debounce((query: ISearchPostHistory) => {
        return postState[1](query);
      }, 500),
    [postState]
  );

  //#end category

  const onChangeState = (query: ISearchPostHistory) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadPost(query);
  };
  //#endregion declare

  return (
    <div className="filter-box">
      <Card className="mt-3">
        <Row gutter={16}>
          <Col xl={8}>
            <Label title="Tên bài viết" />
            <Input
              value={state.name}
              name={state.name}
              onChange={(e) =>
                onChangeState({ ...state, name: e.target.value })
              }
            />
          </Col>
          <Col xl={8}>
            <Label title="Tiêu đề" />
            <Input
              // value={post.title}
              // name={post.title}
              onChange={(e) =>
                onChangeState({ ...state, title: e.target.value })
              }
              // onChange={(e) => onChangePost(e.target.value, "title")}
            />
          </Col>
          <Col xl={8}>
            <Label title="Mô tả" />
            <Input
              // value={post.content}
              // name={post.content}
              onChange={(e) =>
                onChangeState({ ...state, content: e.target.value })
              }
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default memo(SearchComponent);
