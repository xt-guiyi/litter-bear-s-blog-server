/*
 * @Description: 
 * @Author: 小熊熊
 * @Date: 2020-10-28 18:15:10
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-13 11:35:35
 */
import { ErrorInfoInterface } from './model/types';
/**
 * 基础模块
 */
interface BaseModelInterface {
  message?: string;
}
class BaseModel implements BaseModelInterface{
  public message 
  constructor(message: string) {
      this.message = message
  }
}

/**
 * 成功的数据模型
 */
interface SuccessModelInterface {
  status?: number;
  data? : Record<string,unknown>;
}
export class SuccessModel extends BaseModel implements SuccessModelInterface {
  public status?: number
  public data?: Record<string,unknown>;
  constructor(message?: string, status?: number, data?: Record<string,unknown>) {
    if(message === undefined){
      message = 'success'
    }
    if(status === undefined){
      status = 200
    }
    super(message)
    if(data){
      this.data = data
    }
    this.status = status
  }
}

interface ErrorModelInterface {
  errno: number;
}
/**
* 失败的数据模型
*/
export class ErrorModel extends BaseModel implements ErrorModelInterface{
  public errno: number;
  constructor(errorInfo: ErrorInfoInterface) {
    const { message, errno} = errorInfo
    super(message)
    this.errno = errno
  }
}



