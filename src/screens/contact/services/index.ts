import configServices from "../../../utils/configServices";
import { IContact, ISearchContact } from "../contact.model";

export const createContact = async (body: IContact) => {
  const result = await configServices.postService<IContact>("infor", {
    ...body,
    isCreateContent: false,
  });
  return result;
};

export const deleteContact = async (param: number) => {
  const result = await configServices.deleteService<IContact>(
    `infor/${param}`
  );
  return result;
};

export const updateContact = async (id: number, param: any) => {
  const result = await configServices.patchService<IContact>(
    `infor/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getContact = async (id: number) => {
  const result = await configServices.getService<IContact>(
    `infor/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getContacts = async (filter?: ISearchContact) => {
  const result = await configServices.getService<IContact>(
    `infor`,
    filter,
    null,
    true
  );
  return result;
};
