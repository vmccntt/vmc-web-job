import { Select } from "antd";
import _, { debounce, get } from "lodash";
import { useMemo, useState } from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { categoryTreeOption } from "../../utils";

import {
  getCategoriesTree,
  getCategory,
} from "../../screens/category/services";
import {
  ILanguage,
  ISearchLanguage,
} from "../../screens/language/language.model";
import { getLanguages } from "../../screens/language/services";

const LanguageComponent = ({
  notCode,
  codeDefault,
  onSelect,
  onClear,
}: {
  notCode?: string;
  codeDefault?: string;
  onSelect?: (code: string) => void;
  onClear?: () => void;
}) => {
  // start category


  const [languageState, languageStateFn] = useAsyncFn(
    async (params: ISearchLanguage) => {
      return getLanguages(params);
    }
  );


  const SelectOptions = () => {
    const list: ILanguage[] = get(languageState, "value.data", []);
    let option = list
      ? list.map((m) => ({
          label: m.name,
          value: m.code,
        }))
      : [];
    if(notCode)  option = option.filter(f => f.value !== notCode);
    return option;
  };

  //#end category

  useEffectOnce(() => {
    languageStateFn({});
  });
  return (
    <>
      <Select
        // optionFilterProp="name"
        className="w-full"
        onSelect={onSelect}
        onClear={onClear}
        value={codeDefault}
        allowClear
        showSearch
        // onSearch={(name) => debounceLoadCategory({ name })}
        filterOption={(search, item) =>
          String(item?.label).toLowerCase().indexOf(search.toLowerCase()) >= 0
        }
        options={SelectOptions()}
      />
    </>
  );
};

export default LanguageComponent;
