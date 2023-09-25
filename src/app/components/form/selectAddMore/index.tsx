import { Button, Divider, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingAction } from '../../../commonSlice';
import { IInputFile } from '../propsState';
const { Option } = Select;

const SelectAddMoreComponent = (props: IInputFile) => {
  const { option, statusModal } = props;
  const [name, setName] = useState('');
  const [items, setItem] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.option.selectAddMoreData) {
      setItem(props.option.selectAddMoreData);
    }
  }, [props.option.selectAddMoreData, setItem]);
  useEffect(() => {
    if (!statusModal) {
      setValue('');
    }
  }, [statusModal]);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const nameDefault = option.getValues!(option.name);

  useEffect(() => {
    if (nameDefault && value !== nameDefault) {
      setValue(nameDefault);
    }
  }, [nameDefault, value]);

  const addItem = async () => {
    if (!name) return;
    if (!option.addNewSelectData) return [];
    try {
      dispatch(setLoadingAction(true));
      const response = await option.addNewSelectData({
        name: name,
        ...option.addNewSelectDataParams,
      });
      setItem([...items, response]);
      setName('');

      dispatch(setLoadingAction(false));
    } catch (error) {
      dispatch(setLoadingAction(false));
    }
  };

  const _changeSelect = (newValue: any) => {
    option.setValue && option.setValue(option.name, newValue);
    setValue(newValue);
  };
  return (
    <div>
      <Select
        value={value}
        onChange={_changeSelect}
        style={{ width: '100%' }}
        placeholder={`Chọn ${option.name}`}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
              <Button type="primary" ghost  onClick={addItem}>
                Thêm mới
              </Button>
            </div>
          </div>
        )}>
        {items &&
          items.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default SelectAddMoreComponent;
