import { waitTime } from '@/helper/waitTime';
import type { Project } from '@/services/data';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, StepsForm } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Distribution from './components/distrbution';
import Engery from './components/engery';
import Parts from './components/parts';
import Product from './components/product';
import Results from './components/results';

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

const baseData: Project = {
  projectName: '',
  // totalProductWeignt: 0,
  // projectCategory: '',
  supply: [
    {
      id: uuidv4(),
      material: '',
      materialCategory: '',
      materialType: '',
      packaging: 'false',
      totalMass: 0,
      processing: [],
      transportation: [],
    },
  ],
  location: '',
  electricitySource: '',
  electricity: 0,
  ratio: 0,
  co2e: 0,
  destination: [
    { id: uuidv4(), destinationPercentage: 0, destinationLocation: '', transportMode: '' },
  ],
};

const testData: Project = {
  projectName: 'Test',
  supply: [
    {
      id: uuidv4(),
      material: 'Part1',
      materialCategory: 'Metal',
      materialType: 'Aluminium',
      packaging: 'false',
      totalMass: 150,
      processing: [
        {
          id: uuidv4(),
          processCategory: 'Casting',
          processType: 'Casting Lost-wax Aluminium',
        },
      ],
      transportation: [
        {
          id: uuidv4(),
          supplierPercentage: 50,
          supplierLocation: 'Xiamen',
          transportMode: 'Lorry',
          distance: 434.4,
        },
        {
          id: uuidv4(),
          supplierPercentage: 50,
          supplierLocation: 'Beijing',
          transportMode: 'Train',
          distance: 1927,
        },
      ],
    },
    {
      id: uuidv4(),
      material: 'Part2',
      materialCategory: 'Metal',
      materialType: 'Steel',
      packaging: 'false',
      totalMass: 500,
      processing: [],
      transportation: [
        {
          id: uuidv4(),
          supplierPercentage: 20,
          supplierLocation: 'Guangzhou',
          transportMode: 'Lorry',
          distance: 105,
        },
        {
          id: uuidv4(),
          supplierPercentage: 80,
          supplierLocation: 'Shanghai',
          transportMode: 'Train',
          distance: 1250,
        },
      ],
    },
    {
      id: uuidv4(),
      material: 'Cover',
      materialCategory: 'Plastics',
      materialType: 'Polyester',
      packaging: 'true',
      totalMass: 50,
      processing: [],
      transportation: [
        {
          id: uuidv4(),
          supplierPercentage: 100,
          supplierLocation: 'Guangzhou',
          transportMode: 'Lorry',
          distance: 105,
        },
      ],
    },
  ],
  location: 'Shenzhen',
  electricitySource: 'non-renew',
  electricity: 100,
  ratio: 70,
  co2e: 0,
  destination: [
    {
      id: uuidv4(),
      destinationPercentage: 30,
      destinationLocation: 'Beijing',
      transportMode: 'Lorry',
      distance: 1927,
    },
    {
      id: uuidv4(),
      destinationPercentage: 50,
      destinationLocation: 'Shanghai',
      transportMode: 'Lorry',
      distance: 1250,
    },
    {
      id: uuidv4(),
      destinationPercentage: 20,
      destinationLocation: 'Guangzhou',
      transportMode: 'Lorry',
      distance: 105,
    },
  ],
};

const Calculator = () => {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  const [cardHidden, setCardHidden] = useState(false);
  const [formData, setFormData] = useState<Project>(baseData);
  const [projectData, setProjectData] = useState<Project>(baseData);

  useEffect(() => {
    if (window.location.search.indexOf('test=1') != -1) setFormData(testData);
    else setFormData(baseData);
    waitTime().then(() => {
      // 编辑场景下需要使用formMapRef循环设置formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formData);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <>
      <ProCard bodyStyle={cardHidden ? { display: 'none' } : {}}>
        <StepsForm
          formMapRef={formMapRef}
          onFinish={(values: any) => {
            setProjectData(values);
            setCardHidden(true);
            return Promise.resolve(false);
            // const ss: Supply[] = [];
            // const result: Project = { supply: [] };
            // for (const v in values) {
            //   if (v === 'supply') {
            //     values[v].forEach((ele: Supply) => {
            //       ele.processing =
            //         values['process' + ele.id] === undefined ? [] : values['process' + ele.id];
            //       ele.transportation =
            //         values['transportation' + ele.id] === undefined
            //           ? []
            //           : values['transportation' + ele.id];
            //       ss.push(ele);
            //     });
            //   } else if (v.indexOf('process') === -1 && v.indexOf('transportation') === -1) {
            //     result[v] = values[v];
            //   }
            // }
            // result.supply = ss;
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
            <Parts supply={formData.supply} />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="step3" title="On site">
            <Engery />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="step4" title="Distribution">
            <Distribution destination={formData.destination} />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
      <ProCard bodyStyle={cardHidden ? {} : { display: 'none' }}>
        <Results projectData={projectData} />
      </ProCard>
    </>
  );
};

export default Calculator;
