import React from 'react';
import Login from '../client/pages/Login';
import User from '../client/pages/User';
import NotFound from '../client/pages/NotFound';

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
    component: User
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