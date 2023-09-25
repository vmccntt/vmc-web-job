import configServices from "../../../utils/configServices";
import { ILanguage, ISearchLanguage, ILanguageAction } from "../language.model";

export const createLanguage = async (body: ILanguageAction) => {
  const result = await configServices.postService<ILanguage>("language", {
    ...body,
  });
  return result;
};

export const deleteLanguage = async (param: number) => {
  const result = await configServices.deleteService<ILanguage>(
    `language/${param}`
  );
  return result;
};

export const updateLanguage = async (id: number, param: ILanguageAction) => {
  const result = await configServices.patchService<ILanguage>(
    `language/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getLanguage = async (id: number) => {
  const result = await configServices.getService<ILanguage>(
    `language/${id}`,
    null,
    null,
    true
  );
  return result;
};
function compare(a: any, b: any) {
  if (a.isDefault > b.isDefault) {
    return -1;
  }
  if (a.isDefault < b.isDefault) {
    return 1;
  }
  return 0;
}
export const getLanguages = async (filter?: ISearchLanguage) => {
  const result = await configServices.getService<any>(
    `language`,
    filter,
    null,
    true
  );
  if(result && result?.data) {
    let data: ILanguage[] = result.data;
    data = data.sort((a, b) => compare(a, b));
    localStorage.setItem("language", JSON.stringify(data));
  }
  return result;
};
