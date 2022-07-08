import type { Supply } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import ExpandedRowRender from './expanded';

const Parts = (supply: any) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    supply.supply.map((item: { id: any }) => item.id),
  );
  const [dataSource, setDataSource] = useState<Supply[]>(() => supply.supply);

  const expandedRowRender = (record: any) => {
    return (
      <>
        <ExpandedRowRender record={record} />
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
      title: 'Options',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          edit
        </a>,
      ],
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          actionRef.current?.addEditRecord?.({
            id: (Math.random() * 1000000).toFixed(0),
            material: '',
            materialCategory: '',
            materialType: '',
            packaging: '',
            totalMass: 0,
            processing: [],
            tansportation: [],
          });
        }}
        icon={<PlusOutlined />}
      >
        Supply
      </Button>
      <EditableProTable<Supply>
        rowKey="id"
        actionRef={actionRef}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        scroll={{
          x: true,
        }}
        controlled
        columns={columns}
        name="supply"
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, dom) => [dom.cancel, dom.delete],
          onChange: setEditableRowKeys,
        }}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
        }}
      />
    </>
  );
};

export default Parts;
