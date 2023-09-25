import configServices from "../../../utils/configServices";
import { InforContact, ISearchInforContact } from "../inforContact.model";

export const createInforContact = async (body: InforContact) => {
  const result = await configServices.postService<InforContact>("contact", {
    ...body,
    isCreateContent: false,
  });
  return result;
};

export const deleteInforContact = async (param: number) => {
  const result = await configServices.deleteService<InforContact>(
    `contact/${param}`
  );
  return result;
};

export const updateInforContact = async (id: number, param: any) => {
  const result = await configServices.patchService<InforContact>(
    `contact/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getInforContact = async (id: number) => {
  const result = await configServices.getService<InforContact>(
    `contact/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getInforContacts = async (filter?: ISearchInforContact) => {
  const result = await configServices.getService<InforContact>(
    `contact`,
    filter,
    null,
    true
  );
  return result;
};
