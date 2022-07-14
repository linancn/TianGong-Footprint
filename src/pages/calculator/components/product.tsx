import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const Product = () => {
  return (
    <>
      <ProFormText
        name="projectName"
        label="PRODUCT NAME"
        width="md"
        placeholder="Enter"
        // rules={[{ required: true }]}
      />
      <ProFormDigit
        width="md"
        name="totalProductWeignt"
        label="TOTAL PRODUCT WEIGHT"
        placeholder="0"
        // rules={[{ required: true }]}
      />
      <ProFormText
        name="projectCategory"
        label="PRODUCT CATEGORY"
        width="md"
        placeholder="Enter"
        // rules={[{ required: true }]}
      />
    </>
  );
};
export default Product;
