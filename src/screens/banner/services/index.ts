import { IDataResponse, ISearchParam } from "../../../models";
import configServices from "../../../utils/configServices";
import { BannerInterface, ISearchBanner } from "../banner.model";

export const createBanner = async (body: BannerInterface) => {
  const result = await configServices.postService<BannerInterface>("banner", {
    ...body,
    isCreateContent: false,
  });
  return result;
};

export const deleteBanner = async (param: number) => {
  const result = await configServices.deleteService<BannerInterface>(
    `banner/${param}`
  );
  return result;
};

export const updateBanner = async (id: number, param: any) => {
  const result = await configServices.patchService<BannerInterface>(
    `banner/${id}`,
    { ...param, isCreateContent: false }
  );
  return result;
};

export const getBanner = async (id: number) => {
  const result = await configServices.getService<BannerInterface>(
    `banner/${id}`,
    null,
    null,
    true
  );
  return result;
};

export const getBanners = async (filter?: ISearchBanner) => {
  const result = await configServices.getService<BannerInterface>(
    `banner`,
    filter,
    null,
    true
  );
  return result;
};
