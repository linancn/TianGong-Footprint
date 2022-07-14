import { ProCard, ProFormDigit, ProFormText } from '@ant-design/pro-components';

const Engery = () => {
  return (
    <>
      <ProCard hoverable bordered>
        <ProFormText name="location" label="Location" width="md" placeholder="Enter" />
        <ProFormText
          name="electricitySource"
          label="Electricity Source"
          width="md"
          placeholder="Enter"
        />
        <ProFormDigit width="md" name="electricity" label="Electricity" placeholder="0" />
        <ProFormText name="ratio" label="Ratio" width="md" placeholder="Enter" />
      </ProCard>

      <ProCard hoverable bordered>
        <ProFormText name="co2e" label="CO2-e in manufacture" width="md" placeholder="Enter" />
      </ProCard>
    </>
  );
};

export default Engery;
