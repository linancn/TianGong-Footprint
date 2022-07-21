import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getElectricitySourceSelectItems() {
  return request<any>(
    `${getServiceHostName()}/api/factorElectricity/getElectricitySourceSelectItems`,
    {
      method: 'GET',
    },
  );
}
