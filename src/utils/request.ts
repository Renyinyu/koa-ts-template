import axios from 'axios'
import { ObjectType } from '../typings/common.d';
import dotenv from 'dotenv'

dotenv.config()

const baseURL = process.env.BASE_URL

console.log('baseURL,', baseURL)

// TODO: baseURL通过环境判断获取
const service = axios.create({
  baseURL,
  timeout: 15000, // 15s 后超时
})

service.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8"

/**
 * 请求实例响应拦截器
 */
service.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('----------- interceptors.response ----------', response)
  // console.log(response)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  return Promise.reject(error);
});

interface PostRequestParams {
  url: string;
  data: any;
  token?: string;
  headers?: ObjectType
}

const postRequest = async ({ url, data, headers }: PostRequestParams) => {
  try {
    return service({
      url,
      method: 'POST',
      data,
      headers
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export { postRequest }

