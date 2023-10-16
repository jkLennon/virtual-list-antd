/*
 * @Author: lumeifeng
 * @Date: 2023-05-06 18:05:39
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 11:23:19
 * @Description: 渲染列表item数据
 *
 * 显示规则：
 * 1、为空：显示 - -
 * 2、10个字符，溢出：使用...表示，并且鼠标放上去后展示完整内容；
 * 3、某些字段值 >=5% 时高亮突出显示
 */

import styles from './index.less';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { useEffect, useState } from 'react';

const ColumnsItem = (props: any) => {
  const {
    key,
    itemKey,
    name,
    value,
    rule,
    unit,
    code,
    unitLeftEmpty,
    handleClick,
  } = props;

  const [config, setConfig] = useState({});
  const [showUnit, setShowUnit] = useState(false);
  const [showValClassName, setShowValClassName] = useState('');
  const [showVal, setShowVal] = useState('');

  // 数组中的元素有值时需要判断是否>=5，如果大于则要调整样式
  const needJudgeStrongList = [
    'unloadWasteRatio',
    'lowWasteRatio',
    'highPressureWasteRatio',
  ];

  // 判断值是否为空，为空则显示‘--’
  const handleJudgeEmpty = (value: any) => {
    let content: any = null;
    if (!isUndefined(value)) {
      if (!!value || value == '0') {
        // 排除’0‘、0这类值
        content = value;
      } else {
        content = '--';
      }
    } else {
      content = '--';
    }

    return content;
  };

  const handleNeedJudgeStrongList = (value: string | number | any): boolean => {
    let result = false;
    if (!!value) {
      let valueNum = value;
      if (typeof value !== 'number') {
        valueNum = Number(value);
      }

      if (!isNaN(valueNum)) {
        if (valueNum >= 5) {
          // >=5%时高亮突出显示
          result = true;
        }
      }
    }
    return result;
  };

  useEffect(() => {
    let newVal = handleJudgeEmpty(value);
    let newShowVal = newVal;
    let newConfig = {};
    let newShowValClassName = `${styles.equItemValue}`;
    // 记录当前这个值是否需要加强样式显示
    let strongResult = false;
    // 无值时不显示单位
    const newShowUnit = !!value || value == '0';

    if (!!rule) {
      switch (rule) {
        case 'len10':
          if (typeof newVal !== 'string') {
            newShowVal = newVal.toStirng();
          }
          if (!!newShowVal || newShowVal == '0') {
            if (newShowVal.length > 10) {
              newShowVal = `${newShowVal.slice(0, 10)}...`;
              newConfig['showModal'] = 'strLen';
            }
          }
          break;
        default:
          newConfig['showModal'] = rule;
      }
    }

    if (!!itemKey && needJudgeStrongList.includes(itemKey)) {
      strongResult = handleNeedJudgeStrongList(newVal);
    }
    if (!!strongResult) {
      newShowValClassName = newShowValClassName + ` ${styles.equItemStrong}`;
    }

    if (code === 'equipmentName') {
      // 处理value值的样式
      newShowValClassName = newShowValClassName + ` ${styles.equItemName}`;
    }

    if (!!handleClick && isFunction(handleClick)) {
      newConfig['onClick'] = handleClick;
    }

    newConfig = {
      ...newConfig,
      title: <div>{newVal}</div>,
      showVal: newShowVal,
    };
    setConfig(newConfig);
    setShowUnit(newShowUnit);
    setShowValClassName(newShowValClassName);
    setShowVal(newShowVal);
  }, []);

  // 显示单位
  const renderUnit = () => {
    let content = null;
    if (!!showUnit) {
      if (!!unit) {
        content = `${!!unitLeftEmpty ? ' ' : ''}${unit}`;
      } else {
        content = '';
      }
    }
    return content;
  };

  return (
    <div className={styles.adaptiveCom} key={key ?? code}>
      <div>
        <span className={styles.equItemLabel}>{`${name}：`}</span>
        <span className={showValClassName}>
          {showVal}
          {renderUnit()}
        </span>
      </div>
    </div>
  );
};

export default ColumnsItem;
