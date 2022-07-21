import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getTransportModeSelectItems() {
  return request<any>(
    `${getServiceHostName()}/api/factorTransportation/getTransportModeSelectItems`,
    {
      method: 'GET',
    },
  );
}
