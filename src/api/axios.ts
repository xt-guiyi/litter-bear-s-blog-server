/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-23 14:54:45
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-23 14:56:37
 */

/*
 * axios封装
 * 请求拦截，响应拦截,错误回调统一处理
 */

import axios from 'axios'

// 创建axios实例
const instance = axios.create({ timeout: 10000 })

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
})
// 响应拦截器
instance.interceptors.response.use(
  response => response,
  error => {
  console.log(error)
  
  }
)
export default instance
