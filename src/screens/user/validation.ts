import * as yup from "yup";
import { IInputHook } from "../../app/components/form/propsState";
import { IColumnExport } from "../../models";
export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(3, "Tên phải tối thiểu 3 kí tự")
      .required("Tên khóa học không được để trống"),
    title: yup.string().required("Tiêu đề không được để trống"),
    language: yup.string().required("Chưa chọn ngôn ngữ"),
    contentHtml: yup
      .string()
      .min(3, "Nội dung khóa học phải tối thiểu 3 kí tự")
      .required("Nội dung không được để trống"),
  })
  .required();

export const formElement: IInputHook[] = [
  {
    title: "Tên",
    name: "name",
    required: true,
  },
  {
    title: "Tiêu đề",
    name: "title",
    required: true,
    typeInput: "input",
  },
  {
    title: "Mô tả",
    name: "content",
    required: false,
    typeInput: "textArea",
  },
  {
    title: "Nội dung",
    name: "contentHtml",
    required: true,
    typeInput: "textArea",
  },
  {
    title: "Ngôn ngữ",
    name: "language",
    required: true,
    typeInput: "select",
    optionsSelect: [
      { label: "Tiếng Việt", value: "VI" },
      { label: "Tiếng Anh", value: "EN" },
    ],
  },
];

export const columnTable: IColumnExport[] = [];
