import { Button, Card, Col, Input, Row } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Label from "../../../Layout/Form/Label";
import { ISearchBanner } from "../banner.model";
import { useAsyncFn } from "react-use";
import { getBannersAction } from "../slice";

const defaultState: ISearchBanner = {
  name: "",
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [bannerState, bannerStateFn] = useAsyncFn(
    async (params: ISearchBanner) => {
      return dispatch(getBannersAction(params) as any);
    }
  );

  const debounceLoadBanner = useMemo(
    () =>
      debounce((query: ISearchBanner) => {
        return bannerStateFn(query);
      }, 500),
    [bannerStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchBanner) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadBanner(query);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={6}>
          <Label title="Tên banner" />
          <Input
            value={state.name}
            name={state.name}
            onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
