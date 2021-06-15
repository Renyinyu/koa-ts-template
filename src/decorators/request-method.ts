import 'reflect-metadata'
import { MetaKeys } from '../configs/metaKeys'

export type RequestMethod = 'get' | 'post' | 'delete'

function generateRequestMethodDecorator(method: RequestMethod) {
  return function (path: string): MethodDecorator {
    return function (target, key) {
      /**
       * 实例成员：target为原型对象
       * 静态成员：target为构造函数
       */
      if (!path.trim().startsWith('/')) {
        path = `/${path}`
      }
      Reflect.defineMetadata(MetaKeys.path, path, target, key)
      Reflect.defineMetadata(MetaKeys.method, method, target, key)
    }
  }
}

export const get = generateRequestMethodDecorator('get')
export const post = generateRequestMethodDecorator('post')
