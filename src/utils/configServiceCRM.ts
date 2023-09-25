import _ from "lodash";
import { formatDataObj, getToken, showToast } from ".";
import { API_MEDIA, RESPONSE_STATUS } from "../constant";
import { IResponseErrorHandle } from "../models";
import axios, { AxiosRequestConfig } from "axios";

const _responseConfig = async (response: Response) => {
  if (
    response.status === RESPONSE_STATUS.SUCESS ||
    response.status === RESPONSE_STATUS.CREATE_SUCCESS
  ) {
    return await response.json();
  }

  // handle error

  if (response.status === RESPONSE_STATUS.ACCESS_DENIED) {
    localStorage.clear();
    window.location.href = "/login";
  }

  try {
    const result: IResponseErrorHandle = await response.json();
    throw Error(result.message.toString());
  } catch (error: any) {
    const message = error.message;
    throw Error(
      message ? message : "Máy chủ gặp lỗi. Vui lòng liên hệ quản trị viên"
    );
  }
  // if (response.status === RESPONSE_STATUS.NOT_FOUND)
  //   throw Error('Máy chủ không phản hồi. Vui lòng liên hệ quản trị viên');
  // if (response.status === RESPONSE_STATUS.INTERVAL_SERVER) {
  //   const result = await response.json();
  //   throw Error(result.error_description);
  // }
};

const postService = async <T>(
  url: string,
  bodyPost: any,
  isAuthorization = true,
  isFormData = false,
  method?: string
): Promise<T> => {
  try {
    const body = bodyPost ? formatDataObj(bodyPost) : bodyPost;
    const headers: any = isFormData
      ? {}
      : { Accept: "application/json", Authorization: "MES dm1jbWVzOnZtY21lcw==", 'Referrer-Policy': 'origin' };
    if (isAuthorization) {
      headers.Authorization = `MES dm1jbWVzOnZtY21lcw==`;
    }
    const requestInit: any = { method: "POST", headers };
    if (body) {
      if (typeof body === "object" && !Array.isArray(body)) {
        Object.keys(body).forEach((key) => {
          if (body[key] === null || body[key] === undefined || body[key] === "")
            delete body[key];
        });
      }
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_ERP_URL}${url}`,
      requestInit
    );
    if (url === "auth/logout") localStorage.clear();
    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

export const axonizeRequestService = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    config.url = `${process.env.REACT_APP_API_ERP_URL}${config.url}`;
    const headers: any = config?.headers || {};
    headers["Authorization"] = `Bearer ${getToken()}`;
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const postServiceMedia = async <T>(
  url: string,
  body: any,
  isAuthorization = true,
  isFormData = false
): Promise<T> => {
  try {
    const headers: any = isFormData
      ? {}
      : { Accept: "application/json", "Content-Type": "application/json" };
    if (isAuthorization) {
      headers.Authorization = `Bearer ${getToken()}`;
    }
    const requestInit: any = { method: "POST", headers };
    if (body)
      if (isFormData) requestInit.body = body;
      else requestInit.body = JSON.stringify(body);

    const response = await fetch(`${API_MEDIA}${url}`, requestInit);

    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const getServiceMedia = async <T>(
  url: string,
  params?: any,
  body?: object | null,
  isAuthorization = true
): Promise<T> => {
  try {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (isAuthorization) {
      headers.Authorization = `Bearer ${getToken()}`;
    }
    const requestInit: any = { method: "GET", headers };
    if (body) requestInit.body = JSON.stringify(body);
    let queryString = "";
    const paramsData: string[] = [];
    if (params && !_.isEmpty(params)) {
      Object.keys(params).forEach((key) => {
        if (params[key]) paramsData.push(`${key}=${params[key] || ""}`);
      });
    }
    queryString = paramsData.length ? `?${paramsData.join("&")}` : "";
    const response = await fetch(
      `${API_MEDIA}${url}${encodeURI(queryString)}`,
      requestInit
    );
    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const getService = async <T>(
  url: string,
  params?: any,
  body?: any,
  isAuthorization = true
): Promise<T> => {
  try {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (isAuthorization) {
      headers.Authorization = `Bearer ${getToken()}`;
    }
    const requestInit: any = { method: "GET", headers };
    if (body) {
      requestInit.body = JSON.stringify(body);
    }
    let queryString = "";
    const paramsData: string[] = [];
    if (params && !_.isEmpty(params)) {
      Object.keys(params).forEach((key) => {
        if (
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== "" &&
          params[key] !== "null"
        )
          paramsData.push(`${key}=${params[key].toString() || ""}`);
      });
    }
    queryString = paramsData.length ? `?${paramsData.join("&")}` : "";
    const response = await fetch(
      `${process.env.REACT_APP_API_ERP_URL}${url}${encodeURI(queryString)}`,
      requestInit
    );
    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const deleteService = async <T>(url: string): Promise<T> => {
  try {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    };
    const requestInit: any = { method: "PATCH", headers };

    const response = await fetch(
      `${process.env.REACT_APP_API_ERP_URL}${url}/delete`,
      requestInit
    );

    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const patchService = async <T>(url: string, body?: object): Promise<T> => {
  try {
    const headers: any = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    };

    const requestInit: any = { method: "PATCH", headers };
    if (body) {
      requestInit.body = JSON.stringify(formatDataObj(body));
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_ERP_URL}${url}`,
      requestInit
    );

    return await _responseConfig(response);
  } catch (error: any) {
    showToast(error.message, "error");
    throw error;
  }
};

const configServicesCrm = {
  postService,
  getService,
  deleteService,
  patchService,
  postServiceMedia,
  getServiceMedia,
  axonizeRequestService,
};

export default configServicesCrm;
