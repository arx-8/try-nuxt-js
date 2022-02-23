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
      <div class="todo-list">
        <ul>
          <li v-for="(todo, i) in filteredTodoList" :key="todo.id">
            <button
              class="delete-button"
              @click.stop.prevent="onClickDelete(i)"
            >
              X
            </button>
            <label class="todo-line" @click.stop.prevent="onClickTodo(i)">
              <!-- `@click.stop=""` is workaround. Without this, when user click on the checkbox, the check status will be wrong. -->
              <input
                v-model="todo.done"
                class="todo-line"
                type="checkbox"
                @click.stop=""
              />
              <span :class="{ done: todo.done }">
                {{ todo.taskName }}
              </span>
            </label>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'
import { assertNever } from '@/types/utils'

type Todo = {
  done: boolean
  id: number
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
  onClickDelete: (index: number) => void
  onClickFilter: (filter: Filter) => void
  onClickTodo: (index: number) => void
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
          id: 1,
          taskName: 'the one',
        },
        {
          done: true,
          id: 2,
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
        id: new Date().getTime(),
        taskName: this.taskName,
      })
      this.taskName = ''
    },
    onClickDelete(index) {
      this.todoList = this.todoList.filter((_, i) => i !== index)
    },
    onClickTodo(index) {
      const todo = this.todoList[index]
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

.todo-list {
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

.todo-line:hover {
  cursor: pointer;
  opacity: 0.6;
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
