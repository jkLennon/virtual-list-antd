﻿/*
 * @Author: lumeifeng
 * @Date: 2023-10-12 10:55:46
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-10-17 14:30:26
 * @Description: 路由列表
 */
export default [
  {
    name: '模版demo',
    path: '/template',
    layout: false,
    routes: [
      {
        path: '/template/list',
        component: '@/pages/template/list',
        layout: false,
      },
    ],
  },
  {
    name: 'demo',
    path: '/demo',
    component: '@/pages/demo',
    layout: false,
  },
  {
    name: 'index',
    path: '/',
    component: '@/pages',
    layout: false,
  },
];
