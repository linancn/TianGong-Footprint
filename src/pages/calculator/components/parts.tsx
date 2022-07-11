import type { Supply } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import Exprocessing from './expanded/exprocessing';
import Extransportation from './expanded/extransportation';
type Props = {
  supply: any;
  // parentformRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
};
const Parts: FC<Props> = ({ supply }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    supply.map((item: { id: any }) => item.id),
  );
  const expandedRowRender = (record: any) => {
    return (
      <>
        <Exprocessing processing={record.processing} supplyid={record.id} />
        <Extransportation transportation={record.transportation} supplyid={record.id} />
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
        value={supply}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, dom) => [dom.delete],
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
