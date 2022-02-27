import { Brand } from 'utility-types'

export type TodoID = Brand<number, 'TodoID'>

export type Todo = {
  done: boolean
  id: TodoID
  taskName: string
}

export const generateTodoID = (): TodoID => {
  return new Date().getTime() as TodoID
}
