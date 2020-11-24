/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-19 13:03:31
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-20 15:23:37
 */
import Router  from '@koa/router'
import {   } from '../../validator/commentSchema'
import {  getComment, } from '../../controller/comment'

export const router = new Router({
  prefix: '/api/',
  strict: true
})


/** 获得评论总数 */ 
router.get('comment',async (ctx) => {
  const result = await getComment()
  ctx.body = result
})

