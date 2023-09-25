import { InputHTMLAttributes } from "react";
import {
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IData } from "../table/propState";
export interface IPropsModal {
  open: boolean;
  type: "addNew" | "update";
  data: IData | null | any;
  close: (isOpenModal: boolean, typeModal: "addNew" | "update") => void;
  yupSchema?: any;
  formElement: IInputHook[];
  optionsElement?: IOptionElement[];
  onSubmit: (data: any, type: string) => void;
  footer?: any[];
  width?: string | number;
}

export interface IOptionSelect {
  value: string;
  label: string;
  [key: string]: string | number | any;
}

export interface IOptionElement {
  key: string;
  options: IOptionSelect[];
}

export interface IInputHook {
  title?: string;
  required?: boolean;
  typeInput?:
    | "input"
    | "textArea"
    | "select"
    | "checkbox"
    | "radio"
    | "file"
    | "fileAvatar"
    | "video"
    | "selectAuto"
    | "selectAddMore"
    | "currency"
    | "calculator"
    | "textEditor"
    | "view";
  placeholder?: string;
  name: string;
  errors?: any;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  register?: UseFormRegister<any>;
  valid?: RegisterOptions;
  optionsSelect?: IOptionSelect[];
  defaultValue?: string | number | ReadonlyArray<string> | undefined | boolean;
  groupName?: string;
  groupCol?: string;
  groupClassName?: string;
  setValue?: UseFormSetValue<any>;
  accept?: string;
  getValues?: UseFormGetValues<any>;
  isOpen?: boolean;
  labelOnly?: boolean;
  readonly?: boolean;
  classNameTitle?: string;
  autoSelectData?: (param: any) => Promise<any>;
  labelSelect?: string;
  uploadType?: "lessons" | "courses" | "defaults" | "";
  selectAddMoreData?: IOptionSelect[];
  addNewSelectData?: (param: any) => Promise<any>;
  addNewSelectDataId?: string | number;
  addNewSelectDataParams?: any;
  autoSelectDataParam?: any;
  object?: any;
  calculator?: string;
  control?: any;
  suffix?: string;
}

export interface IInputFile {
  option: IInputHook;
  statusModal: boolean;
  type?: "file" | "video";
}

export interface IInputCurrency {
  option: IInputHook;
  statusModal?: boolean;
}
