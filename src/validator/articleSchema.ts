/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 17:46:07
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 11:11:06
 */
import  {JSONSchemaType, DefinedError}  from 'ajv'
import getValidator from './validator'

export interface ArticleSchema {
  articleTitle: string;
  articleContent: string;
  articleText: string;
  tags: string[];
  bgImg: string;
}

// 文章json格式校验架构
const articleSchema: JSONSchemaType<ArticleSchema> = {
  type: 'object',
  properties: {
    articleTitle: { type: 'string' },
    articleContent: { type: 'string' },
    articleText: { type: 'string' },
    tags: {
      type: 'array',
      items: { type: 'string'},
      minItems: 1,
      maxItems: 10  
    },
    bgImg: { type: 'string' },
  },
  required: [ 'articleTitle', 'articleContent', 'articleText', 'tags', 'bgImg' ],
  additionalProperties: false,
}

export interface ArticleCommentSchema {
  parentId?: string;
  nickname: string;
  byNickname?: string;
  email:string;
  website?: string;
  commentContent: string;
  articleTitle: string;
} 

// 文章评论json构架
const ArticleCommentSchema: JSONSchemaType<ArticleCommentSchema> = {
  type: 'object',
  additionalProperties: false,
  required: ['articleTitle', 'commentContent', 'nickname', 'email'],
  properties: {
    parentId: {
      type: 'string',
      nullable: true
    },
    articleTitle: {
      type: 'string',     
    },
    commentContent: {
      type: 'string'
    },
    nickname: {
      type: 'string'
    },
    byNickname: {
      type: 'string',
      nullable: true
    },
    email: {
      type: 'string'
    },
    website: {
      type: 'string',
      nullable: true
    }
  }
}

export interface ArticleCommentPaginationSchema {
  articleTitle: string; 
  limit: number;
  offset: number;
}

// 文章分页json构架
const ArticleCommentPaginationSchema:JSONSchemaType<ArticleCommentPaginationSchema> = {
  type: 'object',
  additionalProperties: false,
  required: ['articleTitle', 'limit', 'offset'],
  properties: {
    articleTitle: { type: 'string' },
    limit: { type: 'number' , default: 20},
    offset: { type: 'number', default: 0}
  },
}



export  function articleValidator (data: Record<any, any>): DefinedError[] | undefined {
  return getValidator(articleSchema, data)
}

export  function articleCommentValidator(data: Record<any, any>): DefinedError[] | undefined{
  return getValidator(ArticleCommentSchema, data)
}

export function articleCommentPaginationValidator (data: Record<any, any>): DefinedError[] | undefined{
  return getValidator(ArticleCommentPaginationSchema, data)
}

