export enum SORT_ENUM {
  ASC = "ASC",
  DESC = "DESC",
}

export enum INFOR_TYPE_ENUM {
  WAIT = "WAIT",
  CONTACTED = "CONTACTED",
  CANCEL = "CANCEL",
}
const InforTypeFormat: any = {};
InforTypeFormat[INFOR_TYPE_ENUM.WAIT] = "Đang chờ";
InforTypeFormat[INFOR_TYPE_ENUM.CONTACTED] = "Đã liên hệ";
InforTypeFormat[INFOR_TYPE_ENUM.CANCEL] = "Đã hủy";
InforTypeFormat[""] = "Không xác định";

export default InforTypeFormat;

export enum PartnerTypeEnum {
  PARTNER = "PARTNER",
  CERTIFICATE = "CERTIFICATE",
}
export enum FileTypeEnum {
  DEFAULT = "DEFAULT",
  BANNER = "BANNER",
  ICON = "ICON",
  AVATAR = "AVATAR",
  IMAGE = "IMAGE",
  POST = "POST",
  CV = "CV",
}
export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum DegreeEnum {
  PROFESSOR = "PROFESSOR",
  PHD = "PHD",
  MASTER = "MASTER",
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  INTERMEDIATE = "INTERMEDIATE",
  CERTIFICATE = "CERTIFICATE",
  OTHER = "OTHER",
}

export const DegreeOtp = [
  {
    label: "--",
    value: "",
  },
  {
    label: "Giáo sư",
    value: DegreeEnum.PROFESSOR,
  },
  {
    label: "Tiến sỹ",
    value: DegreeEnum.PHD,
  },
  {
    label: "Thạc sỹ",
    value: DegreeEnum.MASTER,
  },
  {
    label: "Đại học",
    value: DegreeEnum.UNIVERSITY,
  },
  {
    label: "Cao đẳng",
    value: DegreeEnum.COLLEGE,
  },
  {
    label: "Trung cấp",
    value: DegreeEnum.INTERMEDIATE,
  },
  {
    label: "Chứng chỉ",
    value: DegreeEnum.CERTIFICATE,
  },
  {
    label: "Khác",
    value: DegreeEnum.OTHER,
  },
];

export enum RankingEnum {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  RATHER = "RATHER",
  MEDIUM = "MEDIUM",
  WEAK = "WEAK",
  LEAST = "LEAST",
}
export const RankingOtp = [
  {
    label: "--",
    value: "",
  },
  {
    label: "Xuất sắc",
    value: RankingEnum.EXCELLENT,
  },
  {
    label: "Giỏi",
    value: RankingEnum.GOOD,
  },
  {
    label: "Khá",
    value: RankingEnum.RATHER,
  },
  {
    label: "Trung bình",
    value: RankingEnum.MEDIUM,
  },
  {
    label: "Yếu",
    value: RankingEnum.WEAK,
  },
  {
    label: "Kém",
    value: RankingEnum.LEAST,
  },
];

export enum InforPurposeEnum {
  ORDER = "order",
  CLIENT = "client",
}

export const InforPurpose = {
  order: "Đặt hàng",
  client: "Đối tác",
};

export enum DISPLAY_TYPE_CATEGORY_ENUM {
  ABOUT_US = 1,
  STATISTICAL = 2,
  BUSINESS_AREAS= 3,
  FEATURED_NEWS = 4,
  PARTNER_AND_CERTIFICATE = 5,
  INTRODUCE = 6,
  MISSION_AND_VISION = 8,
  LEADERSHIP = 9,
  NEWS = 10,
  NEWS11 = 11,
  HUMAN = 12,
  PRODUCT = 20,
  CATEGORY_PRODUCT = 21,
}
