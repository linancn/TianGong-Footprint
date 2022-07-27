import { getElectricitySourceSelectItems } from '@/services/factorElectricity/api';
import { ProCard, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Engery = () => {
  const electricitySourceSelectItems = async () => getElectricitySourceSelectItems();
  const intl = useIntl();
  return (
    <>
      <ProCard hoverable bordered>
        <ProFormText
          name="location"
          label={intl.formatMessage({
            id: 'calculator.location',
            defaultMessage: 'Location',
          })}
          width="md"
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
          width="md"
          request={electricitySourceSelectItems}
        />
        <ProFormDigit
          width="md"
          name="electricity"
          label={intl.formatMessage({
            id: 'calculator.electricity',
            defaultMessage: 'Electricity',
          })}
          placeholder="0"
        />
        <ProFormText
          name="ratio"
          label={intl.formatMessage({
            id: 'calculator.ratio',
            defaultMessage: 'Ratio',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'calculator.enter',
            defaultMessage: 'Enter',
          })}
        />
      </ProCard>

      <ProCard hoverable bordered>
        <ProFormText
          name="manufactureCo2e"
          label={intl.formatMessage({
            id: 'calculator.manufactureCo2e',
            defaultMessage: 'CO2-e in manufacture',
          })}
          width="md"
          placeholder={intl.formatMessage({
            id: 'calculator.enter',
            defaultMessage: 'Enter',
          })}
        />
      </ProCard>
    </>
  );
};

export default Engery;
