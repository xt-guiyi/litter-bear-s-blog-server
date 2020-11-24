/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-19 13:58:38
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-20 15:24:13
 */
import { Document } from 'mongoose'
import {  queryComment } from '../services/comment'



/** 获取评论总数 Controller */
export async function getComment(): Promise<Record<string, number | Document[]>> {
  // 调用数据库
  const callResult = await queryComment()
  // console.log(callResult)
  return callResult
}

