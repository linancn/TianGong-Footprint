import { getMaterialTypeSelectItems } from '@/services/factorMaterial/api';
import { getProcessCategorySelectItems } from '@/services/factorMaterialProcess/api';
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
  materialCategory: string;
  materialType: string;
};
const { Option } = Select;

const ProcessCategorySelector: FC<Props> = ({
  value,
  onChange,
  materialCategory,
  materialType,
}) => {
  // const [thisMaterialType, setThisMaterialType] = useState<any>('');
  const [selectData, setSelectData] = useState(<></>);
  const [selectValue, setSelectValue] = useState<any>('');
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (materialCategory.length > 0 && materialType.length > 0) {
      setLoadData(true);
      setSelectValue('');
      setSelectData(<></>);
      setSelectDisabled(true);
      getMaterialTypeSelectItems(materialCategory).then((resultC) => {
        setLoadData(false);
        for (const rc of resultC) {
          if (rc.label === materialType) {
            setLoadData(true);
            getProcessCategorySelectItems(materialType).then((resultT) => {
              for (const rt of resultT) {
                if (rt.label === value) {
                  setSelectValue(value);
                  break;
                }
              }
              setSelectData(
                resultT.map((item: any) => (
                  <Option key={item.label} value={item.value}>
                    {item.label}
                  </Option>
                )),
              );
              setLoadData(false);
              setSelectDisabled(false);
            });
            break;
          }
        }
      });
    } else {
      setSelectDisabled(true);
      setSelectValue('');
      setSelectData(<></>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialCategory, materialType]);
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

export default ProcessCategorySelector;
