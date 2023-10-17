/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 11:56:43
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 14:51:17
 * @Description: table使用虚拟列表
 */
import { Space, Table } from 'antd';

interface RecordType {
  [key: string]: any;
}

interface PropsType {
  [key: string]: any;
}

const VirtualTableTemplate = <RecordType extends object>(props: PropsType) => {
  const { columns, dataSource, tableOtherOptions = {} } = props;

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Table
          bordered={true}
          virtual
          columns={columns}
          scroll={{ x: 2000, y: 400 }}
          rowKey="id"
          dataSource={dataSource}
          pagination={false}
          {...tableOtherOptions}
        />
      </Space>
    </div>
  );
};
export default VirtualTableTemplate;
