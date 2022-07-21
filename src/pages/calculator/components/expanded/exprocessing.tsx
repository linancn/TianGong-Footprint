import type { Processing } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProcessCategorySelector from '../selector/processCategory';
import ProcessTypeSelector from '../selector/processType';

type Props = {
  supplyId: string;
  supplyMaterialCategory: string;
  supplyMaterialType: string;
  processing: any;
  // parentformRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
};
const Exprocessing: FC<Props> = ({
  supplyId,
  supplyMaterialCategory,
  supplyMaterialType,
  processing,
}) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    processing?.map((item: { id: any }) => item.id),
  );

  const Processingcolumns: ProColumns<Processing>[] = [
    {
      title: 'Processing',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Material Category',
      dataIndex: 'processCategory',
      renderFormItem: () => {
        return (
          <ProcessCategorySelector
            materialCategory={supplyMaterialCategory}
            materialType={supplyMaterialType}
          />
        );
      },
    },
    {
      title: 'Material Type',
      dataIndex: 'processType',
      renderFormItem: (_row, data) => {
        return (
          <ProcessTypeSelector
            materialCategory={supplyMaterialCategory}
            materialType={supplyMaterialType}
            processCategory={data.record?.processCategory ? data.record?.processCategory : ''}
          />
        );
      },
    },
    // {
    //   title: 'Process Category',
    //   dataIndex: 'processCategory',
    //   valueType: 'text',
    // },
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
        name={'process' + supplyId}
        // recordCreatorProps={{
        //   newRecordType: 'dataSource',
        //   position: 'top',
        //   record: (_, row) => ({
        //     id: row.length + 1,
        //     materialCategory: '',
        //     materialType: '',
        //     supplyid: supplyid,
        //     processCategory: '',
        //   }),
        // }}
        recordCreatorProps={false}
        actionRef={actionRef}
        scroll={{
          x: true,
        }}
        controlled
        columns={Processingcolumns}
        value={processing}
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
                  // materialCategory: '',
                  // materialType: '',
                  supplyId: supplyId,
                  // processCategory: '',
                });
              }}
            >
              Processing
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Exprocessing;
