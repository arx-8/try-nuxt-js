import type { Todo, TodoID } from '@/domain/todo'

type Filter = 'all' | 'todo' | 'done'

export type Data = {
  filter: Filter
  taskName: string
  todoList: Todo[]
}

export type Methods = {
  onAddTodo: (e: KeyboardEvent) => void
  onClickDelete: (id: TodoID) => void
  onClickFilter: (filter: Filter) => void
  onClickTodo: (id: TodoID) => void
}

export type Computed = {
  filteredTodoList: Data['todoList']
}
