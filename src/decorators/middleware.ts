import { Middleware } from 'koa'
import { MetaKeys } from '../configs/metaKeys'
import 'reflect-metadata';

function middleware(requestHandler: Middleware): MethodDecorator {
  return function (target, key) {
    const _middlewares = Reflect.getMetadata(MetaKeys.middleware, target, key) || []
    _middlewares.push(requestHandler)
    Reflect.defineMetadata(MetaKeys.middleware, _middlewares, target, key)
  }
}

export default middleware
