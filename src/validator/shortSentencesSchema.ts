/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 16:51:11
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 14:19:53
 */
import { JSONSchemaType, DefinedError} from 'ajv'
import getValidator from './validator'

export interface ShortSentencesSchema {
  shortSentencesText: string;
  shortSentencesHtml: string;
}

// 句子json格式校验架构
const shortSentencesSchema: JSONSchemaType<ShortSentencesSchema>= {
  type: 'object',
  additionalProperties:false,
  required:['shortSentencesText','shortSentencesHtml'],
  properties:{
    shortSentencesText:{
      type: 'string',
    },
    shortSentencesHtml:{
      type: 'string'
    }
  }
}

export function shortSentencesValidator(data: Record<any, any>): DefinedError[] | undefined {
  console.log(data)
  return getValidator(shortSentencesSchema, data)
}