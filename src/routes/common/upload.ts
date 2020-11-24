/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-14 17:24:59
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-17 17:00:09
 */
import Router from "@koa/router";
import path from 'path'
export const router = new Router({
  prefix: '/api/upload/',
  strict: true
})

// 上传图片
router.post('images', async (ctx) => {
  if(ctx.request.files){
    // console.log(ctx.request.files['ArticleBgImage'].path)
    const imgPath = ctx.request.files['ArticleBgImage'].path
    const baseName = path.basename(imgPath)
    ctx.body = { url: `${ctx.origin}/${baseName}`}
  }else {
    ctx.status = 400 
    ctx.body = { message: '文件上传失败' }
  }
})