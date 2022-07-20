import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getMaterialCategorySelectItems() {
  return request<any>(`${getServiceHostName()}/api/factorMaterial/getMaterialCategorySelectItems`, {
    method: 'GET',
  });
}

export async function getMaterialTypeSelectItems(category: string) {
  return request<any>(
    `${getServiceHostName()}/api/factorMaterial/getMaterialTypeSelectItems/${category}`,
    {
      method: 'GET',
    },
  );
}
