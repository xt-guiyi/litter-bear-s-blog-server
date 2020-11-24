/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 17:06:35
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 14:26:24
 */
import { ShortSentencesSchema } from '../validator/shortSentencesSchema'
import { PaginationSchema } from '../validator/commonSchema'
import { Document } from 'mongoose'
import { createShortSentences, queryShortSentences } from '../services/shortSentences'

/**
 * 添加句子 Controller
 */
export async function addShortSentences({shortSentencesText, shortSentencesHtml}: ShortSentencesSchema): Promise<Document> {
  // 调用数据库
  const callResult = await createShortSentences(shortSentencesText, shortSentencesHtml)
  return callResult
}


/**
 * 获得句子 Controller
 */
export async function getShortSentences({limit, offset}: PaginationSchema): Promise<Record<string, number | Document[]>> {
  // 调用数据库
  const callResult = await queryShortSentences(limit, offset)
  // console.log(callResult)
  return callResult
}