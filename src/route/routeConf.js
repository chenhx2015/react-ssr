import React from 'react';
import Login from '../client/pages/Login';
import User from '../client/pages/User';
import NotFound from '../client/pages/NotFound';

// 请注意一下这种到处方式才能找到
export default [
  {
    type: 'redirect',
    exact: true,
    from: '/',
    to: '/user'
  },
  {
    type: 'route',
    path: '/user',
    exact: true,
    component: User,
    // 数据的获取以及注入
    loadData: User.loadData // 服务端获取数据的函数
  },
  {
    type: 'route',
    path: '/login',
    exact: true,
    component: Login
  },
  {
    type: 'route',
    path: '*',
    // component: NotFound
    // 将 component 替换成 render
    render: ({ staticContext }) => {
      if(staticContext) staticContext.NOT_FOUND = true;
      return <NotFound />
    }
  }
]