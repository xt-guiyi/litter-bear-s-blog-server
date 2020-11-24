/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 18:57:39
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 18:40:14
 */
import { Article } from '../db/model/index'
import { Comment } from '../db/model/index'
import { Document } from 'mongoose'

/** 添加文章 */
export async function createArticle (articleTitle: string, articleContent: string, articleText: string, tags: string[], bgImg: string): Promise<Document> {
  // 添加
  const insertResult = await Article.create(
    { 
      'articleTitle': articleTitle,
      'articleContent': articleContent, 
      'articleText': articleText,
      'tags': tags,
      'bgImg': bgImg
    },
    )
    return insertResult
}

/** 查找文章  */
export async function queryArticle (limit: number, offset: number, ): Promise<Record<string, number | Document[]>> {
  // 查找
  const queryResult = await Article.find().skip(offset).limit(limit)
  const CountResult = await Article.estimatedDocumentCount()
  const data = {
    total: CountResult,
    articleList: queryResult
  }
  return data
}

/** 添加文章评论 */
export function createArticleComment(data: Record<string, unknown>): Promise<Document>{
  // 添加
  const  insertResult = Comment.create(data)
  return insertResult 
}

export interface QueryArticleOneComment{
  total: number;
  articleCommentList: Document[]
}
/** 查找文章评论 */
export async function queryArticleOneComment(articleTitle: string, limit: number, offset: number, ): Promise<QueryArticleOneComment> {
  // 查找
  const queryResult = await Comment.find({
    'articleTitle': articleTitle,
    'parentId': null,
    'byNickname': null
  }).skip(offset).limit(limit)

  const CountResult = await Comment.find({
    'articleTitle': articleTitle,
    'parentId': null,
    'byNickname': null
  }).countDocuments()
  const data = {
  total: CountResult,
  articleCommentList: queryResult
  }  
  return data
} 


/** 查找文章二级评论 */
export async function queryTwoComment(_id: string): Promise<QueryArticleOneComment> {
  // 查找
  const queryResult = await Comment.find({
    'parentId': _id,
  })
  
  const CountResult = await Comment.find({
    'parentId': _id,
  }).countDocuments()


  const data = {
  total: CountResult,
  articleCommentList: queryResult
  }  
  return data
} 
