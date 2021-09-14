/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 17:24:16
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-25 11:21:00
 */
import  {JSONSchemaType, DefinedError}  from 'ajv'
import getValidator from './validator'


export interface PaginationSchema {
  limit: number;
  offset: number;
}

//分页参数json构架
const paginationSchema:JSONSchemaType<PaginationSchema> = {
  type: 'object',
  required: ['limit', 'offset'],
  properties: {
    limit: { type: 'number' , default: 20},
    offset: { type: 'number', default: 0}
  },
  additionalProperties: false
}

type ImageSize= '100'| '200'| '640'
  
export interface QParameter {
  nk: string; // qq邮箱号
  s: ImageSize; // 分辨率
}

// qq头像json构架
const qqImageSchema:JSONSchemaType<QParameter> = {
  type: 'object',
  required: ['nk', 's'],
  properties: {
    nk: { type: 'string'},
    s: { type: 'string', pattern: '/100|200|640/'}
  },
  additionalProperties: false
}

export function paginationValidator (data: Record<any,any>): DefinedError[] | undefined {
  return getValidator(paginationSchema, data)
}

export function qqImageValidator (data: Record<any,any>): DefinedError[] | undefined {
  return getValidator(qqImageSchema, data)
}