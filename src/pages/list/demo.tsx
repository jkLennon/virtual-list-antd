/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:58:09
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 15:05:37
 * @Description: 虚拟列表-demo1
 */
import VirtualTable from '../components/VirtualTable';
import { useEffect, useState } from 'react';
import { getData } from '../utils';
import { Space, TableProps, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

interface RecordType {
  [key: string]: any;
}

const ListDemo = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const equipmentAttrsColumns: TableProps<RecordType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'no',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '设备参数',
      children: [
        {
          title: '设备参数编号',
          dataIndex: 'equipmentParamCode',
          width: 200,
        },
        {
          title: '设备参数名称',
          dataIndex: 'equipmentParamName',
          width: 180,
        },
      ],
    },
    {
      title: '网关参数',
      children: [
        {
          title: '网关序号',
          dataIndex: 'protocolNo',
          width: 150,
          render: (text: string, record, index: number) => 1,
        },
        {
          title: '网关参数编号',
          dataIndex: 'protocolParamCode',
          width: 180,
        },
        {
          title: '网关参数名称',
          dataIndex: 'protocolParamName',
          width: 180,
        },
        {
          title: '实时值',
          dataIndex: 'dataValue',
          width: 80,
        },
      ],
    },

    {
      title: '监测分组',
      dataIndex: 'monitorGroupName',
      width: 150,
    },
    {
      title: '组内排序',
      dataIndex: 'orderNum',
      width: 120,
    },
    {
      title: (
        <div>
          <span style={{ marginRight: 8 }}>过程数据</span>
          <Tooltip title="开启后可修改参数编号，只参与计算，不进行存储">
            <QuestionCircleOutlined color="rgba(0, 0, 0, 0.6)" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'isProcess',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 100,
      fixed: 'right',
      render: () => {
        return (
          <Space>
            <a
              onClick={() => {
                console.log('删除删除删除');
              }}
            >
              删除
            </a>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    setDataSource(getData(100000) ?? []);
  }, []);

  return (
    <div className={styles.listIndexPage}>
      <div>
        <h2>虚拟列表-demo1</h2>
      </div>
      <div>
        <span>1、自定义内容渲染</span>
        <VirtualTable
          rowKey={'id'}
          columns={equipmentAttrsColumns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
        />
      </div>
      <div style={{ marginTop: 100 }} className={styles.demo2}>
        <span>2、全部数据垂直居中显示。</span>
        <VirtualTable
          rowKey={'id'}
          columns={equipmentAttrsColumns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
        />
      </div>
      <div style={{ marginTop: 100 }} className={styles.demo2}>
        <span>3、分页显示</span>
        <VirtualTable
          rowKey={'id'}
          columns={equipmentAttrsColumns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
          tableOtherOptions={{
            pagination: {
              pageSizeOptions: [10, 20, 50, 100000],
            },
          }}
        />
      </div>
    </div>
  );
};
export default ListDemo;
