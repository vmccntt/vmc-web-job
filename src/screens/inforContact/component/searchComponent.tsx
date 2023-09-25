import { Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncFn } from "react-use";
import Label from "../../../Layout/Form/Label";
import { ISearchInforContact } from "../inforContact.model";
import { getInforContactsAction } from "../slice";

const defaultState: ISearchInforContact = {};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [dataState, dataStateFn] = useAsyncFn(
    async (params: ISearchInforContact) => {
      return dispatch(getInforContactsAction(params) as any);
    }
  );

  const debounceLoadData = useMemo(
    () =>
      debounce((query: ISearchInforContact) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchInforContact) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadData(query);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={6}>
          <Label title="Tiêu đề" />
          <Input
            value={state.title}
            name={state.title}
            onChange={(e) => onChangeState({ ...state, title: e.target.value })}
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
          <Label title="Hotline" />
          <Input
            value={state.hotline}
            name={state.hotline}
            onChange={(e) =>
              onChangeState({ ...state, hotline: e.target.value })
            }
          />
        </Col>
        <Col xl={6}>
          <Label title="Địa chỉ" />
          <Input
            value={state.address}
            name={state.address}
            onChange={(e) =>
              onChangeState({ ...state, address: e.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
