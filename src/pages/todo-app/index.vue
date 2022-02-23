<template>
  <div>
    <nuxt-link to="/">
      <span><AtomsBackIcon /> Go to top</span>
    </nuxt-link>

    <h1 class="title">TODO App</h1>
    <main class="main">
      <div>
        <input
          ref="taskNameInput"
          v-model="taskName"
          class="input"
          placeholder="input your task!"
          type="text"
          @keydown.enter="onAddTodo"
        />
      </div>
      <div class="actions">
        <button
          class="filter-button"
          :disabled="filter === 'all'"
          @click.stop.prevent="onClickFilter('all')"
        >
          ALL
        </button>
        <button
          class="filter-button"
          :disabled="filter === 'todo'"
          @click.stop.prevent="onClickFilter('todo')"
        >
          TODO
        </button>
        <button
          class="filter-button"
          :disabled="filter === 'done'"
          @click.stop.prevent="onClickFilter('done')"
        >
          DONE
        </button>
      </div>
      <div class="todo-list-wrapper">
        <ul>
          <transition-group name="todo-list">
            <li v-for="todo in filteredTodoList" :key="todo.id">
              <button
                class="delete-button"
                @click.stop.prevent="onClickDelete(todo.id)"
              >
                X
              </button>
              <label
                class="todo-item"
                @click.stop.prevent="onClickTodo(todo.id)"
              >
                <!-- `@click.stop=""` is workaround. Without this, when user click on the checkbox, the check status will be wrong. -->
                <input
                  v-model="todo.done"
                  class="todo-item"
                  type="checkbox"
                  @click.stop=""
                />
                <span :class="{ done: todo.done }">
                  {{ todo.taskName }}
                </span>
              </label>
            </li>
          </transition-group>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'
import { Brand } from 'utility-types'
import { assertNever } from '@/types/utils'

type TodoID = Brand<number, 'TodoID'>

const generateTodoID = (): TodoID => {
  return new Date().getTime() as TodoID
}

type Todo = {
  done: boolean
  id: TodoID
  taskName: string
}

type Filter = 'all' | 'todo' | 'done'

type Data = {
  filter: Filter
  taskName: string
  todoList: Todo[]
}

type Methods = {
  onAddTodo: (e: KeyboardEvent) => void
  onClickDelete: (id: TodoID) => void
  onClickFilter: (filter: Filter) => void
  onClickTodo: (id: TodoID) => void
}

type Computed = {
  filteredTodoList: Data['todoList']
}

export default Vue.extend<Data, Methods, Computed>({
  layout: 'default-layout',
  data() {
    return {
      filter: 'all',
      taskName: '',
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
    }
  },
  computed: {
    filteredTodoList() {
      return this.todoList.filter((t) => {
        switch (this.filter) {
          case 'all':
            return true

          case 'todo':
            return !t.done

          case 'done':
            return t.done

          default:
            return assertNever(this.filter)
        }
      })
    },
  },
  mounted() {
    if (this.$refs.taskNameInput instanceof HTMLInputElement) {
      this.$refs.taskNameInput.focus()
    }
  },
  methods: {
    onAddTodo(e: KeyboardEvent) {
      // prevent IME enter
      if (e.keyCode !== 13) return

      this.todoList.push({
        done: false,
        id: generateTodoID(),
        taskName: this.taskName,
      })
      this.taskName = ''
    },
    onClickDelete(id) {
      this.todoList = this.todoList.filter((t) => t.id !== id)
    },
    onClickTodo(id) {
      const todo = this.todoList.find((t) => t.id === id)
      if (todo != null) {
        todo.done = !todo.done
      }
    },
    onClickFilter(filter) {
      this.filter = filter
    },
  },
})
</script>

<style scoped>
.title {
  padding-top: 16px;
}

.main {
  padding-top: 16px;
}

.actions {
  padding-top: 16px;
  display: flex;
}

.todo-list-wrapper {
  padding-top: 16px;
}

.filter-button {
  cursor: pointer;
}

.filter-button:not(:first-child) {
  margin-left: 8px;
}

.filter-button:disabled {
  cursor: default;
}

.input::placeholder {
  color: silver;
}

li:not(:first-child) {
  padding-top: 8px;
}

.todo-item:hover {
  cursor: pointer;
  opacity: 0.6;
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: opacity 0.3s;
}

.todo-list-enter,
.todo-list-leave-to {
  opacity: 0;
}

.delete-button {
  background: unset;
  border: 1px solid;
  border-radius: 8px;
  font-size: 11px;
}

.delete-button:hover {
  cursor: pointer;
  background: pink;
}

.done {
  text-decoration: line-through;
}
</style>
