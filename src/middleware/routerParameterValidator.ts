import { DefinedError } from "ajv"
import { Next, ParameterizedContext } from "koa"
import _ from 'lodash'
/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-13 10:19:14
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-20 14:51:25
 */

interface ValidatorFunction {
  (data: Record<any, any>) : undefined | DefinedError[]
}

/**
 * 路由参数校验
 * @param validateFunction 校验函数
 */
export default function genValidator(validateFunction: ValidatorFunction) {
  return async (ctx: ParameterizedContext , next: Next): Promise<void> => {
    let data;
    const isGet = _.isEmpty(ctx.request.body)
    if(isGet) {
      data = ctx.request.query
    }else {
      data = ctx.request.body
    }
    const error =  validateFunction(data)
    if(error){
      ctx.status = 400
      ctx.body = { message: error[0].message }
      return
    }
    await next()
  }
}