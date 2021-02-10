import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
// import { StaticRouter } from 'react-router-dom';
// import App from '../App.js';
import { createRouter } from '../route';

const app = express();
app.use(express.static('dist')); // 一定要指定一下这一行，是静态资源访问的路径，要不然控制台报错找不到服务端 打包好的资源

app.get('*', (req, res) => {
  const context = {};
  const content = renderToString(
    // <StaticRouter>
    //   {App}
    // </StaticRouter>
    // 请注意：这里需要 div 元素包裹一层
    <div>
      {createRouter('server')({
          location: req.url,
          context // req.url来自node服务
        })}
    </div>
  );

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

app.listen(9003, () => {
  console.log('端口监听完毕')
})