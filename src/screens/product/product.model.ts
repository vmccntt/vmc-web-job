import { Moment } from "moment";
import { Filters } from "../../models";


export interface IProductInterface {
  id: number;
  name: string | undefined;
  slug?: string | undefined;
  title: string | undefined;
  postLanguageId?: string | undefined;
  contentHtml: any;
  icon: string | undefined;
  isPublish?: boolean | undefined;
  isDefault?: boolean | undefined;
  category?: string | undefined;
  language?: string | undefined;
  content?: string | undefined;
  createdAt?: string | Moment;
  updatedAt?: string | Moment;
}
export interface ISearchProduct extends Filters {
  name?: string ;
  title?: string ;
  category?: string ;
  languages?: string ;
  content?: string ;
}
