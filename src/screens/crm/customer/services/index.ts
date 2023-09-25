import configServices from "../../../../utils/configServices";

//  Get List customer
export const getListCustomerCond = async (body: {}) => {
  const result = await configServices.postService<any>(
    "customer",
    { ...body }
  );
  return result;
};
// Get Detail Customer By MaDoiTac
export const getDetailCustomerByMaDoiTac = async (id: string) => {
  const result = await configServices.postService<any>(
    "customer/detail",
    {id}
  );
  return result;
};
// Get All Group
export const getAllGroup = async () => {
  const result = await configServices.postService<any>(
    "customer/getAllGroup",
    null
  );
  return result;
};
//  Get Data grandAmountCompany
export const getGrandAmountCompany = async (body: {}) => {
  const result = await configServices.postService<any>(
    "customer/grandAmountCompany",
    { ...body }
  );
  return result;
};