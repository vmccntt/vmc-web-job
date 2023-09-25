import { Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncFn } from "react-use";
import Label from "../../../Layout/Form/Label";
import { ISearchUser } from "../partner.model";
import { getUsersAction } from "../slice";

const defaultState: ISearchUser = {
  name: "",
  description: "",
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [dataState, dataStateFn] = useAsyncFn(async (params: ISearchUser) => {
    return dispatch(getUsersAction(params) as any);
  });

  const debounceLoadData = useMemo(
    () =>
      debounce((query: ISearchUser) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchUser) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadData(query);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={6}>
          <Label title="Tên đối tác" />
          <Input
            value={state.name}
            name={state.name}
            onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          />
        </Col>
        <Col xl={6}>
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
    </div>
  );
};

export default memo(SearchComponent);
