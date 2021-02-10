import React from 'react';
// import { Route } from 'react-router-dom';

// import Login from './client/pages/Login';
// import User from './client/pages/User';

import { createRouter } from './route';

function App(props) {
  const handleClick = (e) => {
    console.log('clicked hello world!')
  }
  return <div>
      <h1 onClick={handleClick}>Hello World</h1>
      {/* 添加路由匹配 */}
      {/* <Route exact path="/login" component={Login}></Route>
      <Route exact path="/user" component={User}></Route> */}
      { createRouter('client')() }
  </div>
        
}
export default <App />;
