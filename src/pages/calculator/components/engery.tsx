import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const Engery = () => {
  return (
    <>
      <ProFormText name="location" label="Location" width="md" placeholder="Enter name" />
      <ProFormText
        name="electricitySource"
        label="Electricity Source"
        width="md"
        placeholder="Enter name"
      />
      <ProFormDigit width="md" name="electricity" label="Electricity" placeholder="0" />
      <ProFormText name="ratio" label="Ratio" width="md" placeholder="Enter name" />
    </>
  );
};

export default Engery;
