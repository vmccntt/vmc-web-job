import _ from "lodash";
import { memo, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import config from "../../../constant";
import { IDataTable, IProps, IState } from "./propState";
import "./styles.scss";

function TableUIComponent(props: IProps) {
  const [state, setState] = useState<IState>({
    data: [],
    isSelectAll: false,
  });

  useEffect(() => {
    const dtConvert = props.data.map((dt) => {
      const dtItemConveert: IDataTable = {
        ...dt,
        isSelect: false,
      };
      return dtItemConveert;
    });
    setState({ ...state, data: dtConvert });
  }, [props.data]);

  // render header
  const _renderHeader = () => {
    const { headers } = props;
    const rows: JSX.Element[] = [];
    // case select
    //add new checkbox in header
    if (props.canSelectItem) {
      rows.push(
        <th key={`th--1`}>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={state.isSelectAll}
            onChange={_selectAll}
          />
        </th>
      );
    }

    headers.forEach((header, index) => {
      rows.push(<th key={`th-${index}`}>{header.title}</th>);
    });

    return rows;
  };

  // render Tbody
  const _renderTbody = () => {
    const { data } = state;
    const rows: JSX.Element[] = [];
    // each record of data => tr
    data.forEach((rowData, index) => {
      rows.push(<tr key={`tr-${index}`}>{_renderRowData(rowData, index)}</tr>);
    });
    return rows;
  };

  const _renderRowData = (rowData: IDataTable, index: number) => {
    const { headers } = props;
    const rows: JSX.Element[] = [];

    // render input case select all

    if (props.canSelectItem) {
      rows.push(
        <td key={`th--1`}>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            checked={rowData.isSelect}
            onChange={_changeSelect(index)}
          />
        </td>
      );
    }

    // render rowData
    headers.forEach((header, index) => {
      const styleAlign = header.align ? `text-${header.align}` : "";

      if (typeof header.render === "function") {
        rows.push(
          <td className={styleAlign} key={`tr-${index}`}>
            {header.render(rowData)}
          </td>
        );
        return;
      }
      const key = header.key ? header.key : "";
      rows.push(
        <td className={styleAlign} key={`tr-${index}`}>
          {rowData[key]}
        </td>
      );
    });
    return rows;
  };

  // select function
  const _selectAll = () => {
    const { data } = state;
    // update data for each row
    data.forEach((dt) => (dt.isSelect = !state.isSelectAll));
    setState({ ...state, isSelectAll: !state.isSelectAll, data });
    _returnSelect();
  };

  const _changeSelect = (index: number) => () => {
    const { data } = state;
    data[index].isSelect = !data[index].isSelect;
    const isSelectAll = data.every((dt) => dt.isSelect);
    setState({ ...state, data, isSelectAll });
    _returnSelect();
  };

  const _returnSelect = () => {
    const { data } = state;
    const dtFilter = data.filter((dt) => dt.isSelect);
    props.selectItem && props.selectItem(dtFilter);
  };

  // pagination
  const _onChangePagination = async (page: number) => {
    setState({ ...state, isSelectAll: false });
    await props.onChangePage(page);
  };

  return (
    <div className="table-component">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>{_renderHeader()}</tr>
          </thead>

          <tbody>{_renderTbody()}</tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          activePage={props.currentPage}
          itemsCountPerPage={config.itemsCountPerPage}
          totalItemsCount={props.totalItem}
          pageRangeDisplayed={5}
          onChange={_onChangePagination}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}

const isEqual = (prevProps: IProps, nextProps: IProps) => {
  // false => re-render
  return (
    _.isEqual(prevProps.data, nextProps.data) &&
    prevProps.currentPage === nextProps.currentPage
  );
};

export default memo(TableUIComponent, isEqual);
