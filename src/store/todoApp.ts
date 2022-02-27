// organize-imports-ignore
import { getterTree, mutationTree } from 'typed-vuex'
import { generateTodoID, Todo, TodoID } from '@/domain/todo'
import { assertNever } from '@/types/utils'

export type Filter = 'all' | 'todo' | 'done'

export type State = {
  filter: Filter
  todoList: Todo[]
  typingTaskName: string
}

export const state = (): State => {
  return {
    filter: 'all',
    todoList: [
      {
        done: false,
        id: 1 as TodoID,
        taskName: 'the one',
      },
      {
        done: true,
        id: 2 as TodoID,
        taskName: 'go out',
      },
    ],
    typingTaskName: 'Say Hello',
  }
}

export const getters = getterTree(state, {
  filteredTodoList: (state) => {
    return state.todoList.filter((t) => {
      switch (state.filter) {
        case 'all':
          return true

        case 'todo':
          return !t.done

        case 'done':
          return t.done

        default:
          return assertNever(state.filter)
      }
    })
  },
})

export const mutations = mutationTree(state, {
  addTodo(state) {
    state.todoList = [
      ...state.todoList,
      {
        done: false,
        id: generateTodoID(),
        taskName: state.typingTaskName,
      },
    ]
    state.typingTaskName = ''
  },
  deleteTodo(state, id: TodoID) {
    state.todoList = state.todoList.filter((t) => t.id !== id)
  },
  setFilter(state, filter: Filter) {
    state.filter = filter
  },
  setTypingTaskName(state, value: string) {
    state.typingTaskName = value
  },
  toggleTodo(state, id: TodoID) {
    state.todoList = (() => {
      const next = [...state.todoList]
      const found = next.find((t) => t.id === id)
      if (found != null) {
        found.done = !found.done
      }
      return next
    })()
  },
})
