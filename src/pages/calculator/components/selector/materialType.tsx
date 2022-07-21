import { getMaterialTypeSelectItems } from '@/services/factorMaterial/api';
import { Select } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
  category: string;
};
const { Option } = Select;

const MaterialTypeSelector: FC<Props> = ({ value, onChange, category }) => {
  const [selectData, setSelectData] = useState(<></>);
  const [selectValue, setSelectValue] = useState<any>({});
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (category.length > 0) {
      setLoadData(true);
      setSelectValue('');
      setSelectData(<></>);
      getMaterialTypeSelectItems(category).then((result) => {
        for (const r of result) {
          if (r.label === value) {
            setSelectValue(value);
            break;
          }
        }
        setSelectData(
          result.map((item: any) => (
            <Option key={item.label} value={item.value}>
              {item.label}
            </Option>
          )),
        );
        setSelectDisabled(false);
        setLoadData(false);
      });
    } else {
      setSelectDisabled(true);
      setSelectValue('');
      setSelectData(<></>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return (
    <Select
      showSearch
      value={selectValue}
      disabled={selectDisabled}
      loading={loadData}
      onSelect={(sValue: any) => {
        setSelectValue(sValue);
      }}
      onChange={onChange}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
    >
      {selectData}
    </Select>
  );
};

export default MaterialTypeSelector;
