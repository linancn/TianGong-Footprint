import type { Destination } from '@/services/data';
import { getTransportModeSelectItems } from '@/services/factorTransportation/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  destination: any;
};
const Distribution: FC<Props> = ({ destination }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    destination.map((item: { id: any }) => item.id),
  );
  const [count, setCount] = useState<number>(() =>
    Math.max(destination.map((item: { id: any }) => item.id)),
  );

  const transportModeSelectItems = async () => getTransportModeSelectItems();

  const columns: ProColumns<Destination>[] = [
    {
      title: 'NO',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Destination Percentage (%)',
      dataIndex: 'destinationPercentage',
      valueType: 'digit',
      fieldProps: {
        defaultValue: 0,
      },
    },
    {
      title: 'Destination Location',
      dataIndex: 'destinationLocation',
      valueType: 'text',
    },
    {
      title: 'Transport Mode',
      dataIndex: 'transportMode',
      valueType: 'select',
      request: transportModeSelectItems,
      fieldProps: {
        showSearch: true,
        allowClear: false,
      },
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
        toolBarRender={() => [
          <>
            <Button
              size={'middle'}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: uuidv4(),
                  destinationPercentage: 0,
                  destinationLocation: '',
                  transportMode: '',
                });
                setCount(count + 1);
              }}
            >
              Destination
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Distribution;
