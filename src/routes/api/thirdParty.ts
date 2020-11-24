import Router  from '@koa/router'
import {getQQImage } from '../../api/qq'
import genValidator from '../../middleware/routerParameterValidator'
import { qqImageValidator } from '../../validator/commonSchema'
export const router = new Router({
  prefix: '/api/qq/',
  strict: true
})


/** qq头像 */ 
router.get('avatar', genValidator(qqImageValidator), async (ctx) => {
  const qqImgQuery = ctx.request.query
  const result = await getQQImage(qqImgQuery)
  ctx.body = result.data
})

