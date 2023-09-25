export interface IHearder {
  title?: string;
  key?: string;
  isCanSort?: boolean;
  align?: "center" | "left" | "right";
  render?(elements: IData): JSX.Element;
  width?: string;
}

export interface IData {
  [key: string]: string | number | boolean | any | undefined;
  id: string | number | undefined;
}

export interface IDataTable extends IData {
  isSelect: boolean;
}

export interface IProps {
  headers: IHearder[];
  data: IData[];
  selectItem?(data: IDataTable[]): void;
  onChangePage: (page: number) => Promise<void>;
  canSelectItem?: boolean;
  currentPage: number;
  totalItem: number;
}

export interface IState {
  data: IDataTable[];
  isSelectAll: boolean;
}
