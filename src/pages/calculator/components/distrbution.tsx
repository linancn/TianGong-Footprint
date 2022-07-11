import type { Destination } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
type Props = {
  destination: any;
};
const Distribution: FC<Props> = ({ destination }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    destination.map((item: { id: any }) => item.id),
  );

  const columns: ProColumns<Destination>[] = [
    {
      title: 'NO',
      dataIndex: 'id',
      valueType: 'text',
      readonly: true,
    },
    {
      title: 'destinationPercentage',
      dataIndex: 'destinationPercentage',
      valueType: 'text',
    },
    {
      title: 'destinationLocation',
      dataIndex: 'destinationLocation',
      valueType: 'text',
    },
    {
      title: 'transportMode',
      dataIndex: 'transportMode',
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
            destinationPercentage: 0,
            destinationLocation: '',
            transportMode: '',
          });
        }}
        icon={<PlusOutlined />}
      >
        Add
      </Button>
      <EditableProTable<Destination>
        rowKey="id"
        actionRef={actionRef}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        scroll={{
          x: true,
        }}
        controlled
        columns={columns}
        name="destination"
        value={destination}
        // onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, dom) => [dom.delete],
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default Distribution;
