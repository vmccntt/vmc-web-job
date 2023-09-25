import { RouteComponentProps } from 'react-router';

export interface ISider extends RouteComponentProps {
  collapsed: boolean;
  changeCollapsed: (collapsed: boolean) => void;
}
