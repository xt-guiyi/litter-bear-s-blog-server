/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 15:19:18
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-25 18:53:06
 */
import Router from "@koa/router";
import { addArticle, getArticleList, addArticleComment, getArticleCommentList } from '../../controller/article'
import genValidator from '../../middleware/routerParameterValidator'
import  { articleValidator, articleCommentValidator, articleCommentPaginationValidator,  articlePaginationValidator } from '../../validator/articleSchema'
// import  {  paginationValidator } from '../../validator/commonSchema'
export const router = new Router({
  prefix: '/api/',
  strict: true
})

/** 上传文章路由  */
router.post('articles', genValidator(articleValidator), async (ctx) => {
  const articleData = ctx.request.body
  // 调用controller
  const result = await addArticle(articleData)
  ctx.body = result
})

/** 获得文章列表路由 */
router.get('articles', genValidator(articlePaginationValidator),async (ctx) => {
  const articleQuery = ctx.request.query
  const result = await getArticleList(articleQuery)
  ctx.body = result
})


/** 添加文章评论路由 */
router.post('articles/comment', genValidator(articleCommentValidator),async (ctx) => {
  const commentData = ctx.request.body
  const result = await addArticleComment(commentData)
  ctx.body = result
}) 


/** 获得文章评论列表 */ 
router.get('articles/comment', genValidator(articleCommentPaginationValidator),async (ctx) => {
  const commentQuery = ctx.request.query
  const result = await getArticleCommentList(commentQuery)
  ctx.body = result
}) 