import { Middleware } from 'koa'
import { postRequest } from '../utils/request'

/**
 * 请求转发中间件
 */
export function transmit(): Middleware {
  return async (ctx) => {
    try {
      const { data, headers } = await postRequest({
        url: ctx.url,
        data: ctx.request.body,
        headers: ctx.headers
      })
      console.log('headers------------', headers)
      if (headers['formonz-token']) {
        ctx.response.set('formonz-token', headers['formonz-token'])
      }
      ctx.body = data
    } catch (error) {
      console.log('-------- transmit error -------------', error.message)
      ctx.body = {
        text: error.message,
        code: error.response.status || 500,
      }
    }
  }
}

