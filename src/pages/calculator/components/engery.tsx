import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  manufacturing?: string;
  engerySource?: string;
  totalEnergy?: string;
  brand?: string;
  model?: string;
};
// const defaultData: DataSourceType[] = [];

const Engery = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'MANUFACTURING FACILITY LOCATION',
      dataIndex: 'manufacturing',
      valueType: 'text',
    },
    {
      title: 'ENERGY SOURCE',
      dataIndex: 'engerySource',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'a' },
        radio: { text: 'b' },
      },
    },
    {
      title: 'TOTAL ENERGY CONSUMED',
      dataIndex: 'totalEnergy',
      valueType: 'text',
    },
    {
      title: 'BRAND DISTRIBUTION CENTER LOCATION',
      dataIndex: 'brand',
      valueType: 'text',
    },
    {
      title: 'MODE OF TRANSPORT',
      dataIndex: 'model',
      valueType: 'select',
      valueEnum: {
        multiple: { text: 'a' },
        radio: { text: 'b' },
      },
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
        maxLength={1}
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

export default Engery;
