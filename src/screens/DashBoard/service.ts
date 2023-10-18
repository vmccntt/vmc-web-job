import configServices from "../../utils/configServices";

export const getLogsByCode = async (jobCode: string) => {
  const result = await configServices.getService<any>(
    `crm/logs?jobCode=${jobCode}`,
    null,
    null,
    true
  );
  return result;
};

export const getAllJob = async () => {
  const result = await configServices.getService<any>(
    `crm/jobs`,
    null,
    null,
    true
  );
  return result;
};

export const updateStatusJob = async (body: any) => {
  const result = await configServices.postService<any>(
    "crm/updateStatusTimer",
    body
  );
  return result;
};
export const startSchedule = async (body: any) => {
  const result = await configServices.postService<any>(
    body.type,
    body
  );
  return result;
};