import { getElectricitySourceSelectItems } from '@/services/factorElectricity/api';
import { ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Divider } from 'antd';
import { useIntl } from 'umi';

const Engery = () => {
  const electricitySourceSelectItems = async () => getElectricitySourceSelectItems();
  const intl = useIntl();
  return (
    <>
      <ProFormText
        name="location"
        label={intl.formatMessage({
          id: 'calculator.location',
          defaultMessage: 'Location',
        })}
        style={{ width: '100%', minWidth: '100px' }}
        placeholder={intl.formatMessage({
          id: 'calculator.enter',
          defaultMessage: 'Enter',
        })}
      />
      <ProFormSelect
        name="electricitySource"
        label={intl.formatMessage({
          id: 'calculator.electricitySource',
          defaultMessage: 'Electricity Source',
        })}
        style={{ width: '100%', minWidth: '100px' }}
        request={electricitySourceSelectItems}
      />
      <ProFormDigit
        name="electricity"
        label={intl.formatMessage({
          id: 'calculator.electricity',
          defaultMessage: 'Electricity',
        })}
        style={{ width: '100%', minWidth: '100px' }}
        placeholder="0"
      />
      <ProFormText
        name="ratio"
        label={intl.formatMessage({
          id: 'calculator.ratio',
          defaultMessage: 'Ratio',
        })}
        style={{ width: '100%', minWidth: '100px' }}
        placeholder={intl.formatMessage({
          id: 'calculator.enter',
          defaultMessage: 'Enter',
        })}
      />

      <Divider />
      <ProFormText
        name="manufactureCo2e"
        label={intl.formatMessage({
          id: 'calculator.manufactureCo2e',
          defaultMessage: 'CO2-e in manufacture',
        })}
        style={{ width: '100%', minWidth: '100px' }}
        placeholder={intl.formatMessage({
          id: 'calculator.enter',
          defaultMessage: 'Enter',
        })}
      />
    </>
  );
};

export default Engery;
