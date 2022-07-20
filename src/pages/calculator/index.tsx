import type { Project, Supply } from '@/services/data';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, StepsForm } from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import Distribution from './components/distrbution';
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
      // materialCategory: '',
      // materialType: '',
      packaging: 'false',
      totalMass: 0,
      processing: [],
      transportation: [],
    },
  ],
  location: '',
  electricitySource: '',
  electricity: 0,
  ratio: '',
  co2e: '',
  destination: [{ id: 1, destinationPercentage: 0, destinationLocation: '', transportMode: '' }],
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
  // const ss: Supply[] = [];
  return (
    <ProCard>
      <StepsForm
        formMapRef={formMapRef}
        onFinish={(values: any) => {
          const ss: Supply[] = [];
          const result: Project = { supply: [] };
          for (const v in values) {
            if (v === 'supply') {
              values[v].forEach((ele: Supply) => {
                ele.processing =
                  values['process' + ele.id] === undefined ? [] : values['process' + ele.id];
                ele.transportation =
                  values['transportation' + ele.id] === undefined
                    ? []
                    : values['transportation' + ele.id];
                ss.push(ele);
              });
            } else if (v.indexOf('process') === -1 && v.indexOf('transportation') === -1) {
              result[v] = values[v];
            }
          }
          result.supply = ss;
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
        <StepsForm.StepForm name="step4" title="Distribution">
          <Distribution destination={formValue.destination} />
        </StepsForm.StepForm>
        {/* <StepsForm.StepForm name="step5" title="Result">
          <Results />
        </StepsForm.StepForm> */}
      </StepsForm>
    </ProCard>
  );
};
