import type { Project } from '@/services/data';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, StepsForm } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import Engery from './components/engery';
import Parts from './components/parts';
import Product from './components/product';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const formValue: Project = {
  projectName: '',
  totalProductWeignt: 0,
  projectCategory: '',
  supply: [
    {
      id: 1,
      material: '',
      materialCategory: '',
      materialType: '',
      packaging: '',
      totalMass: 0,
      processing: [],
      tansportation: [],
    },
  ],
  location: '',
  electricitySource: '',
  electricity: 0,
  ratio: '',
};

export default () => {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  useEffect(() => {
    waitTime(1000).then(() => {
      // 编辑场景下需要使用formMapRef循环设置formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  return (
    <ProCard>
      <StepsForm
        formMapRef={formMapRef}
        onFinish={(values) => {
          console.log(values);
          return Promise.resolve(true);
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm name="step1" title="Product">
          <Product />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step2" title="Upstream supply">
          <Parts supply={formValue.supply} />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step3" title="On site">
          <Engery />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
