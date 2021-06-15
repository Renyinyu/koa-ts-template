import { Context } from 'koa'
import { controller, post } from '../../decorators'
import { CreateTodoDto } from './demo.dto'

@controller('todo')
class TodoController {
  @post('/create')
  create(ctx: Context) {
    let requestBody: CreateTodoDto = ctx.request.body
    console.log(requestBody.title)
    // req
    ctx.body = requestBody
  }


}

export default TodoController