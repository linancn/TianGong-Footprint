import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, StepsForm } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';
import Engery from './components/engery';
import Packaging from './components/packaging';
import Parts from './components/parts';
import Product from './components/product';
import Results from './components/results';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('提交成功');
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="project"
          title="Product"
          stepProps={{
            description: 'project',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <Product />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="parts"
          title="Parts"
          stepProps={{
            description: 'parts',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <Parts />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="packaging"
          title="Packaging"
          stepProps={{
            description: 'packaging',
          }}
        >
          <Packaging />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="energy"
          title="Energy and Transportation"
          stepProps={{
            description: 'energy',
          }}
        >
          <Engery />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="results"
          title="Results"
          stepProps={{
            description: 'results',
          }}
        >
          <Results />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
