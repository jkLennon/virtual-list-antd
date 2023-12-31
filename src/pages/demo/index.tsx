/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 11:56:43
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-17 11:58:12
 * @Description: 模版页面
 */
import React from 'react';
import { Space, Switch } from 'antd';
import type { TableProps } from 'antd';
import ListDemoOne from '../components/demo/DemoOne';
import ListDemoTwo from '../components/demo/DemoTwo';
import ListDemoThree from '../components/demo/DemoThree';
import ListDemoFour from '../components/demo/DemoFour';
import ListDemoFive from '../components/demo/DemoFive';

interface RecordType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address1: string;
  address2: string;
  address3: string;
}

const List = <RecordType extends object>(props: TableProps<RecordType>) => {
  const [demoOne, setDemoOne] = React.useState(true);
  const [demoTwo, setDemoTwo] = React.useState(false);
  const [demoThree, setDemoThree] = React.useState(false);
  const [demoFour, setDemoFour] = React.useState(false);
  const [demoFive, setDemoFive] = React.useState(false);
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
            checkedChildren="树形数据"
            unCheckedChildren="树形数据"
          />
          <Switch
            checked={demoFive}
            onChange={() => setDemoFive(!demoFive)}
            checkedChildren="可编辑表单"
            unCheckedChildren="可编辑表单"
          />
        </Space>
      </Space>
      {!!demoOne ? <ListDemoOne /> : null}
      {!!demoTwo ? <ListDemoTwo /> : null}
      {!!demoThree ? <ListDemoThree /> : null}
      {!!demoFour ? <ListDemoFour /> : null}
      {!!demoFive ? <ListDemoFive /> : null}
    </div>
  );
};
export default List;
