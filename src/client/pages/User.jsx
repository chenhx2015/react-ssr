import React from 'react';
// 开始实现 loadData 方法
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import * as actions from '../../store/actions'

export default function User() {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const loadData = () => {
    // axios 本身就是基于 Promise 封装的，因此 axios.get() 返回的就是一个 Promise 对象
    return  axios.get('http://localhost:3000/api/users').then((response)=>{
      const {data} = response;
      const {changeUsers} = bindActionCreators(actions,dispatch);
      changeUsers(data);
    });
  }
  return() => {
    return <div>
        <table>
           <thead>
              <tr>
                <th>姓名</th>
                <th>身高</th>
                <th>生日</th>
              </tr>
           </thead>
           <tbody>
             {
                users.map((user)=>{
                  const {name,birthday,height} = user;
                  return <tr key={name}>
                    <td>{name}</td>
                    <td>{birthday}</td>
                    <td>{height}</td>
                  </tr>
                })
             }
           </tbody>
        </table>
    </div>
  }
}