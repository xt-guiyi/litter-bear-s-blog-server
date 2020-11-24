/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-23 14:22:23
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-23 14:57:17
 */
import { QParameter } from 'src/validator/commonSchema'
import axios from './axios'

/**
 * 获得qq图像
 */
export function getQQImage (data: QParameter) {
  const params = Object.assign({ b: 'qq' }, data)
  return axios.get('https://q4.qlogo.cn/g', {
    params: params,
    headers: {
      Accept:'*/*'
    },
    responseType: 'stream'
  })
}
