/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:58:09
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 18:11:56
 * @Description: 虚拟列表-demo2
 */
import VirtualTable from '../components/VirtualTable';
import { useEffect, useState } from 'react';
import { getData, getData2 } from '../utils';
import { Space, TableProps, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import cloneDeep from 'loadsh/cloneDeep';

interface RecordType {
  [key: string]: any;
}

const ListDemo = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<Array<string | number>>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedAllRows, setExpandedAllRows] = useState<
    Array<string | number>
  >([]);

  const Columns: TableProps<RecordType> = [
    {
      title: (
        <div>
          <span style={{ marginRight: 10 }}>客户名称</span>
          <Tooltip title="开启后可修改参数编号，只参与计算，不进行存储">
            <QuestionCircleOutlined color="rgba(0, 0, 0, 0.6)" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'customerName',
      render: (text: any, record: any, index: number) =>
        `序号：${index + 1}--${text}`,
      // onCell: (record: CusListDataType = {}) => {
      //   return judgeItemColSpan(record, 'customerName');
      // },
    },
    {
      title: '设备组',
      // width: busPermission ? 101 : 110,
      dataIndex: 'workshopName',
      className: 'verticalAlignTop',
      // onCell: (record: CusListDataType = {}) => {
      //   return judgeItemColSpan(record, 'workshopName');
      // },
      // render: (text: any, record: CusListDataType = {}) => {
      //   const { key, children } = record;
      //   const haveExpanded = expandedRows.includes(key);

      //   if (!!children && !haveExpanded) {
      //     // 渲染‘站房视角’列表数据折叠起来时的数据
      //     return <ExpandedView comData={record} />;
      //   }
      //   return renderColumnsName(text, record, 'workshopName');
      // },
      render: (text: any, record: any = {}) => {
        return '333';
      },
    },
    {
      title: '设备基本信息',
      width: 188,
      className: `verticalAlignTop`,
      // onCell: judgeItemColSpan,
      // render: (text: any, record: CusListDataType = {}) => {
      //   return renderColumnsContent(record, 'equipmentName');
      // },
    },
    {
      title: '预估浪费比例',
      width: 120,
      dataIndex: 'reckonWasteRatio',
      // onCell: judgeItemColSpan,
      // render: (text: any) => {
      //   return (
      //     <div
      //       className={`${styles.reckonWasteRatioNormal} ${
      //         text >= 5 ? styles.reckonWasteRatioStrong : {}
      //       }`}
      //     >
      //       <span>{`${handleJudgeEmpty(text)}${
      //         !!text || text == '0' ? '%' : ''
      //       }`}</span>
      //     </div>
      //   );
      // },
    },
    {
      title: '加卸载分析',
      width: 189,
      className: `verticalAlignTop`,
      // onCell: judgeItemColSpan,
      // render: (text: any, record: CusListDataType = {}) => {
      //   return renderColumnsContent(record, 'runTime');
      // },
    },
    {
      title: '变频负载分析',
      // width: busPermission ? 220 : 240,
      // className: `verticalAlignTop`,
      // onCell: judgeItemColSpan,
      // render: (text: any, record: CusListDataType = {}) => {
      //   return renderColumnsContent(record, 'avgLoadRatio');
      // },
    },
    {
      title: '压力分析',
      // width: busPermission ? 190 : 210,
      // className: `verticalAlignTop`,
      // onCell: judgeItemColSpan,
      // render: (text: any, record: CusListDataType = {}) => {
      //   return renderColumnsContent(record, 'maxPressure');
      // },
    },
    {
      title: <div className={styles.btnBusTitle}>操作</div>,
      width: 100,
      key: 'action',
      fixed: 'right',
      className: 'columnsbtnBus',
      // onCell: judgeItemColSpan,
      render: () => {
        return (
          <a
            onClick={() => {
              console.log('生成商机生成商机生成商机');
            }}
          >
            生成商机
          </a>
        );
      },
    },
  ];

  useEffect(() => {
    handleCusListData(getData2() ?? []);
  }, []);

  const handleCusListData = (dataList: any[] = []) => {
    let expandedAllList: Array<string | number> = [];
    let list: Array<any> = [];

    // 循环客户数据，将接口返回的数据整理成table规定的层级数据
    dataList.map((cusItem = {}) => {
      const {
        workshopList = [],
        customerId,
        customerName,
        workshopNum,
        equNum,
        lowEfficiencyEquNum,
      } = cusItem;
      let cusObj: object = {
        customerId,
        customerName,
        workshopNum,
        equNum,
        lowEfficiencyEquNum,
      };
      let cusLen = 0;
      let childrenList: Array<any> = [];

      // 循环设备组数据
      const workshopLen = workshopList.length;
      if (workshopLen > 0) {
        workshopList.map((wsItem = {}, wsIndex) => {
          const { equList = [], workshopId, workshopName } = wsItem;
          let wsObj: object = {};
          const wsItemObj: object = {
            workshopId,
            workshopName,
          };
          // 循环设备数据
          const equLen = equList.length;
          if (equLen > 0) {
            equList.map((equItem = {}, equIndex) => {
              const { reportId } = equItem;
              cusLen = cusLen + 1;
              let allObj = {
                ...wsItemObj,
                ...equItem,
                key: reportId,
              };
              if (wsIndex === 0 && equIndex === 0) {
                cusObj = {
                  ...cusObj,
                  ...allObj,
                  isCusFirst: true,
                  isWSFirst: true,
                  wSLen: equLen,
                };
              } else {
                wsObj = {
                  ...allObj,
                };
                if (equIndex === 0) {
                  wsObj = {
                    ...wsObj,
                    isWSFirst: true,
                    wSLen: equLen,
                  };
                }
              }

              if (Object.keys(wsObj).length > 0) {
                childrenList.push(wsObj);
              } else if (workshopLen === 1 && equLen === 1) {
                // 客户只有一个数据时，手动添加这个children是为了客户右侧可以显示展开小图标
                childrenList.push({
                  ...cusObj,
                  // 标记这个客户只有一个数据
                  isOnlyOneData: true,
                  // 手动改变reportId，保持reportId作为唯一值
                  reportId: `${cusObj['reportId']}key`,
                });
              }
            });
          }
        });

        if (childrenList.length > 0) {
          cusObj['children'] = childrenList ?? [];
        }
      }

      cusObj = {
        ...cusObj,
        cusLen,
      };

      if (Object.keys(cusObj).length > 0) {
        if (!!cusObj.key) {
          expandedAllList.push(cusObj.key);
        }
        list.push(cusObj);
      }
    });

    // 初始化时站房视角数据全部展开
    console.log('list00', list, expandedAllList);

    setDataSource(list);
    setIsExpanded(true);
    setExpandedRows(expandedAllList);
    setExpandedAllRows(expandedAllList);
  };

  return (
    <div className={styles.listIndexPage}>
      <div>
        <h2>虚拟列表-demo2</h2>
      </div>
      <div className={styles.demo2}>
        <span>1、树形数据列表</span>
        <div>
          <div>步骤1：先以普通数据展示全部内容</div>
          <div>步骤2：将客户列表单元格进行合并</div>
          <div>步骤3：展开时处理样式</div>
        </div>
        <VirtualTable
          columns={Columns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
          tableOtherOptions={{
            rowKey: 'reportId',
          }}
        />
      </div>
    </div>
  );
};
export default ListDemo;
