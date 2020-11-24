/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 14:27:22
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-20 14:45:13
 */
import Koa from "koa";
import Logger  from 'koa-logger'
import KoaBody from 'koa-body'
import Cors from "@koa/cors";
import Static from 'koa-static'
import path from 'path'
import  { ArticleApiRouter, ShortSentencesApiRouter, ThirdPartyApiRouter }  from './routes/api/index' 
import  { UploadApiRouter }  from './routes/common/index' 
import './db/mongoose'
const app = new Koa()

app.use(Logger())
app.use(Cors())
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 5 * 1024 * 1024,
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}))
app.use(Static(path.join(__dirname, '../upload')))


// 路由
app.use(ArticleApiRouter.routes()).use(ArticleApiRouter.allowedMethods())
app.use(ShortSentencesApiRouter.routes()).use(ShortSentencesApiRouter.allowedMethods())
app.use(ThirdPartyApiRouter.routes()).use(ThirdPartyApiRouter.allowedMethods())
// app.use(CommentApiRouter.routes()).use(CommentApiRouter.allowedMethods())
app.use(UploadApiRouter.routes()).use(UploadApiRouter.allowedMethods())
app.on('error',(err, ctx)=>{
  console.log('服务错误:'+ err)
  console.log(ctx.body)
})
app.listen(3000, ()=>{
  console.log('服务启动成功: http://localhost:3000')
})