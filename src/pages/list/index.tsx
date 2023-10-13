/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:58:09
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 10:28:20
 * @Description: TODO
 */
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import VirtualTable from '../components/VirtualTable';
import { useEffect, useState } from 'react';
import { getData } from '../utils';
const ListIndex = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const equipmentAttrsColumns: ColumnsType<any> = [
    {
      title: '设备参数名称',
      dataIndex: 'equipmentParamName',
      width: 400,
    },
    {
      title: '网关参数编号',
      dataIndex: 'protocolParamCode',
    },
    {
      title: '网关参数名称',
      dataIndex: 'protocolParamName',
    },
    {
      title: '实时值',
      dataIndex: 'dataValue',
    },
    {
      title: '监测分组',
      dataIndex: 'monitorGroupName',
    },
    {
      title: '组内排序',
      dataIndex: 'orderNum',
    },
    {
      title: (
        <div>
          <span style={{ marginRight: 8 }}>过程数据</span>
        </div>
      ),
      dataIndex: 'isProcess',
    },
  ];

  useEffect(() => {
    setDataSource(getData() ?? []);
  }, []);

  return (
    <div>
      <h2>虚拟列表</h2>
      <div>
        <VirtualTable
          rowKey={'id'}
          columns={equipmentAttrsColumns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
        />
      </div>
    </div>
  );
};
export default ListIndex;
