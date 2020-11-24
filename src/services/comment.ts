/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-19 14:05:10
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-20 15:26:25
 */
import { Comment } from '../db/model/index'
import { Document } from 'mongoose'

/** 查找评论总数 */
export async function queryComment(): Promise<Record<string, number | Document[]>> {
  
  const CountResult = await Comment.estimatedDocumentCount()
  const data = {
    total: CountResult,
  }  
  return data
}


