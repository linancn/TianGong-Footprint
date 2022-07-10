import type { Processing } from '@/services/data';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useState } from 'react';

type Props = {
  supplyid: number;
  processing: any;
  // parentformRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
};
const Exprocessing: FC<Props> = ({ supplyid, processing }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    processing?.map((item: { id: any }) => item.id),
  );
  const [dataSource, setDataSource] = useState<Processing[]>(() => processing);
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
  const saveProcessing = (value: Processing[]) => {
    // console.log(value);
    // console.log(parentformRef.current[1]?.current?.getFieldsValue());
    setDataSource(value);
  };

  return (
    <>
      <EditableProTable<Processing>
        rowKey="id"
        // name="process"
        recordCreatorProps={{
          newRecordType: 'dataSource',
          position: 'top',
          record: () => ({
            id: Date.now(),
            materialCategory: '',
            materialType: '',
            supplyid: supplyid,
            processCategory: '',
          }),
        }}
        scroll={{
          x: true,
        }}
        controlled
        columns={Processingcolumns}
        value={dataSource}
        onChange={saveProcessing}
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

export default Exprocessing;
