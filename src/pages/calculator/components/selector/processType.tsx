import { getMaterialTypeSelectItems } from '@/services/factorMaterial/api';
import {
  getProcessCategorySelectItems,
  getProcessTypeSelectItems,
} from '@/services/factorMaterialProcess/api';
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
  processCategory: string;
};
const { Option } = Select;

const ProcessTypeSelector: FC<Props> = ({
  value,
  onChange,
  materialCategory,
  materialType,
  processCategory,
}) => {
  const [selectData, setSelectData] = useState(<></>);
  const [selectValue, setSelectValue] = useState<any>({});
  const [selectDisabled, setSelectDisabled] = useState(true);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (materialCategory.length > 0 && materialType.length > 0 && processCategory.length > 0) {
      setLoadData(true);
      setSelectValue('');
      setSelectData(<></>);
      setSelectDisabled(true);
      getMaterialTypeSelectItems(materialCategory).then((resultC) => {
        setLoadData(false);
        for (const rc of resultC) {
          if (rc.label === materialType) {
            setLoadData(true);
            getProcessCategorySelectItems(materialType).then((resultPC) => {
              setLoadData(false);
              for (const rpc of resultPC) {
                if (rpc.label === processCategory) {
                  setLoadData(true);
                  getProcessTypeSelectItems(materialType, processCategory).then((result) => {
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
                    setLoadData(false);
                    setSelectDisabled(false);
                  });
                  break;
                }
              }
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
  }, [materialCategory, materialType, processCategory]);
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

export default ProcessTypeSelector;
