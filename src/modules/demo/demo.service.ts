
import { TodoResponse } from './demo.interface'

class TodoService {

  async search(): Promise<TodoResponse> {
    return {
      name: '',
      duration: ''
    }
  }
}

export default TodoService