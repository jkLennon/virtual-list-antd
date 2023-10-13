/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 11:56:43
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 17:55:55
 * @Description: TODO
 */
import React from 'react';
import { Segmented, Space, Switch, Table, Typography } from 'antd';
import type { TableProps } from 'antd';

interface RecordType {
  [key: string]: any;
}

interface PropsType {
  [key: string]: any;
}

const VirtualTableTemplate = <RecordType extends object>(props: PropsType) => {
  const [fixed, setFixed] = React.useState(true);
  const [bordered, setBordered] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [count, setCount] = React.useState(100000);

  const { columns, dataSource, tableOtherOptions = {} } = props;

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Table
          bordered={bordered}
          virtual
          columns={columns}
          scroll={{ x: 2000, y: 400 }}
          rowKey="id"
          dataSource={dataSource}
          pagination={false}
          pageSizeOptions={[10, 20, 50, 100000]}
          {...tableOtherOptions}
        />
      </Space>
    </div>
  );
};
export default VirtualTableTemplate;
