import { getElectricitySourceSelectItems } from '@/services/factorElectricity/api';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Divider } from 'antd';

const Engery = () => {
  const electricitySourceSelectItems = async () => getElectricitySourceSelectItems();
  return (
    <>
      <ProFormText
        name="location"
        label="Location"
        style={{ width: '100%', minWidth: '100px' }}
        placeholder="Enter"
      />
      <ProFormSelect
        name="electricitySource"
        label="Electricity Source"
        style={{ width: '100%', minWidth: '100px' }}
        request={electricitySourceSelectItems}
      />
      <ProFormDigit
        style={{ width: '100%', minWidth: '100px' }}
        name="electricity"
        label="Electricity"
        placeholder="0"
      />
      <ProFormText
        name="ratio"
        label="Ratio"
        style={{ width: '100%', minWidth: '100px' }}
        placeholder="Enter"
      />

      <Divider />
      <ProFormText
        name="manufactureCo2e"
        label="CO2-e in manufacture"
        style={{ width: '100%', minWidth: '100px' }}
        placeholder="Enter"
      />
    </>
  );
};

export default Engery;
