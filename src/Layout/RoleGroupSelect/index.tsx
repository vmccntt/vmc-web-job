import { Select } from "antd";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { IUserState } from "../../screens/user/propState";
import { getRoleGroupAction } from "../../screens/user/slice";


const RoleSelectComponent = ({
  role,
  onSelect,
  onClear,
  disabled,
}: {
  filter?: any;
  role?: string;
  disabled?: boolean;
  onSelect?: (role: string) => void;
  onClear?: () => void;
}) => {
  // start category
  const dispatch = useDispatch();
  const userReducer = useAppSelector<IUserState>((state) => state.screens.user);
  //#end category
  useEffect(() => {
      dispatch(getRoleGroupAction({}) as any)
  }, [dispatch])
 
  return (
    <>
      <Select
        // optionFilterProp="name"
        className="w-full"
        onSelect={onSelect}
        onClear={onClear}
        value={role}
        allowClear
        showSearch
        disabled={disabled}
        options={userReducer.roleGroup}
      />
    </>
  );
};

export default RoleSelectComponent;
