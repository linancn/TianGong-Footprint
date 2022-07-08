import type { Processing, Project, Supply } from '@/services/data';
import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
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
      material: 'sss',
      materialCategory: '',
      materialType: '',
      packaging: '',
      totalMass: 0,
      processing: [{ id: 1, materialCategory: '', materialType: '', processCategory: '' }],
      tansportation: [{ id: 1, supplierPercentage: '', supplierLocation: '', transportMode: '' }],
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
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    formValue.supply.map((item) => item.id),
  );

  const expandedRowRender = (record: any) => {
    const Processingcolumns: ProColumns<Processing>[] = [
      {
        title: 'Processing',
        dataIndex: 'id',
        valueType: 'text',
        // key: 'id',
      },
      {
        title: 'Material Category',
        dataIndex: 'materialCategory',
        // key: 'materialCategory',
        valueType: 'text',
      },
      {
        title: 'Material Type',
        dataIndex: 'materialType',
        // key: 'materialType',
        valueType: 'text',
      },
      {
        title: 'Process Category',
        dataIndex: 'processCategory',
        // key: 'processCategory',
        valueType: 'text',
      },
    ];
    return (
      <>
        <EditableProTable<Processing>
          rowKey="id"
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          // headerTitle="可编辑表格"
          scroll={{
            x: true,
          }}
          controlled
          columns={Processingcolumns}
          // name="processing"
          value={record.processing}
          // onChange={setDataSource}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            // onValuesChange: (record, recordList) => {
            //   // setDataSource(recordList);
            //   console.log(record);
            //   console.log(recordList);
            // },
            onChange: setEditableRowKeys,
          }}
        />
      </>
    );
  };

  const columns: ProColumns<Supply>[] = [
    {
      title: 'Material',
      dataIndex: 'material',
      valueType: 'text',
    },

    {
      title: 'Material Category',
      dataIndex: 'materialCategory',
      valueType: 'text',
    },
    {
      title: 'Material Type',
      dataIndex: 'materialType',
      valueType: 'text',
    },
    {
      title: 'Packaging',
      dataIndex: 'packaging',
      valueType: 'text',
    },
    {
      title: 'totalMass',
      dataIndex: 'totalMass',
      valueType: 'text',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_: any, row: any) => [
        <a
          key="delete"
          onClick={() => {
            console.log(row);
            // setDataSource(dataSource.filter((item) => item.key !== row.id));
          }}
        >
          delete
        </a>,
      ],
    },
  ];

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
          <ProFormText
            name="projectName"
            label="PRODUCT NAME"
            width="md"
            placeholder="Enter name"
            // rules={[{ required: true }]}
          />
          <ProFormDigit
            width="md"
            name="totalProductWeignt"
            label="TOTAL PRODUCT WEIGHT"
            placeholder="0"
            // rules={[{ required: true }]}
          />
          <ProFormText
            name="projectCategory"
            label="PRODUCT CATEGORY"
            width="md"
            placeholder="Enter name"
            // rules={[{ required: true }]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step2" title="Upstream supply">
          <EditableProTable<Supply>
            rowKey="id"
            recordCreatorProps={{
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }}
            // headerTitle="可编辑表格"
            scroll={{
              x: true,
            }}
            controlled
            columns={columns}
            name="supply"
            value={formValue.supply}
            // onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              actionRender: (row, config, defaultDoms) => {
                return [defaultDoms.delete];
              },
              // onValuesChange: (record, recordList) => {
              //   // setDataSource(recordList);
              // },
              onChange: setEditableRowKeys,
            }}
            expandable={{
              expandedRowRender,
              defaultExpandedRowKeys: ['0'],
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step3" title="On site">
          <ProFormText name="location" label="Location" width="md" placeholder="Enter name" />
          <ProFormText
            name="electricitySource"
            label="Electricity Source"
            width="md"
            placeholder="Enter name"
          />
          <ProFormDigit width="md" name="electricity" label="Electricity" placeholder="0" />
          <ProFormText name="ratio" label="Ratio" width="md" placeholder="Enter name" />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
