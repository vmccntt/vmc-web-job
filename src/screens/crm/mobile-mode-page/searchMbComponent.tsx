import { Col, Input, Row, Select } from "antd";
import _, { debounce } from "lodash";
import { memo, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
// import { ISearchUser } from "../user.model";
import { useAsyncFn } from "react-use";
import { getListCustomerAction } from "../customer/pages/listCustomer/slice";
import { useAppSelector } from "../../../app/hooks";
import Label from "../../../Layout/Form/Label";
// import { getUsersAction } from "../slice";

const defaultState: any = {
  MaDoiTac: "",
  TenDoiTac: "",
  NhomDoiTac: "",
  LaNhanVien: "N",
  TenNganHang: "",
  NguoiDaiDien: "",
  MoTa: "",
};

const SearchMbComponent = () => {
  //#region declare
  const dispatch = useDispatch();
  const [dataState, dataStateFn] = useAsyncFn(async (params: any) => {
    return dispatch(getListCustomerAction(onCreateObjRequest(params)) as any);
  });
  const IsStaffOptions = [
    { label: "Có", value: "Y" },
    { label: "Không", value: "N" },
  ];
  const debounceLoadData = useMemo(
    () =>
      debounce((query: any) => {
        return dataStateFn(query);
      }, 500),
    [dataStateFn]
  );
  const onCreateObjRequest = (param: any) => {
    var objReq = {
      MaDoiTac: param?.MaDoiTac ? ("%" + param?.MaDoiTac.toUpperCase() + "%") : "",
      TenDoiTac: param?.TenDoiTac ? ("%" + param?.TenDoiTac.toUpperCase() + "%") : "",
      NhomDoiTac: param?.NhomDoiTac ? param?.NhomDoiTac.toUpperCase() : "",
      LaNhanVien: "N",
      TenNganHang: param?.TenNganHang ? ("%" + param?.TenNganHang.toUpperCase() + "%") : "",
      NguoiDaiDien: param?.NguoiDaiDien ? ("%" + param?.NguoiDaiDien.toUpperCase() + "%") : "",
      MoTa: param?.MoTa ? ("%" + param?.MoTa.toUpperCase() + "%") : "",
    }
    return objReq;
  }
  const [state, setState] = useState(_.cloneDeep(defaultState));
  //#endregion declare
  const onChangeState = (query: any) => {
    setState(query);
    return debounceLoadData(query);
  };

  const dataReducer = useAppSelector((state) => state.screens.customer);

  return (
    <div className="filter-box">
      <div>
        <Col className="" xl={16}>
          <Label title="Mã đối tác" />
          <Input
            value={state.MaDoiTac}
            name={state.MaDoiTac}
            onChange={(e) =>
              onChangeState({ ...state, MaDoiTac: e.target.value })
            }
          />
        </Col>
        <Col xl={6}>
          <Label title="Tên đối tác" />
          <Input
            value={state.TenDoiTac}
            name={state.TenDoiTac}
            onChange={(e) => onChangeState({ ...state, TenDoiTac: e.target.value })}
          />
        </Col>
        <Col xl={6}>
          <Label title="Nhóm đối tác" />
          <Select
            className="w-full"
            allowClear
            onChange={(name) => onChangeState({ ...state, NhomDoiTac: name })}
            options={dataReducer.dataAllGroup}
          />
        </Col>
        <Col xl={6}>
          <Label title="Người đại diện" />
          <Input
            value={state.NguoiDaiDien}
            name={state.NguoiDaiDien}
            onChange={(e) =>
              onChangeState({ ...state, NguoiDaiDien: e.target.value })
            }
          />
        </Col>
      </div>
    </div>
  );
};

export default memo(SearchMbComponent);
