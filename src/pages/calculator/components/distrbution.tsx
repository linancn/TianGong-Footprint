import type { Destination } from '@/services/data';
import { getTransportModeSelectItems } from '@/services/factorTransportation/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  destination: any;
};
const Distribution: FC<Props> = ({ destination }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    destination.map((item: { id: any }) => item.id),
  );

  useEffect(() => {
    setEditableRowKeys(destination.map((item: { id: any }) => item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  const transportModeSelectItems = async () => getTransportModeSelectItems();

  const columns: ProColumns<Destination>[] = [
    {
      title: <FormattedMessage id="calculator.index" defaultMessage="NO" />,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: (
        <FormattedMessage
          id="calculator.destinationPercentage"
          defaultMessage="Destination Percentage (%)"
        />
      ),
      dataIndex: 'destinationPercentage',
      valueType: 'digit',
      fieldProps: {
        defaultValue: 0,
      },
    },
    {
      title: (
        <FormattedMessage
          id="calculator.destinationLocation"
          defaultMessage="Destination Location"
        />
      ),
      dataIndex: 'destinationLocation',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="calculator.transportMode" defaultMessage="Transport Mode" />,
      dataIndex: 'transportMode',
      valueType: 'select',
      request: transportModeSelectItems,
      fieldProps: {
        showSearch: true,
        allowClear: false,
      },
    },
    {
      title: <FormattedMessage id="calculator.distance" defaultMessage="Distance (km)" />,
      dataIndex: 'distance',
      valueType: 'digit',
      fieldProps: {
        defaultValue: 0,
      },
    },
    {
      title: <FormattedMessage id="calculator.option" defaultMessage="Option" />,
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          <FormattedMessage id="calculator.edit" defaultMessage="Edit" />
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
              className="button_right"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: uuidv4(),
                  destinationPercentage: 0,
                  destinationLocation: '',
                  transportMode: '',
                });
              }}
            >
              <FormattedMessage id="calculator.destination" defaultMessage="Destination" />
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Distribution;
