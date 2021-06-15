import Koa from 'koa'
import koaBody from 'koa-body'
import dotenv from 'dotenv'
import logger from 'koa-logger'
import router from './router'
import { initControllers } from './utils/helper'

dotenv.config()
export const app = new Koa();

app.use(logger())
app.use(koaBody())


app.context.port = process.env.PORT || 3000
// 初始化控制器
initControllers();

// 注册路由
app.use(router.routes()).use(router.allowedMethods())

// 404 not found处理
app.use(function (ctx, next) {
  ctx.status = 404
  ctx.body = {
    text: '404 not found'
  }
});

// 错误处理
app.on('error', err => {
  console.log('server error', err, '-------------------')

});

app.listen(app.context.port, () => {
  console.log(`server is running on ${app.context.port}`)
})
