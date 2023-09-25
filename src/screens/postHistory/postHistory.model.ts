import { Moment } from "moment";
import { Filters } from "../../models";

export interface PostHistoryInterface {
  id: number;
  name: string | undefined;
  title: string | undefined;
  contentHtml: any;
  icon: string | undefined;
  category?: string | undefined;
  languages?: string | undefined;
  content?: string | undefined;
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface ISearchPostHistory extends Filters {
  postId?: string | undefined;
  name?: string | undefined;
  title?: string | undefined;
  category?: string | undefined;
  languages?: string | undefined;
  content?: string | undefined;
}
