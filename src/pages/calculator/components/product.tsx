import { ProFormText } from '@ant-design/pro-components';
import { useIntl } from 'umi';
const Product = () => {
  const intl = useIntl();
  return (
    <>
      <ProFormText
        name="projectName"
        label={intl.formatMessage({
          id: 'calculator.productName',
          defaultMessage: 'Product Name',
        })}
        width="md"
        placeholder={intl.formatMessage({
          id: 'calculator.enter',
          defaultMessage: 'Enter',
        })}
        rules={[{ required: true }]}
      />
      {/* <ProFormDigit
        width="md"
        addonAfter="grams"
        name="totalProductWeignt"
        label="TOTAL PRODUCT WEIGHT"
        placeholder="0"
        fieldProps={{}}
        rules={[{ required: true }]}
      /> */}
      {/* <ProFormText
        name="projectCategory"
        label="PRODUCT CATEGORY"
        width="md"
        placeholder="Enter"
        rules={[{ required: true }]}
       />*/}
    </>
  );
};
export default Product;
