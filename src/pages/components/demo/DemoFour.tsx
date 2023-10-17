/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:58:09
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 18:42:29
 * @Description: 树形数据展开和收起
 */
import { useEffect, useRef, useState } from 'react';
import { TableProps } from 'antd';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { getData2 } from '@/pages/utils';
import VirtualTableTemplate from '../VirtualTable';
import ColumnsItem from '../ColumnsItem';
import ExpandedView from '../ExpandedView';

interface RecordType {
  [key: string]: any;
}

const ListDemoFour = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [expandedRows, setExpandedRows] = useState<Array<string | number>>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedAllRows, setExpandedAllRows] = useState<
    Array<string | number>
  >([]);
  const [columns, setColumns] = useState<any>([]);
  const oldExpandedRowsRef: any = useRef(void 0);

  useEffect(() => {
    handleListData(getData2() ?? []);
  }, []);

  useEffect(() => {
    handleColumns();
  }, [expandedRows]);

  const handleColumns = () => {
    const newColumns: TableProps<RecordType> = [
      {
        title: (
          <div>
            <span style={{ marginRight: 10 }}>名称</span>
            {renderExpandedTitleIcon()}
          </div>
        ),
        dataIndex: 'name',
        render: (text: any, record: any, index: number) =>
          `序号：${index + 1}--${text}`,
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record, { type: 'name' });
        },
      },
      {
        title: '基本信息',
        dataIndex: 'workshopName',
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record, { type: 'workshopName' });
        },
        render: (text: any, record: any = {}) => {
          const { key, children } = record;
          const haveExpanded = expandedRows.includes(key);

          if (!!children && !haveExpanded) {
            // 列表数据折叠起来时的数据
            return <ExpandedView comData={record} />;
          }
          return text ?? '--';
        },
      },
      {
        title: '基本信息1',
        width: 188,
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: (text: any, record: any = {}) => {
          return renderColumnsContent(record, 'equipmentName');
        },
      },
      {
        title: '基本信息2',
        width: 120,
        dataIndex: 'ratio',
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: (text: any) => {
          return (
            <div>
              <span>{!!text ? text : '--'}</span>
            </div>
          );
        },
      },
      {
        title: '基本信息2',
        width: 189,
        className: `verticalAlignTop`,
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: (text: any, record: any = {}) => {
          return renderColumnsContent(record, 'runTime');
        },
      },
      {
        title: '基本信息3',
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: (text: any, record: any = {}) => {
          return renderColumnsContent(record, 'avgLoadRatio');
        },
      },
      {
        title: '基本信息4',
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: (text: any, record: any = {}) => {
          return renderColumnsContent(record, 'maxPressure');
        },
      },
      {
        title: <div className={styles.btnBusTitle}>操作</div>,
        width: 100,
        key: 'action',
        fixed: 'right',
        className: 'columnsbtnBus',
        onCell: (record: any = {}) => {
          return judgeItemColSpan(record);
        },
        render: () => {
          return (
            <a
              onClick={() => {
                console.log('删除删除删除删除删除');
              }}
            >
              删除
            </a>
          );
        },
      },
    ];

    setColumns(newColumns);
  };

  /**
   * 处理列表数据
   * @param dataList 接口列表源数据
   * 
   * 处理备注：
   * 1、将第一层的数据作为父数组，剩余层级的内容扁平化放在children里。
   * 如：源数据 = {
   *  customerId: '94010203d081f4fa9e0640b860881379',
   *  name: '4.8.2三天数据',
   *  workshopList: [
   *    workshopId: '0c328537821b4bf88a02f21e59493923',
        workshopName: '设备组4-变频卸载有电表计算',
        equList:[
          equId: 'fed0472aab77a11afceb15b9891346ef',
        ]
   *  ]
   * }
   * 
   * 处理输出为：
   * {
   *  customerId: '94010203d081f4fa9e0640b860881379',
   *  name: '4.8.2三天数据',
   *  children:[
   *    workshopId: '0c328537821b4bf88a02f21e59493923',
        workshopName: '设备组4-变频卸载有电表计算',
        equId: 'fed0472aab77a11afceb15b9891346ef',
   *  ]   
   * 
   */
  const handleListData = (dataList: any[] = []) => {
    let expandedAllList: Array<string | number> = [];
    let list: Array<any> = [];

    // 循环客户数据，将接口返回的数据整理成table规定的层级数据
    dataList.map((cusItem = {}) => {
      const {
        workshopList = [],
        customerId,
        name,
        workshopNum,
        equNum,
        lowEfficiencyEquNum,
      } = cusItem;
      let cusObj: object = {
        customerId,
        name,
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
    const showObj = {
      list,
      expandedRows,
      expandedAllList,
    };
    // console.log('showObj=====', showObj);
    oldExpandedRowsRef.current = expandedAllList;

    setDataSource(list);
    setIsExpanded(true);
    setExpandedRows(expandedAllList);
    setExpandedAllRows(expandedAllList);
  };

  // 展开的行变化时触发
  const hanldeExpandedRowsChange = (expandedRowsList = []) => {
    oldExpandedRowsRef.current = expandedRowsList;
    setExpandedRows(expandedRowsList);
  };

  // 点击展开/收起时更改Columns里的Cell样式，具体要如何合并单元格根据业务需求和UI来处理
  const judgeItemColSpan = (record: any = {}, otheroptions: any = {}) => {
    const {
      key,
      cusLen,
      isCusFirst,
      isWSFirst,
      wSLen,
      isOnlyOneData,
      children,
    } = record;
    const { type } = otheroptions;
    /**
     * 使用useRef来记录数据，因为数据在setState成功之前会调用judgeItemColSpan，
     * 错误的的ExpandedRows会导致虚拟列表报错导致页面白屏
     *
     * 在普通的table中没有这个问题，可直接用useState去管理变量数据
     */
    const haveExpanded = oldExpandedRowsRef?.current?.includes(key);

    let result = {};
    const busPermission = true;

    switch (type) {
      case 'name':
        if (isCusFirst) {
          // 如果没有展示则按照原来的逻辑展示
          if (haveExpanded) {
            result = {
              rowSpan: cusLen,
            };
          }
        } else {
          // 如果没有展示每个客户内的第一个数据都不会展示
          result = {
            rowSpan: 0,
          };
        }
        break;
      case 'workshopName':
        if (!!children && !haveExpanded) {
          result = {
            colSpan: busPermission ? 7 : 6,
          };
        }

        if (!haveExpanded && !!isCusFirst) {
          // 同一个客户数据全部折叠时
          result = {
            ...result,
            rowSpan: 1,
          };
        } else if (!!isWSFirst) {
          // 同一个设备组中的第一个
          result = {
            ...result,
            rowSpan: wSLen,
          };
        } else {
          result = {
            ...result,
            rowSpan: 0,
          };
        }
        break;
      default:
        if (!!children && !haveExpanded) {
          result = {
            colSpan: 0,
          };
        }
    }

    if (!!isOnlyOneData) {
      result = {
        colSpan: 0,
        rowSpan: 0,
      };
    }

    return result;
  };

  // 点击客户右侧图标（全部折叠/全部展开）
  const handleTitleIcon = () => {
    if (isExpanded) {
      oldExpandedRowsRef.current = [];
      setExpandedRows([]);
    } else {
      oldExpandedRowsRef.current = expandedAllRows;
      setExpandedRows(expandedAllRows);
    }

    setIsExpanded(!isExpanded);
  };

  // 渲染一个表格显示多个内容
  const renderColumnsContent = (record: any = {}, type: string) => {
    let content = null;
    const {
      equipmentName,
      categoryId,
      categoryName,
      address,
      power,
      maxFrequency,
      frequencyUnit,
      runTime,
      loadTime,
      loadPercent,
      unloadWasteRatio,
      avgLoadRatio,
      loadTimeStageLow,
      loadTimeStageMiddle,
      loadTimeStageHigh,
      lowWasteRatio,
      maxPressure,
      minPressure,
      avgPressure,
      powerUnit,
      pressureUnit,
      highPressureWasteRatio,
    } = record ?? {};
    switch (type) {
      case 'equipmentName':
        content = (
          <div className={styles.equColumnsItem}>
            <ColumnsItem
              name={'名称'}
              value={equipmentName}
              rule={'lineClamp'}
              code={'equipmentName'}
            />
            <ColumnsItem
              name={'类别'}
              value={categoryName}
              rule={'lineClamp'}
              code={'categoryName'}
            />
            <ColumnsItem
              name={'机位'}
              value={address}
              rule={'lineClamp'}
              code={'address'}
            />
            <ColumnsItem
              name={'功率'}
              value={power}
              unit={powerUnit}
              code={'power'}
              unitLeftEmpty={true}
            />
            <ColumnsItem
              name={'最大频率'}
              value={maxFrequency}
              unit={frequencyUnit}
              code={'maxFrequency'}
              unitLeftEmpty={true}
            />
          </div>
        );
        break;
      case 'runTime':
        content = (
          <div className={styles.equColumnsItem}>
            <ColumnsItem
              name={'运行小时'}
              value={runTime}
              unit={' 小时'}
              code={'runTime'}
            />
            <ColumnsItem
              name={'加载小时'}
              value={loadTime}
              unit={' 小时'}
              code={'loadTime'}
            />
            <ColumnsItem
              name={'加载率'}
              value={loadPercent}
              unit={'%'}
              code={'loadPercent'}
            />
            <ColumnsItem
              name={'卸载浪费比例'}
              value={unloadWasteRatio}
              unit={'%'}
              itemKey={'unloadWasteRatio'}
              code={'unloadWasteRatio'}
            />
          </div>
        );
        break;
      case 'avgLoadRatio':
        content = (
          <div className={styles.equColumnsItem}>
            <ColumnsItem
              name={'平均负载率'}
              value={avgLoadRatio}
              unit={'%'}
              code={'avgLoadRatio'}
            />
            <ColumnsItem
              name={'负载率<50%'}
              value={loadTimeStageLow}
              unit={' 小时'}
              code={'loadTimeStageLow'}
            />
            <ColumnsItem
              name={'负载率50~70%'}
              value={loadTimeStageMiddle}
              unit={' 小时'}
              code={'loadTimeStageMiddle'}
            />
            <ColumnsItem
              name={'负载率>70%'}
              value={loadTimeStageHigh}
              unit={' 小时'}
              code={'loadTimeStageHigh'}
            />
            <ColumnsItem
              name={'低频浪费比例'}
              value={lowWasteRatio}
              unit={'%'}
              itemKey={'lowWasteRatio'}
              code={'lowWasteRatio'}
            />
          </div>
        );
        break;
      case 'maxPressure':
        content = (
          <div className={styles.equColumnsItem}>
            <ColumnsItem
              name={'最大压力'}
              value={maxPressure}
              unit={pressureUnit}
              code={'maxPressure'}
              unitLeftEmpty={true}
            />
            <ColumnsItem
              name={'下限压力'}
              value={minPressure}
              unit={pressureUnit}
              code={'lowWasteRatio'}
              unitLeftEmpty={true}
            />
            <ColumnsItem
              name={'平均压力'}
              value={avgPressure}
              unit={pressureUnit}
              code={'avgPressure'}
              unitLeftEmpty={true}
            />
            <ColumnsItem
              name={'高压浪费比例'}
              value={highPressureWasteRatio}
              unit={'%'}
              itemKey={'highPressureWasteRatio'}
              code={'highPressureWasteRatio'}
            />
          </div>
        );
        break;
    }
    return content;
  };

  // 数据是否展开。如果没有展开则右侧内容要合并成一个单元格
  const renderExpandedTitleIcon = () => {
    return !!isExpanded ? (
      <UpCircleOutlined onClick={handleTitleIcon} />
    ) : (
      <DownCircleOutlined onClick={handleTitleIcon} />
    );
  };

  return (
    <div className={styles.listIndexPage}>
      <h3>树形数据展开和收起demo</h3>
      <div>
        <ul>
          <li>测试数据一共27000，三层数据，每层30。30 * 30 * 30 = 27000</li>
          <li>一次性展示全部数据</li>
          <li>
            当数据收起/展开，table会重新渲染。如果不使用虚拟列表，table数据超过2000个时有明显的显示卡顿
          </li>
        </ul>
      </div>
      <div>
        <VirtualTableTemplate
          columns={columns}
          dataSource={dataSource}
          bordered
          scroll={{ y: 300, x: '100vw' }}
          tableOtherOptions={{
            rowKey: 'reportId',
            onExpandedRowsChange: hanldeExpandedRowsChange,
            expandedRowKeys: expandedRows,
          }}
        />
      </div>
    </div>
  );
};

export default ListDemoFour;
