import { Moment } from "moment";
import { GenderEnum } from "../../utils/enum";

export interface IRecruiment {
  id: number,
  name?: string;
  birthday?: Date| Moment;
  createdAt?: Date| Moment | string;
  updatedAt?: Date| Moment | string;
  gender?: GenderEnum;
  phone?: string;
  email?: string;
  nominee?: string;
  trainingPlaces?: string;
  graduationYear?: string | Moment;
  specialized?: string;
  ranking?: string;
  degree?: string;
  cv?: string | null;
  cvId?: number | null;
}
export interface IRecruimentAction {
  name?: string;
  birthday?: Date| Moment;
  gender?: GenderEnum;
  phone?: string;
  email?: string;
  nominee?: string;
  trainingPlaces?: string;
  graduationYear?: string;
  specialized?: string;
  ranking?: string;
  degree?: string;
  cv?: string ;
  cvId?: number;
}
export interface ISearchRecruiment {
  name?: string;
  phone?: string;
  email?: string;
}
