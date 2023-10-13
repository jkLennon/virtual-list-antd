/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:55:46
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-13 17:03:35
 * @Description: 路由列表
 */
export default [
  {
    // template
    path: '/',
    component: '@/pages/template/list',
    layout: false,
  },
  {
    name: '模版demo',
    path: '/template',
    layout: false,
    routes: [
      {
        path: '/template/demo',
        component: '@/pages/template/demo',
        layout: false,
      },
    ],
  },
  {
    name: '列表demo',
    path: '/demo',
    layout: false,
    routes: [
      {
        path: '/demo/list1',
        component: '@/pages/list/demo',
        layout: false,
      },
      {
        path: '/demo/list2',
        component: '@/pages/list/demo2',
        layout: false,
      },
    ],
  },
];
