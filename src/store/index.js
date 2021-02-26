// 对多个 reducer 做一个整合，向外暴露创建 store 的方法
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const rootReducer = combineReducers({
  reducers
})

// before
export default () => {
  return createStore(rootReducer, applyMiddleware(thunk))
}

// 路由改造之后，改造为如下
// after
// 主要改造两点
// 1. getStore 支持传入一个初始 state。
// 2. 调用 getStore，并传入 window.INITIAL_STATE，从而获得一个注入数据的 store

// const getStore = (initialState) => {
//   return createStore(rootReducer,initialState,applyMiddleware(thunk))
// };

// const store =  getStore(window.INITIAL_STATE);

// export default store;