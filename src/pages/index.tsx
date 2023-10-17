/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 11:07:17
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-17 12:01:00
 * @Description: TODO
 */
import { history } from '@umijs/max';

export default function HomePage() {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h3>项目说明</h3>
      <ul>
        <li>
          {
            '使用虚拟列表，建议使用antd>=5.9.0版本的， 因为5.9.0之前版本的虚拟表格有很多功能无法实现。例如 固定列、合并行列、展开行 等等。'
          }
        </li>
        <li
          onClick={() => {
            history.push('/demo');
          }}
        >
          {'例子可在在'}
          <span
            style={{
              color: '#1677ff',
              cursor: 'pointer',
            }}
          >
            demo-自定义内容渲染
          </span>
          {'中进行对比'}
        </li>
        <li>
          {
            'antd <= 5.9.0版本的虚拟列表使用了react-window插件中的VariableSizeGrid，VariableSizeGrid不支持动态高度。在无法知道数据内容高度时，虚拟列表的内容样式会有异常'
          }
        </li>
      </ul>
    </div>
  );
}
