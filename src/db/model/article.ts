/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-12 18:47:20
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-24 19:14:08
 */
import mongoose from 'mongoose';

const { Schema, model} = mongoose;
// 文章表
const ArticleSchema = new Schema({
  articleTitle: {
    type: String,
    required: true,
    index: true
  },
  articleContent: {
    type: String,
    required: true,
  },
  articleText: {
    type: String,
    required: true,
  },
  // 标签
  tags: {
    type: ['String'],
    validate:{
      validator: function(v: string[]) {
        return v.length >= 1;
      },
      message: '{VALUE} 必须有一个参数'
    },
  },
  // 评论数量
  commentNumber: {
    type: Number,
    default: 0
  },
  // 阅读数量
  readNumber: {
    type: Number,
    default: 0
  },
  // 点赞数量
  likeNumber: {
    type: Number,
    default: 0
  },
  bgImg: {
    type: String,
    default: 'https://blog.api.xiaoyou66.com/assets/images/background/img554.jpg'
  },
  isTop: {
    type: Boolean,
    default: false,
    index: true
  }
},
{
  timestamps: true
}
)

export const Article =  model('article', ArticleSchema)
