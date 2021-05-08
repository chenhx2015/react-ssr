import React from 'react';
import {Provider} from 'react-redux';
import { renderToString } from 'react-dom/server';
import express from 'express';
// import { StaticRouter } from 'react-router-dom';
// import App from '../App.js';
import { createRouter } from '../route';

// 下面是改造路由 - 服务端改造
import routeConfs from '../route/routeConf'; // 请注意一下这种导出和引入的方式
import { matchPath } from "react-router-dom";

import getStore from "../store";

const app = express();
app.use(express.static('dist')); // 一定要指定一下这一行，是静态资源访问的路径，要不然控制台报错找不到服务端 打包好的资源

app.get('/api/users', function(req,res) {
  res.send([{
    "name": "吉泽明步",
    "birthday": "1984-03-03",
    "height": "161"
  },{
    "name": "大桥未久",
    "birthday": "1987-12-24",
    "height": "158"
  },{
    "name": "香澄优",
    "birthday": "1988-08-04",
    "height": "158"
  },{
    "name": "爱音麻里亚",
    "birthday": "1996-02-22",
    "height": "165"
  }]);
});

app.get('*', (req, res) => {
  const context = {};
  const store = getStore();
  const promises = [];

  routeConfs.forEach((route)=> {
    console.log('route', route);
    const match = matchPath(req.path, route);
    if(match&&route.loadData){
      promises.push(route.loadData(store));
    };
  });


  // 改造为如下 - 加上 promise 来改造路由，传 loadData
  Promise.all(promises).then(() => {
    const content = renderToString(
      // <StaticRouter>
      //   {App}
      // </StaticRouter>
      // 请注意：这里需要 div 元素包裹一层 => 改造为 Provider 包起来
      <Provider store={store}>
        <div>
          {createRouter('server')({
              location: req.url,
              context // req.url来自node服务
            })}
        </div>
      </Provider>
    );
  

  // const content = renderToString(
  //   // <StaticRouter>
  //   //   {App}
  //   // </StaticRouter>
  //   // 请注意：这里需要 div 元素包裹一层 => 改造为 Provider 包起来
  //   <Provider store={store}>
  //     <div>
  //       {createRouter('server')({
  //           location: req.url,
  //           context // req.url来自node服务
  //         })}
  //     </div>
  //   </Provider>
  // );

  // before
  // res.send(
  //   `
  //     <!doctype html>
  //     <html>
  //     <head>
  //         <meta charset='utf-8'/>
  //         <title> react ssr </title>
  //     </head>
  //     <body>
  //         <div id="root">${content}</div>
  //         <script src="/client/bundle.js"></script>
  //     </body>
  //     </html>
  //   `
  // )

  // after
  // 以下是重定向的重点 *** 解决了 / 重定向的问题
  // 问题描述：路由先定位到 /login,会展示登录的路由，然后改为 /，路由会重定向到 user,但是展示出来的内容是 404.
  // 当 Redirect 被使用时，context.url 将包含重定向的地址
    if (context.url) {
      // 为什么这么判断，因为这是react-router官方文档提供的判断是否有重定向的方式
      // 文档地址 ： https://reactrouter.com/web/api/StaticRouter
      // 302
      res.redirect(context.url);
    } else {
      // 200
      if(context.NOT_FOUND) res.status(404) // 判断是否设置状态码为 404
      res.send(
        `
          <!doctype html>
          <html>
          <head>
              <meta charset='utf-8'/>
              <title> react ssr </title>
              <script>
                window.INITIAL_STATE = ${JSON.stringify(store.getState())}
              </script>
          </head>
          <body>
              <div id="root">${content}</div>
              <script src="/client/bundle.js"></script>
          </body>
          </html>
        `
      )
    }
  })
})

// 总结一下：路由改造的点有如下
// 1. 根据路径找到所有需要调用的 loadData 方法，接着传入 store 调用去获取 Promise 对象，然后加入到 promises 数组中
// 2. 加入 Promise.all，将渲染 react 组件生成 html 等操作放入其 then 中
// 3. 在 html 中加入一个 script，使新的 state 挂载到 window 对象上
// 同时，客户端也要改造一下 store/index.js 文件

app.listen(9003, () => {
  console.log('端口监听完毕')
})