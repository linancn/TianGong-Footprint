import { waitTime } from '@/helper/waitTime';
import type { Processing } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
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

  useEffect(() => {
    setEditableRowKeys(
      processing?.map(async (item: any) => {
        await waitTime(150);
        actionRef.current?.addEditRecord?.(item);
        return item.id;
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Processingcolumns: ProColumns<Processing>[] = [
    {
      title: <FormattedMessage id="calculator.index" defaultMessage="No." />,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: <FormattedMessage id="calculator.processCategory" defaultMessage="Process Category" />,
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
      title: <FormattedMessage id="calculator.processType" defaultMessage="Process" />,
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
          <FormattedMessage id="calculator.edit" defaultMessage="Edit" />,
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<Processing>
        rowKey="id"
        headerTitle="Processing"
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
              size={'small'}
              className="button_right"
              type="primary"
              ghost
              icon={<PlusOutlined />}
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: uuidv4(),
                  // materialCategory: '',
                  // materialType: '',
                  // supplyId: supplyId,
                  // processCategory: '',
                });
              }}
            >
              <FormattedMessage id="calculator.add" defaultMessage="  Add" />
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Exprocessing;
