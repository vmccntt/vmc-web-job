import { Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Label from "../../../Layout/Form/Label";
import { ISearchUser } from "../user.model";
import { useAsyncFn } from "react-use";
import { getUsersAction } from "../slice";

const defaultState: ISearchUser = {
  username: "",
  email: "",
  phoneNumber: "",
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
          <Label title="Tên đăng nhập" />
          <Input
            value={state.username}
            name={state.username}
            onChange={(e) =>
              onChangeState({ ...state, username: e.target.value })
            }
          />
        </Col>
        <Col xl={6}>
          <Label title="Tên người dùng" />
          <Input
            value={state.name}
            name={state.name}
            onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          />
        </Col>
        <Col xl={6}>
          <Label title="Email" />
          <Input
            value={state.email}
            name={state.email}
            onChange={(e) => onChangeState({ ...state, email: e.target.value })}
          />
        </Col>
        <Col xl={6}>
          <Label title="Số điện thoại" />
          <Input
            value={state.phoneNumber}
            name={state.phoneNumber}
            onChange={(e) =>
              onChangeState({ ...state, phoneNumber: e.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
