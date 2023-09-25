import configServices from "../../../utils/configServices";
import { PartnerTypeEnum } from "../../../utils/enum";
import { IPartner, ISearchUser } from "../certificate.model";

export const createPartner = async (body: IPartner) => {
  const result = await configServices.postService<IPartner>("partner", {
    ...body,
    type: PartnerTypeEnum.CERTIFICATE,
  });
  return result;
};

export const deletePartner = async (param: number) => {
  const result = await configServices.deleteService<IPartner>(
    `partner/${param}`
  );
  return result;
};

export const updatePartner = async (id: number, param: any) => {
  const result = await configServices.patchService<IPartner>(`partner/${id}`, {
    ...param,
    isCreateContent: false,
  });
  return result;
};

export const getPartner = async (id: number) => {
  const result = await configServices.getService<IPartner>(
    `partner/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getPartners = async (filter?: ISearchUser) => {
  if (filter) filter.type = PartnerTypeEnum.CERTIFICATE;
  const result = await configServices.getService<IPartner>(
    `partner`,
    filter,
    null,
    true
  );
  return result;
};
