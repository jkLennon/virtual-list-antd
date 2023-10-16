/*
 * @Author: lumeifeng
 * @Date: 2023-10-13 09:55:53
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 17:32:25
 * @Description: TODO
 */
export const getData = (count: number = 100) => {
  const newDataSource: any[] = [];
  for (let i = 0; i < count; i++) {
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
    });
  }

  return newDataSource;
};

export const getData2 = () => {
  const newDataSource: any[] = [];
  for (let i = 0; i < 30; i++) {
    const newWorkshopList: any[] = [];
    for (let j = 0; j < 30; j++) {
      const newEquList: any[] = [];
      for (let k = 0; k < 30; k++) {
        newEquList.push({
          equId: 'fed0472aab77a11afceb15b9891346ef',
          monthDate: 1688140800000,
          equipmentName:
            '设备设备设备设备设备设备设备设备设备设备设备设备设备设备设备设备',
          workshopId: '0c328537821b4bf88a02f21e59493923',
          workshopName: '设备组4设备组4设备组4设备组4设备组4设备组4',
          customerId: '94010203d081f4fa9e0640b860881379',
          name: `名称${i + 1}`,
          reportId: `${new Date().getTime() + i * 100000000 + j * 1000000 + k}`,
          categoryId: 'fd419d30f9454c7a2e037b3310940fc8',
          categoryName: '类型名称类型名称类型名称类型名称类型名称类型名称',
          address: null,
          power: 90,
          ratio: null,
          runTime: null,
          loadTime: null,
          loadPercent: null,
          unloadWasteRatio: null,
          maxFrequency: 100,
          avgLoadRatio: null,
          lowWasteRatio: null,
          loadTimeStageLow: null,
          loadTimeStageMiddle: null,
          loadTimeStageHigh: null,
          maxPressure: null,
          minPressure: null,
          avgPressure: null,
          highPressureWasteRatio: null,
          powerUnit: 'kW',
          frequencyUnit: 'Hz',
          pressureUnit: 'MPa',
        });
      }

      newWorkshopList.push({
        groupKey:
          '94010203d081f4fa9e0640b8608813790c328537821b4bf88a02f21e59493923',
        customerId: `94010203d081f4fa9e0640b860881379${i + 1}`,
        name: `名称${i + 1}`,
        workshopId: '0c328537821b4bf88a02f21e59493923',
        workshopName: '设备组4设备组4设备组4设备组4设备组4设备组4',
        workshopSort: 1,
        equNum: 1,
        lowEfficiencyEquNum: 0,
        maxratio: 0,
        equList: newEquList,
      });
    }

    newDataSource.push({
      customerId: '94010203d081f4fa9e0640b860881379',
      name: `名称${i + 1}`,
      workshopNum: 4,
      equNum: 8,
      lowEfficiencyEquNum: 1,
      workshopList: newWorkshopList,
    });
  }

  return newDataSource;
};
