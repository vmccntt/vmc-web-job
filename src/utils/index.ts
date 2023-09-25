import { toast } from "react-toastify";
import config from "../constant";
import moment, { Moment } from "moment";
import { cloneDeep } from "lodash";
import { PERMISSION_ENUM } from "./permisson.enum";

export const showToast = (
  message: string,
  type: "warning" | "error" | "success" | "info"
) => {
  toast.dismiss();
  toast[type](message);
};

export const getSkip = (page: number) => {
  return page * config.itemsCountPerPage - config.itemsCountPerPage;
};

export const updateTree = <T>(
  data: T[],
  parent: T,
  node: T,
  type: "addNew" | "update"
) => {};
export const getAllChildToObject = (
  data: any[],
  result?: any[],
  parentId?: number
) => {
  result = result ? result : [];
  data.forEach((item) => {
    result?.push({ ...item, parentId });
    if (item.children.length) {
      return getAllChildToObject(item.children, result, item.id);
    }
    return;
  });
  return result;
};

export const currencyFormat = (num: number | string) => {
  if (!num) return "0";
  return parseInt(num.toString())
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const timeOut = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const getToken = () => {
  const token = localStorage.getItem(config.TOKEN);
  return token ? token : "";
};

export const deleteNullProp = (obj: any) => {
  for (const prop in obj) {
    if (obj[prop] == null || obj[prop]?.length === 0) {
      delete obj[prop];
    }
  }
  return obj;
}

export const trimParam = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj).replace(/\"\s+|\s+\"/g, '"'));
}

export const checkProps = (obj: any) => {
  if(obj) {
    for(let prop in obj) {
      if(typeof obj[prop] === 'string' && obj[prop].length === 0) {
        obj[prop] = "Không có dữ liệu";
      }
    }
  }
  return obj;
}

export const secondsToHms = (d: string | number) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + " giờ" : "";
  const mDisplay = m > 0 ? m + " phút" : "";
  const sDisplay = s > 0 ? s + " giây" : "";
  return `${hDisplay} ${mDisplay} ${sDisplay}`;
};

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const yesNoFunction = (check: string | number | boolean | any) => {
  return check ? "Có" : "Không";
};

export const defaultFilter = (filter: any = {}) => {
  const page = +filter?.page || 1;
  const limit = +filter?.limit || 10;
  const skip = (page - 1) * 10;
  delete filter["page"];
  return {
    ...filter,
    skip,
    limit,
  };
};

export const categoryTreeOption = (categories: any[]) => {
  return categories.map((cate) => {
    let children = cate["children"];
    if (children && Array.isArray(children)) {
      children = categoryTreeOption(children);
    }
    return {
      value: cate["id"],
      title: cate["title"],
      children,
    };
  });
};

export const DATE_FORMAT_DEFAULT = "DD-MM-YYYY";
export const formatDate: any = (date: string | Moment) => {
  return date ? moment(date).format(DATE_FORMAT_DEFAULT) : undefined;
};

export const currencyVnd = (amount: number) => {
  if (amount >= 1000000000) {
    const billion = amount / 1000000000;
    const formattedAmount = billion.toFixed(2);
    return `${formattedAmount} Tỷ`;
  } else if (amount >= 1000000) {
    const million = amount / 1000000;
    const formattedAmount = million.toFixed(2);
    return `${formattedAmount} Tr`;
  } else {
    return `${amount} đ`;
  }
}

export const formatDataObj = (data: any) => {
  let newData = cloneDeep(data);
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      newData = data.map((item) => formatObj(item));
    } else {
      newData = formatObj(data);
    }
  }
  return newData;
};
export const formatObj = (data: any) => {
  const newItem: any = {};
  for (const key in data) {
    if (data[key] !== "") newItem[key] = data[key];
  }
  return newItem;
};

export const REGEX = {
  phoneNumber: /^(((0|84)(([35789]\d{8})|[2](\d{9})))|(1[89])(\d{6,8}))$/,
  email:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
  spaces: /\s+/g,
  passWord: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/,
};

export const isCheckPermisson = (
  permissionObj: any = {},
  permission?: string | string[] | PERMISSION_ENUM | PERMISSION_ENUM[]
) => {
  if(!permission) return true;
  if (typeof permission === "string") {
    return permissionObj[permission];
  }
  let isCheck = false;
  for (let i = 0; i < permission.length; i++) {
    if (permissionObj[permission[i]]) {
      isCheck = true;
      break;
    }
  }
  return isCheck;
};
