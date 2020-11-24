/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 17:09:43
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 14:16:14
 */
import { ShortSentences } from '../db/model/index'
import { Document } from 'mongoose'

/** 添加句子 */ 
export async function createShortSentences (shortSentencesText: string, shortSentencesHtml:string): Promise<Document> {
  // 添加
  const insertResult =await ShortSentences.create(
    { 
      'shortSentencesText': shortSentencesText,
      'shortSentencesHtml': shortSentencesHtml
    },
  )
  return insertResult
}

/** 查找句子 */ 
export async function queryShortSentences (limit: number, offset: number, ): Promise<Record<string, number | Document[]>> {
  // 查找
  const queryResult = await ShortSentences.find().skip(offset).limit(limit)
  const CountResult = await ShortSentences.estimatedDocumentCount()
  const data = {
    total: CountResult,
    shortSentencesList: queryResult
  }
  return data
}