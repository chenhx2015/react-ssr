import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

import getStore from '../store';

// 注水
// 至于 ReactDOM.hydrate() 和 ReactDOM.render() 的区别就是：
// ReactDOM.render() 会将挂载 dom 节点的所有子节点全部清空掉，再重新生成子节点。而
// ReactDOM.hydrate() 则会复用挂载 dom 节点的子节点，并将其与 react 的 virtualDom 关联上。

// const Page = <BrowserRouter>
//   {/* 请注意这里是变量，不是组件 */}
//   {App}
// </BrowserRouter>

const store = getStore();

// 请注意：这里也要加 Provider ,里面用了 useDispatch
const Page = <Provider store={store}>
  <BrowserRouter>
    {/* 请注意这里是变量，不是组件 */}
    {App}
  </BrowserRouter>
</Provider>

hydrate(Page, document.getElementById('root'));
