/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-11-17 16:41:24
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-19 13:02:24
 */
import mongoose from 'mongoose'
const {Schema, model } = mongoose

const shortSentencesSchema = new Schema(
  {
    // text内容不包含图片
    shortSentencesText: {
      type: String,
      required:true
    },
    // html内容可以包含图片表情
    shortSentencesHtml: {
      type: String,
      required:true
    }
  },
  {
    timestamps: true
  }
)

export const ShortSentences = model('shortSentences', shortSentencesSchema)

