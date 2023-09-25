import { Select, TreeSelect } from "antd";
import { debounce, get } from "lodash";
import { useMemo } from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { ISearchPost } from "../../models/post";
import {
  ICategory,
  ISearchCategory,
} from "../../screens/category/category.model";
import {
  getCategoriesTree,
  getCategory,
} from "../../screens/category/services";
import { categoryTreeOption } from "../../utils";
// import { ExportToExcel } from '../../../app/components/exportExcel';
// import { useAppSelector } from '../../../app/hooks';
// import { searchCourse } from '../../../services/course';
// import { getCoursesAction, setSearchParamAction, setStatusModalAction } from '../slice';
// import { columnTable } from '../validation';
const { Option } = Select;

const defaultState: ISearchPost = {
  category: undefined,
  content: undefined,
  languages: undefined,
  name: undefined,
  title: undefined,
  order: undefined,
  page: 1,
  sort: undefined,
};

const CategorySelectTreeComponent = ({
  filter,
  categoryId,
  onSelect,
  onClear,
  categoryIds,
  languagesOther
}: {
  filter?: any;
  languagesOther?: any[];
  categoryIds?: any;
  categoryId?: string;
  onSelect?: (categoryId: string) => void;
  onClear?: () => void;
}) => {
  // start category
  const languaOther = languagesOther ? languagesOther: [];

  const [categorieDetailState, categorieDetaiStateFn] = useAsyncFn(
    async (id: string) => {
      return getCategory(id);
    }
  );

  const [categoriesState, categoriesStateFn] = useAsyncFn(
    async (params: ISearchCategory) => {
      return getCategoriesTree({ ...params, ...filter });
    }
  );

  const debounceLoadCategory = useMemo(
    () =>
      debounce((query: ISearchCategory) => {
        return categoriesStateFn({...query, ...filter});
      }, 500),
    [categoriesStateFn, filter]
  );

  const categoryOptions = () => {
    const categories: ICategory[] = get(categoriesState, "value.data", []);
    const data = categoryTreeOption(categories);
    return [...languaOther, ...data];
  };

  //#end category

  useEffectOnce(() => {
    categoriesStateFn({});
    if (categoryId) {
      categorieDetaiStateFn(categoryId);
    }
  });
  return (
    <>
      <TreeSelect
        // optionFilterProp="name"
        className="w-full"
        onSelect={onSelect}
        onClear={onClear}
        value={categoryId}
        allowClear
        showSearch
        onSearch={(title) => debounceLoadCategory({ title })}
        filterTreeNode={(search, item) =>
          String(item.title).toLowerCase().indexOf(search.toLowerCase()) >= 0
        }
        treeData={categoryOptions()}
      />
    </>
  );
};

export default CategorySelectTreeComponent;
