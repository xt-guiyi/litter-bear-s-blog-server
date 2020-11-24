import mongoose from 'mongoose'
import  {url, mongooseOptions}  from '../config/db'

mongoose.connect(url, mongooseOptions)
const db = mongoose.connection

db.on('error',()=>{
  console.log('数据库连接失败')
})
db.on('open',()=>{
  console.log('数据库打开')
})