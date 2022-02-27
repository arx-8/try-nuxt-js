import { TodoID } from '@/domain/todo'
import { Filter, State } from '@/store/todoApp'

export type KeyLabel = {
  key: Filter
  label: string
}

export type Data = {
  filterKeyLabels: KeyLabel[]
}

export type Methods = {
  onAddTodo: (e: KeyboardEvent) => void
  onClickDelete: (id: TodoID) => void
  onClickFilter: (filter: Filter) => void
  onClickTodo: (id: TodoID) => void
}

export type Computed = {
  filter: Filter
  filteredTodoList: State['todoList']
  typingTaskName: string
}
