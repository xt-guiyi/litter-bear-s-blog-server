/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 17:00:34
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 14:31:23
 */
import Router from "@koa/router";
import { addShortSentences, getShortSentences } from '../../controller/shortSentences'
import genValidator from '../../middleware/routerParameterValidator'
import  { shortSentencesValidator } from '../../validator/shortSentencesSchema'
import  {  paginationValidator } from '../../validator/commonSchema'

export const router = new Router({
  prefix: '/api/',
  strict: true
})

/** 上传句子路由 */
router.post('shortSentences', genValidator(shortSentencesValidator), async (ctx) => {
  const shortSentencesData = ctx.request.body
  // 调用controller
  const result = await addShortSentences(shortSentencesData)
  ctx.body = result
})

/** 获得句子路由 */
router.get('shortSentences', genValidator(paginationValidator), async (ctx) => {
  const shortSentencesQuery = ctx.request.query
  const result = await getShortSentences(shortSentencesQuery)
  ctx.body = result
})