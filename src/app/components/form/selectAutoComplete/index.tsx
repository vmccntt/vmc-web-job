import React, { useCallback, useEffect } from 'react';
import DebounceSelect from '../../debounceSelect';
import { IInputHook } from '../propsState';
interface IValue {
  label: string;
  value: string;
  firstLoad: boolean;
}

interface IProps {
  option: IInputHook;
  statusModal: boolean;
}

const SelectAutoComplete = (props: IProps) => {
  const { option, statusModal } = props;
  const arLabel = option.labelSelect?.split('|');
  const [value, setValue] = React.useState<IValue>({
    label: '',
    value: '',
    firstLoad: true,
  });
  useEffect(() => {
    if (!statusModal) {
      setValue({
        label: '',
        value: '',
        firstLoad: true,
      });
    } else {
      const arLabel = option.labelSelect?.split('|');
      if (option && value.firstLoad && option.object && option.object[option.name]) {
        setValue({
          label: '',
          value: '',
          firstLoad: false,
        });
        if (!option.autoSelectData) return;
        option.autoSelectData({ id: option.object[option.name] }).then((response) => {
          if (!response[0] || !response[0].length) return;
          const respondeData = response[0][0];
          if(!arLabel) return;
          const lables = arLabel?.map((l) => respondeData[l]);
          setValue({
            label: lables?.join(' - '),
            value: option.object[option.name],
            firstLoad: false,
          });
        });
      }
    }
  }, [statusModal, option, value.firstLoad]);

  const _fetchData = async (search: string): Promise<IValue[]> => {
    if (!option.autoSelectData) return [];
    if (search.length < 2) return [];
    return (
      option
        .autoSelectData({ name: search, fullName: search, ...option.autoSelectDataParam })
        // .then((response) => response.json())
        .then((response) => {
          if (!response[0]) return [];
          const respondeData = response[0];
          if (!option.labelSelect) return [];

          return respondeData.map((item: any) => {
            const lables = arLabel?.map((l) => item[l]);
            return { label: lables?.join(' - '), value: item.id };
          });
        })
    );
  };
  const _changeSelect = (newValue: IValue) => {
    setValue(newValue);
    option.setValue && option.setValue(option.name, newValue.value);
  };

  const checkError = useCallback(() => {
    return option.errors && option.errors[option.name];
  }, [option]);

  return (
    <div className={checkError() ? 'error-auto-select' : ''}>
      <DebounceSelect value={value} fetchOptions={_fetchData} onChange={_changeSelect} style={{ width: '100%' }} />
    </div>
  );
};

export default SelectAutoComplete;
