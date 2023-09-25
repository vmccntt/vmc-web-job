import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "antd";
import _ from "lodash";
import { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { renderInputFormHook } from "../../../utils/form";
import { IInputHook, IPropsModal } from "./propsState";
import "./styles.scss";
function ModalFormComponent(props: IPropsModal) {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: props.yupSchema ? yupResolver(props.yupSchema) : undefined,
  });

  const _resetForm = useCallback(() => {
    const _getDefaultValue = (element: IInputHook) => {
      const dataElement =
        props.data && !_.isEmpty(props.data) ? props.data[element.name] : "";
      if (
        element.typeInput === "checkbox" &&
        typeof dataElement !== "boolean"
      ) {
        return false;
      }
      return dataElement;
    };
    let objectReset: any = {};
    props.formElement.forEach((element: IInputHook) => {
      const defaultValue = _getDefaultValue(element);
      objectReset[element.name] = defaultValue;
    });
    reset(objectReset);
  }, [props.formElement, reset, props.data]);

  useEffect(() => {
    _resetForm();
  }, [props.open, _resetForm]);

  const _renderInputFormHook = (item: IInputHook, key: string) => {
    item.register = register;
    item.setValue = setValue;
    item.getValues = getValues;
    item.control = control;
    item.errors = errors;
    item.object = props.data;
    // if (props.data) {
    //   defaultValue = props.data[item.name];
    // }
    // item.defaultValue = defaultValue;
    return renderInputFormHook(item, key, props.open, props.optionsElement);
  };

  const _cfBeforeClose = () => {
    // if (true)
    // TO DO
    props.close && props.close(false, props.type);
  };

  const _renderRowsGroup = (itemsGroup: IInputHook[]) => {
    const rows: JSX.Element[] = [];
    itemsGroup.forEach((item, index) => {
      rows.push(
        <div className={item.groupCol} key={`itg-${index}`}>
          {_renderInputFormHook(item, `frkg-${item.groupName}${index}`)}
        </div>
      );
    });
    return rows;
  };

  const _renderFormControl = () => {
    const rows: JSX.Element[] = [];
    const arSkip: number[] = [];
    props.formElement.forEach((element, index) => {
      if (arSkip.indexOf(index) !== -1) return;

      // find add group item => same group same row

      const itemsGroup = props.formElement.filter((item, index) => {
        if (item.groupName && item.groupName === element.groupName) {
          arSkip.push(index);
          return true;
        }
        return false;
      });

      if (!itemsGroup.length) {
        const returnElement = _renderInputFormHook(element, `frk-${index}`);
        rows.push(returnElement);
      } else {
        const itHaveClassName = itemsGroup.find((item) => item.groupClassName);
        const rowsGroup = _renderRowsGroup(itemsGroup);

        rows.push(
          <div
            className={`${
              itHaveClassName?.groupClassName
                ? itHaveClassName?.groupClassName
                : "row"
            }`}
            key={`frk-${index}`}
          >
            {rowsGroup}
          </div>
        );
      }
    });
    return rows;
  };

  const _onSubmit = handleSubmit((data: any) => {
    props.onSubmit && props.onSubmit(data, props.type);
  });

  return (
    <Modal
      className="modal-form"
      closable={false}
      maskClosable={false}
      title={`${props.type === "addNew" ? "Thêm mới" : "Cập nhật"}`}
      style={{ top: 20 }}
      width={800}
      visible={props.open}
      onOk={_onSubmit}
      onCancel={_cfBeforeClose}
      okText="Lưu"
      forceRender={true}
      cancelText="Hủy"
      {...props}
    >
      {_renderFormControl()}
    </Modal>
  );
}

export default memo(ModalFormComponent);
