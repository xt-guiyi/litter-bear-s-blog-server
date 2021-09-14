/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 18:57:39
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-27 09:47:24
 */
import { Article } from '../db/model/index'
import { Comment } from '../db/model/index'
import { Document } from 'mongoose'

/** 添加文章 */
export async function createArticle (data: Record<string, unknown>): Promise<Document> {
  // 添加
  const insertResult = await Article.create(data)
    return insertResult
}

/** 查找文章  */
export async function queryArticle (limit: number, offset: number, isTop = false, all = false ): Promise<Record<string, number | Document[]>> {
  let queryResult;
  let CountResult;
  // 如果为all则查找全部
  if(all){
    queryResult = await Article.find()
    CountResult = await Article.estimatedDocumentCount()
  }else {
    // 根据isTop查找置顶或非置顶文章
    queryResult = await Article.find({ 'isTop': isTop}).skip(offset).limit(limit).sort({ 'createdAt': -1})
    CountResult = await Article.find({ 'isTop': isTop}).countDocuments()
  }
  
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

export interface QueryArticleComment{
  total: number;
  articleCommentList: Document[]
}
/** 查找文章评论 */
export async function queryArticleOneComment(articleId: string, limit: number, offset: number, ): Promise<QueryArticleComment> {
  // 查找
  const queryResult = await Comment.find({
    'articleId': articleId,
    'parentId': null,
    'byNickname': null
  }).skip(offset).limit(limit)

  const CountResult = await Comment.find({
    'articleId': articleId,
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
export async function queryTwoComment(_id: string): Promise<QueryArticleComment> {
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
