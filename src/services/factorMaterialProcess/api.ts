import { request } from 'umi';
import { getServiceHostName } from '../setting';

export async function getProcessCategorySelectItems(materialType: string) {
  return request<any>(
    `${getServiceHostName()}/api/factorMaterialProcess/getProcessCategorySelectItems/${materialType}`,
    {
      method: 'GET',
    },
  );
}

export async function getProcessTypeSelectItems(materialType: string, processCategory: string) {
  return request<any>(
    `${getServiceHostName()}/api/factorMaterialProcess/getProcessTypeSelectItems/${materialType}/${processCategory}`,
    {
      method: 'GET',
    },
  );
}
