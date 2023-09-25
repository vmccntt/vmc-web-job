import _ from "lodash";
import EditorComponent from "../app/components/form/editor/component";
import InputCalculatorComponent from "../app/components/form/inputCalculator";
import InputFileComponent from "../app/components/form/inputFile";
import InputFileAvatarComponent from "../app/components/form/inputFileAvatar";
import {
  IInputHook,
  IOptionElement,
  IOptionSelect,
} from "../app/components/form/propsState";
import SelectAddMoreComponent from "../app/components/form/selectAddMore";
import SelectAutoComplete from "../app/components/form/selectAutoComplete";

const _renderView = (data: any[]) => {
  return (
    <div className="formView">
      {data.map((value: string, index: number) => (
        <p key={index}>
          {index + 1} - {value}
        </p>
      ))}
    </div>
  );
};

export const renderRegister = (option: IInputHook) => {
  if (!option.register) return {};
  const valid = option.valid ? option.valid : {};
  return { ...option.register(option.name, valid) };
};

const _classNameDefault = (typeInput: any, classDefault?: string) => {
  if (classDefault) return classDefault;
  let className = "";
  switch (typeInput) {
    case "select":
      className = "form-control";
      break;

    case "textArea":
      className = "form-control";
      break;

    case "checkbox":
      className = "form-check-input";
      break;

    default:
      className = "form-control";
      break;
  }
  return className;
};

const _renderOptions = (
  option: IInputHook,
  optionsElement?: IOptionElement[]
) => {
  const rows: JSX.Element[] = [];
  let arOption: IOptionSelect[] = [];
  if (option.optionsSelect) {
    arOption = _.cloneDeep(option.optionsSelect);
  } else if (optionsElement && optionsElement.length) {
    const optionsByElement = _.findLast(
      optionsElement,
      (e) => e.key === option.name
    );
    if (optionsByElement) {
      arOption = optionsByElement.options;
    }
  }
  arOption.forEach((op, index) => {
    rows.push(
      <option key={`op-${index}`} value={op.value}>
        {op.label}
      </option>
    );
  });

  return rows;
};

const _renderInput = (
  option: IInputHook,
  key: string,
  statusModal: boolean,
  optionsElement?: IOptionElement[]
) => {
  if (option.labelOnly) return;
  let row = null;
  const error =
    option.errors && option.errors[option.name] ? "is-invalid" : null;
  let inputAttributes = option.inputAttributes
    ? _.cloneDeep(option.inputAttributes)
    : {};
  inputAttributes.className = _classNameDefault(
    option.typeInput,
    inputAttributes.className
  );
  if (error) {
    inputAttributes.className += ` ${error}`;
  }
  switch (option.typeInput) {
    case "select":
      row = (
        <select
          disabled={option.readonly}
          className={`${inputAttributes.className}`}
          id={key}
          // defaultValue={option.defaultValue ? option.defaultValue.toString() : ''}
          {...renderRegister(option)}
        >
          <option disabled value="">
            Chọn {option.title?.toLocaleLowerCase()}
          </option>
          {_renderOptions(option, optionsElement)}
        </select>
      );
      break;

    case "textArea":
      row = (
        <textarea
          disabled={option.readonly}
          id={key}
          className={inputAttributes.className}
          rows={2}
          {...renderRegister(option)}
          // defaultValue={option.defaultValue ? option.defaultValue.toString() : ''}
        />
      );
      break;

    case "checkbox":
      let defaultChecked =
        option.defaultValue && typeof option.defaultValue === "boolean"
          ? option.defaultValue
          : false;
      if (
        option.defaultValue !== null &&
        option.defaultValue !== undefined &&
        option.getValues &&
        option.object[option.name] !== null &&
        option.object[option.name] !== undefined
      ) {
        const value = option.getValues(option.name);
        if (value !== null && value !== undefined) {
          defaultChecked = value;
        }
      }
      row = (
        <>
          <br />
          <input
            disabled={option.readonly}
            type="checkbox"
            id={key}
            {...inputAttributes}
            {...renderRegister(option)}
            defaultChecked={defaultChecked}
          />
        </>
      );
      break;
    case "fileAvatar":
      row = (
        <InputFileAvatarComponent option={option} statusModal={statusModal} />
      );
      break;
    case "file":
      row = <InputFileComponent option={option} statusModal={statusModal} />;
      break;
    case "selectAuto":
      row = <SelectAutoComplete option={option} statusModal={statusModal} />;
      break;
    case "selectAddMore":
      row = (
        <SelectAddMoreComponent option={option} statusModal={statusModal} />
      );
      break;
    case "calculator":
      row = (
        <InputCalculatorComponent option={option} statusModal={statusModal} />
      );
      break;
    case "textEditor":
      row = <EditorComponent option={option} statusModal={statusModal} />;
      break;
    case "view":
      const values = option.getValues && option.getValues(option.name);
      if (values && !_.isEmpty(values)) {
        row = _renderView(values);
      }
      break;
    default:
      row = (
        <input
          disabled={option.readonly}
          id={key}
          {...inputAttributes}
          {...renderRegister(option)}
          // defaultValue={option.defaultValue ? option.defaultValue.toString() : ''}
        />
      );
      break;
  }
  return row;
};

export const renderInputFormHook = (
  option: IInputHook,
  key: string,
  statusModal: boolean,
  optionsElement?: IOptionElement[]
) => {
  return (
    <div className="form-group" key={key}>
      <label htmlFor={key} className={option.classNameTitle}>
        {option.title}
        {option.required && <span className="required">*</span>}
      </label>
      {_renderInput(option, key, statusModal, optionsElement)}
      {option.errors && option.errors[option.name] && (
        <span className="message-error">
          {option.errors[option.name].message}
        </span>
      )}
    </div>
  );
};
