import { PostInterface } from "./../../../models/post";
import { IDataResponse, ISearchParam } from "../../../models";
import configServices from "../../../utils/configServices";
import { ICategory, ICategoryAction } from "../category.model";

export const createCategoryList = async (data: ICategory[]) => {
  const result = await configServices.postService<ICategory>("category/list", {
    data,
  });
  return result;
};

export const createCategory = async (body: ICategory) => {
  const result = await configServices.postService<ICategory>("category", {
    ...body,
    isCreateContent: false,
  });
  return result;
};

export const deleteCategory = async (param: number) => {
  const result = await configServices.deleteService<ICategory>(
    `category/${param}`
  );
  return result;
};

export const updateCategory = async (id: string, body: ICategory) => {
  body.parentId = body.parentId === 'null' ? null : body.parentId;
  const result = await configServices.patchService<ICategory>(
    `category/${id}`,
    { ...body, isCreateContent: false }
  );
  return result;
};

export const getCategory = async (id: string, language?: string) => {
  const result = await configServices.getService<ICategory>(
    `category/${id}`,
    { language },
    null,
    true
  );
  return result;
};

export const getCategories = async (filter?: any) => {
  const result = await configServices.getService<ICategory>(
    `category`,
    filter,
    null,
    true
  );
  return result;
};

export const getCategoriesTree = async (filter?: any) => {
  const result = await configServices.getService<ICategory>(
    `category/tree`,
    filter,
    null,
    true
  );
  return result;
};
