/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:58:09
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-17 11:57:17
 * @Description: 虚拟列表-demo1
 */
import { useEffect, useState } from 'react';
import { Space, TableProps, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import VirtualTableTemplate from '../VirtualTable';
import { getData } from '@/pages/utils';
import VirtualTableMogud from '../VirtualTable/mogudTable';

interface RecordType {
  [key: string]: any;
}

const ListDemoOne = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const columns: TableProps<RecordType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'no',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    // {
    //   title: '设备参数',
    //   children: [
    //     {
    //       title: '设备参数编号',
    //       dataIndex: 'equipmentParamCode',
    //       width: 200,
    //     },
    //     {
    //       title: '设备参数名称',
    //       dataIndex: 'equipmentParamName',
    //       width: 180,
    //     },
    //   ],
    // },
    // {
    //   title: '网关参数',
    //   children: [
    //     {
    //       title: '网关序号',
    //       dataIndex: 'protocolNo',
    //       width: 150,
    //       render: (text: string, record, index: number) => 1,
    //     },
    //     {
    //       title: '网关参数编号',
    //       dataIndex: 'protocolParamCode',
    //       width: 180,
    //     },
    //     {
    //       title: '网关参数名称',
    //       dataIndex: 'protocolParamName',
    //       width: 180,
    //     },
    //     {
    //       title: '实时值',
    //       dataIndex: 'dataValue',
    //       width: 80,
    //     },
    //   ],
    // },
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
    setDataSource(getData(100) ?? []);
  }, []);

  return (
    <div className={styles.listIndexPage}>
      <div>
        <h3>{'antd>=5.9.0自定义内容渲染'}</h3>
        <div>
          <VirtualTableTemplate
            rowKey={'id'}
            columns={columns}
            dataSource={dataSource}
            bordered
            scroll={{ y: 300, x: '100vw' }}
          />
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <h3>{'antd<5.9.0自定义内容渲染'}</h3>
        <div>
          <VirtualTableMogud
            columns={columns}
            dataSource={dataSource}
            tableOtherOptions={{
              bordered: true,
              scroll: { y: 300, x: '100vw' },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListDemoOne;
