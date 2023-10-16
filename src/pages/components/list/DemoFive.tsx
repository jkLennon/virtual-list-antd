import React, { useState } from 'react';
import { Form, Input, InputNumber, Table, Typography } from 'antd';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

// 渲染每一个可编辑单元格
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const { key = 0 } = record ?? {};

  const inputNode =
    inputType === 'number' ? (
      <InputNumber style={{ width: '100%' }} placeholder={`请输入${title}`} />
    ) : (
      <Input placeholder={`请输入${title}`} />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={`${dataIndex}${key}`}
          style={{ margin: 0 }}
          // rules={[
          //   {
          //     required: true,
          //     message: `Please Input ${title}!`,
          //   },
          // ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListDemoFive: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(100);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      console.log('row0000', row);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward ${count}`,
      age: 32,
      address: `London Park no. ${count}`,
    };

    setData([...data, newData]);
    setCount(count + 1);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'no',
      editable: false,
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        return (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => save(record.key)}
          >
            保存
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });

  return (
    <div>
      <h3>可编辑表单</h3>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          // pagination={{
          //   onChange: cancel,
          // }}
        />
      </Form>
      <div
        style={{
          marginTop: 20,
          padding: 10,
          background: 'green',
          width: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
        }}
        onClick={() => {
          handleAdd();
        }}
      >
        添加一行
      </div>
    </div>
  );
};

export default ListDemoFive;
