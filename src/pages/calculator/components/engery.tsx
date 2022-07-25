import { getElectricitySourceSelectItems } from '@/services/factorElectricity/api';
import { ProCard, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const Engery = () => {
  const electricitySourceSelectItems = async () => getElectricitySourceSelectItems();
  return (
    <>
      <ProCard hoverable bordered>
        <ProFormText name="location" label="Location" width="md" placeholder="Enter" />
        <ProFormSelect
          name="electricitySource"
          label="Electricity Source"
          width="md"
          request={electricitySourceSelectItems}
        />
        <ProFormDigit width="md" name="electricity" label="Electricity" placeholder="0" />
        <ProFormText name="ratio" label="Ratio" width="md" placeholder="Enter" />
      </ProCard>

      <ProCard hoverable bordered>
        <ProFormText
          name="manufactureCo2e"
          label="CO2-e in manufacture"
          width="md"
          placeholder="Enter"
        />
      </ProCard>
    </>
  );
};

export default Engery;
