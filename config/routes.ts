/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:55:46
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-16 10:19:37
 * @Description: 路由列表
 */
export default [
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
      {
        path: '/template/list',
        component: '@/pages/template/list',
        layout: false,
      },
    ],
  },
  {
    name: '列表demo',
    path: '/',
    layout: false,
    routes: [
      {
        path: '/list',
        component: '@/pages/list',
        layout: false,
      },
    ],
  },
];
