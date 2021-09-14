/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 18:52:24
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-26 09:48:45
 */
import { ArticleSchema, ArticleCommentSchema, ArticleCommentPaginationSchema, ArticlePaginationSchema } from '../validator/articleSchema'
import { Document } from 'mongoose'
import { createArticle, queryArticle, createArticleComment, QueryArticleComment, queryArticleOneComment, queryTwoComment } from '../services/article'
// import { getQQImage } from '../api/qq'
// import fs from 'fs'
// import path from 'path'
// import { stringify } from 'querystring'

/** 添加文章 Controller */ 
export async function addArticle({articleTitle, articleContent, articleText, tags, bgImg, isTop}: ArticleSchema):Promise<Document> {
  let articleData = {
    articleTitle,
    articleContent,
    articleText,
    tags,
    bgImg,
  }
  if(isTop) {
    articleData = Object.assign(articleData, { isTop })
  }
  // 调用数据库
  const callResult = await createArticle(articleData)
  return callResult
}

/** 获取文章列表 Controller */
export async function getArticleList({limit, offset, isTop, all}: ArticlePaginationSchema):Promise<Record<string, number | Document[]>> {
  // 调用数据库
  const callResult = await queryArticle(limit, offset, isTop, all)
  // console.log(callResult)
  return callResult
} 

/** 添加文章评论 Controller */
export async function addArticleComment({parentId, nickname, byNickname, email, website, commentContent, articleId}: ArticleCommentSchema):Promise<Document>{
  // 两种方式 第一种直接后端请求qq服务器返回图片，存在本地,返回链接， 另一种拼接qq头像请求链接返回前端
  // 1.
  // const { data } = await getQQImage({nk: email, s: '100'})
  // console.log(data)
  // // const readerStream =  fs.createReadStream(data)
  // const writeStream = fs.createWriteStream(path.resolve(__dirname, `../../upload/${new Date().getTime()}.jpg`))
  // data.pipe(writeStream)
  // 2.
  const avatar = `https://q4.qlogo.cn/g?b=qq&nk=${email}&s=100`
  let articleCommentData = {
    nickname,
    email,
    commentContent,
    articleId,
    avatar
  }
  if(parentId){
    articleCommentData = Object.assign(articleCommentData, { parentId })
  }
  if(byNickname){
    articleCommentData = Object.assign(articleCommentData, { byNickname })
  }
  if(website){
    articleCommentData = Object.assign(articleCommentData, { website })
  }
  // 调用数据库
  const callResult = await createArticleComment(articleCommentData)
  return callResult
}


/** 获取文章评论 Controller */
export async function getArticleCommentList({articleId, limit, offset}: ArticleCommentPaginationSchema): Promise<QueryArticleComment> {
  // 调用数据库
  const callResult = await queryArticleOneComment(articleId, limit, offset)
  interface ReturnData {
    total: number;
    articleCommentList: any[]
  }
  const returnData: ReturnData = {
    total: callResult.total,
    articleCommentList: []
  }
  try {
    // 插入二级评论
    for (let index = 0; index < callResult.articleCommentList.length; index++) {
      const childrenComment = await queryTwoComment(callResult.articleCommentList[index].get('_id'))
      returnData.articleCommentList.push({
        ...callResult.articleCommentList[index] .toObject(),
        childrenComment 
      })
    }
  } catch (error) {
    throw new Error(error)
  }
  return returnData   
} 