import { Button, Card, Col, Input, Row, Select } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Label from "../../../Layout/Form/Label";
import { ISearchContact } from "../contact.model";
import { useAsyncFn } from "react-use";
import { getContactsAction } from "../slice";
import { INFOR_TYPE_ENUM } from "../../../utils/enum";

const defaultState: ISearchContact = {
  content: "",
  name: "",
  phone: "",
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [dataState, dataStateFn] = useAsyncFn(
    async (params: ISearchContact) => {
      return dispatch(getContactsAction(params) as any);
    }
  );

  const debounceLoadData = useMemo(
    () =>
      debounce((query: ISearchContact) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: ISearchContact) => {
    // set(state, path, value);
    setState(query);
    return debounceLoadData(query);
  };

  const typeOptions = [
    { label: "Tất cả", value: "" },
    { label: "Đang chờ", value: INFOR_TYPE_ENUM.WAIT },
    { label: "Đã liên hệ", value: INFOR_TYPE_ENUM.CONTACTED },
    { label: "Hủy", value: INFOR_TYPE_ENUM.CANCEL },
  ];
  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={7}>
          <Label title="Họ và tên" />
          <Input
            value={state.name}
            name={state.name}
            onChange={(e) => onChangeState({ ...state, name: e.target.value })}
          />
        </Col>
        <Col xl={7}>
          <Label title="Số điện thoại" />
          <Input
            value={state.phone}
            name={state.phone}
            onChange={(e) => onChangeState({ ...state, phone: e.target.value })}
          />
        </Col>
        <Col xl={7}>
          <Label title="Nội dung" />
          <Input
            value={state.content}
            name={state.content}
            onChange={(e) =>
              onChangeState({ ...state, content: e.target.value })
            }
          />
        </Col>
        <Col xl={3}>
          <Label title="Trạng thái" />
          <Select
            className="w-full"
            value={state.type}
            onChange={(value) => onChangeState({ ...state, type: value })}
            options={typeOptions}
          />
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
