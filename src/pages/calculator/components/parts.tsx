import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  partName?: string;
  materialCategory?: string;
  subcategory?: string;
  quality?: string;
  weight?: number;
  suppliterLocation?: string;
  transportMode?: string;
};
// const defaultData: DataSourceType[] = [];

const Parts = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'PART NAME',
      dataIndex: 'partName',
      valueType: 'text',
    },
    {
      title: 'MATERIAL CATEGORY',
      dataIndex: 'materialCategory',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'material1' },
        radio: { text: 'material2' },
      },
    },
    {
      title: 'SUBCATEGORY',
      dataIndex: 'subcategory',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'a' },
        radio: { text: 'b' },
      },
    },
    {
      title: 'QUALITY',
      dataIndex: 'quality',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'a' },
        radio: { text: 'b' },
      },
    },
    {
      title: 'WEIGHT',
      dataIndex: 'weight',
      valueType: 'digit',
    },
    {
      title: 'SUPPLIER LOCATION',
      dataIndex: 'suppliterLocation',
      valueType: 'text',
    },
    {
      title: 'TRANSPORT MODE',
      dataIndex: 'transportMode',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'a' },
        radio: { text: 'b' },
      },
    },
    {
      title: 'Options',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== row.id));
          }}
        >
          delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
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
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default Parts;
