import { Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncFn } from "react-use";
import Label from "../../../Layout/Form/Label";
import { ISearchRecruiment } from "../recruiment.model";
import { getRecruimentsAction } from "../slice";

const defaultState: ISearchRecruiment = {};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [dataState, dataStateFn] = useAsyncFn(
    async (params: ISearchRecruiment) => {
      return dispatch(getRecruimentsAction(params) as any);
    }
  );

  const debounceLoadData = useMemo(
    () =>
      debounce((query: ISearchRecruiment) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchRecruiment) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadData(query);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={8}>
          <Label title="Họ và tên" />
          <Input
            value={state.name}
            name={state.name}
            onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          />
        </Col>
        <Col xl={8}>
          <Label title="Số điện thoại" />
          <Input
            value={state.phone}
            name={state.phone}
            onChange={(e) => onChangeState({ ...state, phone: e.target.value })}
          />
        </Col>
        <Col xl={8}>
          <Label title="Email" />
          <Input
            value={state.email}
            name={state.email}
            onChange={(e) => onChangeState({ ...state, email: e.target.value })}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
