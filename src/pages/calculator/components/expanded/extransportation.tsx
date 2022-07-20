import type { Transportation } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';

type Props = {
  supplyid: number;
  transportation: any;
  // parentformRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
};
const Extransportation: FC<Props> = ({ supplyid, transportation }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    transportation?.map((item: { id: any }) => item.id),
  );
  const [count, setCount] = useState<number>(() =>
    Math.max(transportation?.map((item: { id: any }) => item.id)),
  );
  const Transportationcolumns: ProColumns<Transportation>[] = [
    {
      title: 'Transportation',
      dataIndex: 'id',
      valueType: 'text',
      readonly: true,
    },
    {
      title: 'Supplier Percentage',
      dataIndex: 'supplierPercentage',
      valueType: 'text',
    },
    {
      title: 'Supplier Location',
      dataIndex: 'supplierLocation',
      valueType: 'text',
    },
    {
      title: 'Transport Mode',
      dataIndex: 'transportMode',
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
      <EditableProTable<Transportation>
        rowKey="id"
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
              size={'middle'}
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: count + 1,
                  supplierPercentage: '',
                  supplierLocation: '',
                  supplyid: supplyid,
                  transportMode: '',
                });
                setCount(count + 1);
              }}
            >
              Transportation
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Extransportation;
