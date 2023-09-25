import configServices from "../../../utils/configServices";
import { IRecruiment, ISearchRecruiment, IRecruimentAction } from "../recruiment.model";

export const createRecruiment = async (body: IRecruimentAction) => {
  const result = await configServices.postService<IRecruiment>("recruiment", {
    ...body,
  });
  return result;
};

export const deleteRecruiment = async (param: number) => {
  const result = await configServices.deleteService<IRecruiment>(
    `recruiment/${param}`
  );
  return result;
};

export const updateRecruiment = async (id: number, param: IRecruimentAction) => {
  const result = await configServices.patchService<IRecruiment>(
    `recruiment/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getRecruiment = async (id: number) => {
  const result = await configServices.getService<IRecruiment>(
    `recruiment/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getRecruiments = async (filter?: ISearchRecruiment) => {
  const result = await configServices.getService<any>(
    `recruiment`,
    filter,
    null,
    true
  );
  return result;
};
