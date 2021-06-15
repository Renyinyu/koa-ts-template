import 'reflect-metadata'
import router from '../router'
import { Middleware } from 'koa'
import { RequestMethod } from './request-method'
import { MetaKeys } from '../configs/metaKeys'


function controller(prefix?: string): ClassDecorator {
  return function (target) {
    prefix = prefix || '/'

    if (!prefix.trim().startsWith('/')) {
      prefix = `/${prefix}`
    }

    for (let key in target.prototype) {
      const path = Reflect.getMetadata(MetaKeys.path, target.prototype, key) // 从控制器中获取路由路径
      const method: RequestMethod = Reflect.getMetadata(MetaKeys.method, target.prototype, key) // 从控制器中获取请求方法
      const middleware: Middleware[] = Reflect.getMetadata(MetaKeys.middleware, target.prototype, key)
      const handler = target.prototype[key]
      if (path && method && typeof handler === 'function') {
        if (middleware) {
          // 中间件处理
          router[method](`${prefix}${path}`, ...middleware, handler)
        } else {
          router[method](`${prefix}${path}`, handler)
        }
      }
    }
  }
}

export default controller