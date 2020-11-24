/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 16:20:05
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-13 17:43:16
 */
import Ajv, { Schema,DefinedError,  } from 'ajv'
const ajv = new Ajv({coerceTypes: true, useDefaults: true})

// 生成校验函数
export default function getValidator (schema: Schema, data: Record<any, any>): DefinedError[] | undefined {
  const validate  = ajv.compile(schema)
  if(!validate(data)){
    return (validate.errors) as  DefinedError[]
  }
}