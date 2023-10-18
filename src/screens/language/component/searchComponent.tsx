import { Button, Card, Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Label from "../../../Layout/Form/Label";
import { ISearchLanguage } from "../language.model";
import { useAsyncFn } from "react-use";
import { getLanguagesAction } from "../slice";

const defaultState: ISearchLanguage = {
  name: "",
  code: "",
  description: "",
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [dataState, dataStateFn] = useAsyncFn(async (params: ISearchLanguage) => {
    // return dispatch(getLanguagesAction(params) as any);
  });

  const debounceLoadData = useMemo(
    () =>
      debounce((query: ISearchLanguage) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchLanguage) => {
    // set(state, path, value);
    setState(query);
    
    return debounceLoadData(query);
  };

  return (
    <div className="filter-box">
      <Card className="mt-3">
        <Row gutter={16}>
          <Col xl={8}>
            <Label title="Tên ngôn ngữ" />
            <Input
              value={state.name}
              name={state.name}
              onChange={(e) =>
                onChangeState({ ...state, name: e.target.value })
              }
            />
          </Col>
          <Col xl={8}>
            <Label title="Mã code" />
            <Input
              value={state.code}
              name={state.code}
              onChange={(e) =>
                onChangeState({ ...state, code: e.target.value })
              }
            />
          </Col>
          <Col xl={8}>
            <Label title="Mô tả" />
            <Input
              value={state.description}
              name={state.description}
              onChange={(e) =>
                onChangeState({ ...state, description: e.target.value })
              }
            />
          </Col>
        </Row>
      </Card>
      <Row className="mt-3 mb-3">
        <Link key="5" to={{ pathname: `/language/create` }} title="Create">
          <Button type="primary" ghost>
            Thêm mới
          </Button>
        </Link>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
