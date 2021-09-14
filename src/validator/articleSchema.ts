/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 17:46:07
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-25 17:01:07
 */
import  {JSONSchemaType, DefinedError}  from 'ajv'
import getValidator from './validator'

export interface ArticleSchema {
  articleTitle: string;
  articleContent: string;
  articleText: string;
  tags: string[];
  bgImg: string;
  isTop?: boolean;
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
    isTop: { type: 'boolean', nullable: true },
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
  articleId: string;
} 

// 文章评论json构架
const articleCommentSchema: JSONSchemaType<ArticleCommentSchema> = {
  type: 'object',
  additionalProperties: false,
  required: [ 'commentContent', 'nickname', 'email', 'articleId'],
  properties: {
    parentId: {
      type: 'string',
      nullable: true
    },
    articleId: {
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

export interface ArticlePaginationSchema {
  isTop?: boolean; 
  limit: number;
  offset: number;
  all?: boolean;
}

//文章分页参数json构架
const articlePaginationSchema: JSONSchemaType<ArticlePaginationSchema> = {
  type: 'object',
  required: ['limit', 'offset'],
  properties: {
    isTop: {
      type: 'boolean',
      nullable: true,
    },
    limit: { type: 'number' , default: 20},
    offset: { type: 'number', default: 0},
    all: { type: 'boolean', nullable: true}
  },
  additionalProperties: false
}


export interface ArticleCommentPaginationSchema {
  articleId: string; 
  limit: number;
  offset: number;
}

// 文章评论分页json构架
const articleCommentPaginationSchema:JSONSchemaType<ArticleCommentPaginationSchema> = {
  type: 'object',
  additionalProperties: false,
  required: ['articleId', 'limit', 'offset'],
  properties: {
    articleId: { type: 'string' },
    limit: { type: 'number' , default: 20},
    offset: { type: 'number', default: 0}
  },
}


/** 文章router参数校验函数 */ 
export  function articleValidator (data: Record<any, any>): DefinedError[] | undefined {
  return getValidator(articleSchema, data)
}
/** 文章评论router参数校验函数 */ 
export  function articleCommentValidator(data: Record<any, any>): DefinedError[] | undefined{
  return getValidator(articleCommentSchema, data)
}

/** 文章分页router参数校验函数 */ 
export function articlePaginationValidator (data: Record<any, any>): DefinedError[] | undefined{
  return getValidator(articlePaginationSchema, data)
}

/** 文章评论分页router参数校验函数 */ 
export function articleCommentPaginationValidator (data: Record<any, any>): DefinedError[] | undefined{
  return getValidator(articleCommentPaginationSchema, data)
}



