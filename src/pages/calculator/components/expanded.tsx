import type { Processing } from '@/services/data';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { useState } from 'react';

const ExpandedRowRender = (supply: any) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    supply.record.processing?.map((item: { id: any }) => item.id),
  );
  const [dataSource, setDataSource] = useState<Processing[]>(() => supply.record.processing);
  const Processingcolumns: ProColumns<Processing>[] = [
    {
      title: 'Processing',
      dataIndex: 'id',
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
      title: 'Process Category',
      dataIndex: 'processCategory',
      valueType: 'text',
    },
    {
      title: 'Options',
      valueType: 'option',
      render: (text, row, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(row.id);
          }}
        >
          edit
        </a>,
      ],
    },
  ];
  return (
    <>
      <EditableProTable<Processing>
        rowKey="id"
        name={supply.record.id}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          position: 'top',
          record: () => ({
            id: Date.now(),
            materialCategory: 'ee',
            materialType: '',
            supplyid: supply.record.id,
            processCategory: '',
          }),
        }}
        scroll={{
          x: true,
        }}
        controlled
        columns={Processingcolumns}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel, dom.delete],
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default ExpandedRowRender;
