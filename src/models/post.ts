import { Moment } from "moment";
import { Filters } from ".";
import e from "express";

export interface PostInterface {
  id: number;
  name: string;
  slug?: string;
  title: string;
  postLanguageId?: string;
  contentHtml: any;
  contentHtmlCoppy?: any;
  icon: string;
  indexSort?: string;
  isPublish?: boolean;
  isDefault?: boolean;
  category?: string;
  language?: string;
  content?: string;
  createdAt?: string | Moment;
  updatedAt?: string | Moment;
}
export interface ISearchPost extends Filters {
  name?: string;
  title?: string;
  category?: string;
  languages?: string;
  content?: string;
}
export interface ISearchPostStatistical {
  year?: number;
  language?: string;
}

export interface IPostStatistical {
  time: string;
  count: number;
}
export interface IPostStatisticalResponse {
  statusCode: number;
  data: IPostStatistical[];
}
