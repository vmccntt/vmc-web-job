import { Col, Input, Row, Select } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncFn } from "react-use";
import Label from "../../../Layout/Form/Label";
import { ISearchCategory } from "../category.model";
import { getCategorysTreeAction } from "../slice";

// const { Option } = Select;

const defaultState: ISearchCategory = {
  isMenu: undefined,
  parentId: "",
  path: "",
  title: "",
};

const SearchComponent = () => {
  //#region declare
  const dispatch = useDispatch();

  const [state, setState] = useState<ISearchCategory>(
    _.cloneDeep(defaultState)
  );

  const [search, searchStateFn] = useAsyncFn(
    async (params: ISearchCategory) => {
      return dispatch(getCategorysTreeAction(params) as any);
    }
  );

  const debounceLoadSearch = useMemo(
    () =>
      debounce((query: ISearchCategory) => {
        return searchStateFn(query);
      }, 500),
    [searchStateFn]
  );
  const onChangeState = (query: ISearchCategory) => {
    setState({ ...query });
    return debounceLoadSearch(query);
  };

  return (
    <div className="filter-box">
      <Row gutter={16}>
        <Col xl={7} sm={7} lg={7}>
          <Label title="Tiêu đề" />
          <Input
            value={state.title}
            name={state.title}
            onChange={(e) => onChangeState({ ...state, title: e.target.value })}
          />
        </Col>
        <Col xl={7} sm={7} lg={7}>
          <Label title="Đường dẫn" />
          <Input
            value={state.slug}
            name={state.slug}
            onChange={(e) => onChangeState({ ...state, slug: e.target.value })}
          />
        </Col>
        <Col xl={7} sm={7} lg={7}>
          <Label title="Mô tả" />
          <Input
            value={state.description}
            name={state.description}
            onChange={(e) =>
              onChangeState({ ...state, description: e.target.value })
            }
          />
        </Col>
        <Col xl={3} sm={3} lg={3}>
          <Label title="Là menu" />
          <Select
            optionFilterProp="name"
            className="w-full"
            onSelect={(isMenu) => onChangeState({ ...state, isMenu })}
            // onClear={clearBrand}
            allowClear
            value={state.isMenu}
            options={[
              {
                label: "Tất cả",
                value: null,
              },
              {
                label: "Đúng",
                value: true,
              },
              {
                label: "sai",
                value: false,
              },
            ]}
          ></Select>
        </Col>
      </Row>
    </div>
  );
};

export default memo(SearchComponent);
