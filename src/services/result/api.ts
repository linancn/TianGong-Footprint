import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getResult(data?: Record<string, any>) {
  console.log(data);
  return request<any>(`${getServiceHostName()}/api/result/getResult`, {
    method: 'POST',
    data,
  });
}
