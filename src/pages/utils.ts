/*
 * @Author: lumeifeng
 * @Date: 2023-10-13 09:55:53
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 10:04:03
 * @Description: TODO
 */
export const getData = () => {
  const newDataSource: any[] = [];
  for (let i = 0; i < 100; i++) {
    newDataSource.push({
      id: i,
      no: i + 1,
      protocolParamCode: `controlMode${i}`,
      orderNum: 0 + i,
      equipmentParamCode: `controlMode${i}`,
      equipmentParamName: `控制状态控制状态控制状态控制状态控制状态控制状态控制状态控制状态控制状态控制状态控制状态${i}`,
      isProcess: 0,
      dataValue: null,
      protocolParamName: `控制状态${i}`,
      monitorGroupName: '默认',
      actions: '删除，这不是按钮只是文字',
    });
  }

  return newDataSource;
};
