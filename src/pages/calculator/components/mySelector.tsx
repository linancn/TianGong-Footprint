import { getMaterialTypeSelectItems } from '@/services/factorMaterial/api';
import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
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
const MySelector: FC<Props> = ({ value, onChange, category }) => {
  const [selectData, setSelectData] = useState(<></>);
  const [selectValue, setSelectValue] = useState<any>({});
  const [selectDisabled, setSelectDisabled] = useState(false);

  useEffect(() => {
    if (category.length > 0) {
      getMaterialTypeSelectItems(category).then((result) => {
        setSelectValue('');
        for (const r of result) {
          if (r.label === value) {
            setSelectValue(value);
            break;
          }
        }
        setSelectData(
          result.map((item: any) => (
            // eslint-disable-next-line react/jsx-key
            <Option value={item.value}>{item.label}</Option>
          )),
        );
        setSelectDisabled(false);
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
      allowClear={true}
      value={selectValue}
      disabled={selectDisabled}
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

export default MySelector;
