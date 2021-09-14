/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-19 12:11:33
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-25 14:02:35
 */
import mongoose from 'mongoose'
const {Schema, model} =  mongoose
let ObjectId = mongoose.Schema.Types.ObjectId;
const comment = new Schema({
  // 父评论人id
  parentId:{
    type: ObjectId,
    default: null
  },
  // 评论人用户昵称
  nickname: {
    type: String,
    required: true
  },
  // 评论目标用户昵称
  byNickname:{
    type: String,
    default: null
  }, 
  // 头像
  avatar: {
    type: String,
    required: true,
  },
  // 评论文章id
  articleId: {
    type: ObjectId,
    required: true
  },
  // 邮箱
  email: {
    type: String,
    required:true
  },
  // 网址
  website: {
    type: String,
    default: null
  },
  // 评论内容
  commentContent: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

export const Comment = model('comment', comment)