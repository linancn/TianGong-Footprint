import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';

const Product = () => {
  return (
    <>
      <ProFormText
        name="name"
        label="PRODUCT NAME"
        width="md"
        placeholder="Enter name"
        // rules={[{ required: true }]}
      />
      <ProFormDigit
        width="md"
        name="weight"
        label="TOTAL PRODUCT WEIGHT"
        placeholder="0"
        // rules={[{ required: true }]}
      />
      <ProFormSelect
        width="md"
        fieldProps={{
          labelInValue: true,
        }}
        request={async () => [
          { label: 'category1', value: 'category1' },
          { label: 'category2', value: 'category2' },
        ]}
        name="category"
        label="PRODUCT CATEGORY"
        placeholder="Category"
      />
    </>
  );
};
export default Product;
