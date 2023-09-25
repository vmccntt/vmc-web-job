import { string } from "yup";

export interface ICategory {
  id?: string;
  title: string;
  indexSort?: string;
  type?: number;
  bannerId?: number;
  path?: string;
  language?: string;
  languages?: ICategory[];
  slug?: string;
  url?: string;
  isMenu?: boolean;
  isDefault?: boolean;
  isHome?: boolean;
  isHomePage?: boolean;
  parentId?: string | null;
  categoryId?: string;
  description?: string;
}
export interface ICateCommom {
  bannerId?: number ,
  description?: string ,
  indexSort?: string ,
  parentId?: string ,
  isMenu?: boolean ,
  path?: string ,
  slug?: string ,
  type?: number ,
}
export interface ICategoryAction {
  title: string;
  indexSort: string;
  type?: number;
  bannerId?: number;
  path?: string;
  slug?: string;
  language?: string;
  categoryId?: string;
  url: string;
  isMenu?: boolean;
  isDefault?: boolean;
  isHome?: boolean;
  isHomePage?: boolean;
  languages?: ICategory[];
  parentId: string;
  description: string;
}

export interface ISearchCategory {
  title?: string;
  path?: string;
  slug?: string;
  description?: string;
  page?: number;
  isMenu?: boolean;
  parentId?: string;
}
