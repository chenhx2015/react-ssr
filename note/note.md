### 一. 额外遇到的问题及知识点

1. BrowserRouter 和 HashRouter 的区别

2. 引入文件不带后缀，识别不了，找不到该模块
  解决：需要在 webpack 配置文件里面加一行
  ```js
    resolve: {
      extensions: ['.js', '.jsx', '.json'] // 不配置的是时候，默认是 ['.js', '.json']
    }
  ```

3. 引入 .jsx 文件之后报错不能识别这种语法，请找到相应的 loader
  解决：发现时 webpack 配置的时候，module.rules 的 test 配置为了
   ```js
     test: /\.js$/
     // 该改为这样 test: /\.js|jsx$/ ， 能匹配到两个
   ```

4. 为了避免多写很多路径，可以设置 alias

5. 路由重定向的问题，具体见 server/index.js 文件
  相关资料地址：https://reactrouter.com/web/api/StaticRouter

6. 重定向之后，没有匹配到路由时，请求服务端返回的 code 状态码，应该是 404 ，返回的却是 304 和 200

   ![code304](/note/code304.png)
   ![code200](/note/code200.png)