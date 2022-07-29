import { waitTime } from '@/helper/waitTime';
import type { Transportation } from '@/services/data';
import { getTransportModeSelectItems } from '@/services/factorTransportation/api';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  supplyid: string;
  transportation: any;
  // parentformRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
};
const Extransportation: FC<Props> = ({ supplyid, transportation }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    transportation?.map((item: { id: any }) => item.id),
  );

  useEffect(() => {
    setEditableRowKeys(
      transportation?.map(async (item: any) => {
        await waitTime(150);
        actionRef.current?.addEditRecord?.(item);
        return item.id;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const transportModeSelectItems = async () => getTransportModeSelectItems();

  const Transportationcolumns: ProColumns<Transportation>[] = [
    {
      title: <FormattedMessage id="calculator.index" defaultMessage="No." />,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: (
        <FormattedMessage
          id="calculator.supplierPercentage"
          defaultMessage="Supplier Percentage (%)"
        />
      ),
      dataIndex: 'supplierPercentage',
      valueType: 'digit',
      fieldProps: {
        defaultValue: 0,
      },
    },
    {
      title: (
        <FormattedMessage id="calculator.supplierLocation" defaultMessage="Supplier Location" />
      ),
      dataIndex: 'supplierLocation',
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
      render: (text, row, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(row.id);
          }}
        >
          <FormattedMessage id="calculator.edit" defaultMessage="Edit" />
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<Transportation>
        rowKey="id"
        headerTitle="Transportation"
        name={'transportation' + supplyid}
        // recordCreatorProps={{
        //   newRecordType: 'dataSource',
        //   position: 'top',
        //   record: (_, row) => ({
        //     id: row.length + 1,
        //     supplierPercentage: '',
        //     supplierLocation: '',
        //     supplyid: supplyid,
        //     transportMode: '',
        //   }),
        // }}
        recordCreatorProps={false}
        actionRef={actionRef}
        scroll={{
          x: true,
        }}
        controlled
        columns={Transportationcolumns}
        value={transportation}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, dom) => [dom.delete],
          onChange: setEditableRowKeys,
        }}
        toolBarRender={() => [
          <>
            <Button
              size={'small'}
              className="button_right"
              type="primary"
              ghost
              icon={<PlusCircleOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: uuidv4(),
                  supplierPercentage: 0,
                  supplierLocation: '',
                  // supplyid: supplyid,
                  transportMode: '',
                });
              }}
            >
              <FormattedMessage id="calculator.add" defaultMessage=" Add" />
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Extransportation;
