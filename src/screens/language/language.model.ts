import { Moment } from "moment";

export interface ILanguage {
  id: number;
  name: string,
  isDefault?: boolean,
  code: string,
  description?: string,
  image?: string,
  updatedAt?: string | Moment;
  createdAt?: string | Moment;
}
export interface ILanguageAction {
  name?: string,
  code?: string,
  description?: string,
  isDefault?: boolean,
  image?: string,
}
export interface ISearchLanguage {
  name?: string,
  code?: string,
  description?: string,
}
