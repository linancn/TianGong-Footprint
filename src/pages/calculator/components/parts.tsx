import type { Supply } from '@/services/data';
import { getMaterialCategorySelectItems } from '@/services/factorMaterial/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Exprocessing from './expanded/exprocessing';
import Extransportation from './expanded/extransportation';
import MaterialTypeSelector from './selector/materialType';

type Props = {
  supply: Supply[];
};
const Parts: FC<Props> = ({ supply }) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    supply.map((item: { id: any }) => item.id),
  );

  const expandedRowRender = (record: any) => {
    return (
      <>
        <Exprocessing
          processing={record.processing}
          supplyId={record.id}
          supplyMaterialCategory={record.materialCategory ? record.materialCategory : ''}
          supplyMaterialType={record.materialType ? record.materialType : ''}
        />
        <Extransportation transportation={record.transportation} supplyid={record.id} />
      </>
    );
  };

  const selectTrueAndFalse = [
    {
      label: 'True',
      value: 'true',
    },
    {
      label: 'False',
      value: 'false',
    },
  ];

  const materialCategorySelectItems = async () => getMaterialCategorySelectItems();

  const columns: ProColumns<Supply>[] = [
    {
      title: 'NO',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: 'Material',
      dataIndex: 'material',
      valueType: 'text',
    },
    {
      title: 'Material Category',
      dataIndex: 'materialCategory',
      valueType: 'select',
      request: materialCategorySelectItems,
      fieldProps: {
        showSearch: true,
        allowClear: false,
      },
    },
    {
      title: 'Material Type',
      dataIndex: 'materialType',
      renderFormItem: (_row, data) => {
        return (
          <MaterialTypeSelector
            category={data.record?.materialCategory ? data.record?.materialCategory : ''}
          />
        );
      },
    },
    {
      title: 'Packaging',
      dataIndex: 'packaging',
      valueType: 'select',
      fieldProps: {
        options: selectTrueAndFalse,
      },
    },
    {
      title: 'Total Mass (grams)',
      dataIndex: 'totalMass',
      valueType: 'digit',
    },
    {
      title: 'Options',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="option_editable"
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
      <EditableProTable<Supply>
        rowKey="id"
        actionRef={actionRef}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        scroll={{
          x: true,
        }}
        controlled={true}
        columns={columns}
        name="supply"
        value={supply}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (_row, _config, dom) => [dom.delete],
          onChange: setEditableRowKeys,
        }}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
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
                  material: '',
                  materialCategory: '',
                  materialType: '',
                  packaging: 'false',
                  totalMass: 0,
                  processing: [],
                  tansportation: [],
                });
              }}
            >
              Supply
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Parts;
