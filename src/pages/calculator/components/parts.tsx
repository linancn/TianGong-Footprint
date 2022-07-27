import type { Supply } from '@/services/data';
import { getMaterialCategorySelectItems } from '@/services/factorMaterial/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
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
    supply.map((item) => item.id),
  );

  useEffect(() => {
    setEditableRowKeys(supply.map((item) => item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supply]);

  const expandedRowRender = (record: any) => (
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

  const selectTrueAndFalse = [
    {
      label: 'True',
      value: true,
    },
    {
      label: 'False',
      value: false,
    },
  ];

  const materialCategorySelectItems = async () => getMaterialCategorySelectItems();

  const columns: ProColumns<Supply>[] = [
    {
      title: <FormattedMessage id="calculator.index" defaultMessage="NO" />,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: <FormattedMessage id="calculator.material" defaultMessage="Material" />,
      dataIndex: 'material',
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage id="calculator.materialCategory" defaultMessage="Material Category" />
      ),
      dataIndex: 'materialCategory',
      valueType: 'select',
      request: materialCategorySelectItems,
      fieldProps: {
        showSearch: true,
        allowClear: false,
      },
    },
    {
      title: <FormattedMessage id="calculator.materialType" defaultMessage="Material Type" />,
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
      title: <FormattedMessage id="calculator.packaging" defaultMessage="packaging" />,
      dataIndex: 'packaging',
      valueType: 'select',
      fieldProps: {
        options: selectTrueAndFalse,
      },
    },
    {
      title: <FormattedMessage id="calculator.totalMass" defaultMessage="Total Mass (grams)" />,
      dataIndex: 'totalMass',
      valueType: 'digit',
    },
    {
      title: <FormattedMessage id="calculator.option" defaultMessage="Option" />,
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="option_editable"
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
              className="button_right"
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
              <FormattedMessage id="calculator.supply" defaultMessage="Supply" />
            </Button>
          </>,
        ]}
      />
    </>
  );
};

export default Parts;
