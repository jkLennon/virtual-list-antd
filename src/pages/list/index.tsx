/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 11:56:43
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 17:35:15
 * @Description: 模版页面
 */
import React from 'react';
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import ListDemoOne from '../components/list/DemoOne';
import ListDemoTwo from '../components/list/DemoTwo';
import ListDemoThree from '../components/list/DemoThree';
import ListDemoFour from '../components/list/DemoFour';

interface RecordType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address1: string;
  address2: string;
  address3: string;
}

const fixedColumns: TableProps<RecordType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'FistName',
    dataIndex: 'firstName',
    width: 120,
    fixed: 'left',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    width: 120,
    fixed: 'left',
  },
  {
    title: 'Group',
    width: 120,
    render: (_, record) => `Group ${Math.floor(record.id / 4)}`,
    onCell: (record) => ({
      rowSpan: record.id % 4 === 0 ? 4 : 0,
    }),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
    onCell: (record) => ({
      colSpan: record.id % 4 === 0 ? 2 : 1,
    }),
  },
  {
    title: 'Address 1',
    dataIndex: 'address1',
    onCell: (record) => ({
      colSpan: record.id % 4 === 0 ? 0 : 1,
    }),
  },
  {
    title: 'Address 2',
    dataIndex: 'address2',
  },
  {
    title: 'Address 3',
    dataIndex: 'address3',
  },
  {
    title: 'Action',
    width: 150,
    fixed: 'right',
    render: () => (
      <Space>
        <Typography.Link>Action1</Typography.Link>
        <Typography.Link>Action2</Typography.Link>
      </Space>
    ),
  },
];

const columns: TableProps<RecordType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'FistName',
    dataIndex: 'firstName',
    width: 120,
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    width: 120,
  },
];

const getData = (count: number) => {
  const data: RecordType[] = new Array(count).fill(null).map((_, index) => ({
    id: index,
    firstName: `First_${index.toString(16)}`,
    lastName: `Last_${index.toString(16)}`,
    age: 25 + (index % 10),
    address1: `New York No. ${index} Lake Park`,
    address2: `London No. ${index} Lake ParkLake ParkLake ParkLake ParkLake ParkLake ParkLake ParkLake ParkLake ParkLake Park`,
    address3: `Sydney No. ${index} Lake Park`,
  }));

  return data;
};

const List = <RecordType extends object>(props: TableProps<RecordType>) => {
  const [demoOne, setDemoOne] = React.useState(false);
  const [demoTwo, setDemoTwo] = React.useState(false);
  const [demoThree, setDemoThree] = React.useState(false);
  const [demoFour, setDemoFour] = React.useState(true);
  return (
    <div style={{ padding: 30 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Switch
            checked={demoOne}
            onChange={() => setDemoOne(!demoOne)}
            checkedChildren="自定义内容渲染"
            unCheckedChildren="自定义内容渲染"
          />
          <Switch
            checked={demoTwo}
            onChange={() => setDemoTwo(!demoTwo)}
            checkedChildren="全部数据垂直居中显示"
            unCheckedChildren="全部数据垂直居中显示"
          />
          <Switch
            checked={demoThree}
            onChange={() => setDemoThree(!demoThree)}
            checkedChildren="表单分页显示"
            unCheckedChildren="表单分页显示"
          />
          <Switch
            checked={demoFour}
            onChange={() => setDemoFour(!demoFour)}
            checkedChildren="单机能效"
            unCheckedChildren="单机能效"
          />
        </Space>
      </Space>
      {!!demoOne ? <ListDemoOne /> : null}
      {!!demoTwo ? <ListDemoTwo /> : null}
      {!!demoThree ? <ListDemoThree /> : null}
      {!!demoFour ? <ListDemoFour /> : null}
    </div>
  );
};
export default List;
