### 一. 额外遇到的问题及知识点

1. BrowserRouter 和 HashRouter 的区别

2. 引入文件不带后缀，识别不了，找不到该模块
  解决：需要在 webpack 配置文件里面加一行
  ```js
    resolve: {
      extensions: ['.js', '.jsx', '.json'] // 不配置的时候，默认是 ['.js', '.json']
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
   ![code200](/note/code200.png)
   ![code304](/note/code304.png)
   ![code200](/note/code404.png)

7. 注意个别处理细节
  - 为什么要 redux 管理服务端获取到的数据？
  接口请求是在服务端渲染html之前就去请求的，而不是在客户端接管页面之后再去请求的，所以服务端拿到请求数据之后得找个地方以供后续的html渲染使用
  - 我们先看看客户端拿到请求数据是如何存储的，一般来说无外乎这两种方式，一个就是组件的state，另一个就是redux。再回到服务端渲染
  - 这两种方式我们一个个看一下，首先是放在组件的state里面，这种方式显然不可取的，都还没有renderToString呢，哪来的state
  - 所以只剩下第二条路redux，redux的createStore第二参数就是用于传入初始化state的
  - 思路流程如图：
  ![redux1](/note/redux1.png)
  - 🤔️？调用 store.getState 方法获取到最新的数据之后，将其挂载到 window 对象上，为何会有 window 对象 ？

8. bindActionCreators
  - bindActionCreators是redux的一个自带函数，作用是将单个或多个ActionCreator转化为dispatch(action)的函数集合形式。
  - 开发者不用再手动dispatch(actionCreator(type))，而是可以直接调用方法
  ```js
    // 用法如下
    let newAction = bindActionCreators(oldActionCreators, dispatch)

    <child {...newAction} />

    // 以上代码将dispatch和action组合成的对象直接传给了子组件，然后在子组件中就可以通过调用 newAction.action1 就相当于实现了 dispatch（action1）
    // 由此便实现了在没有 store 和 dispatch 的组件中调用 dispatch（action1）  
  ```