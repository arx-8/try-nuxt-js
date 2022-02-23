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
      <div>
        <ul>
          <li v-for="(todo, i) in todoList" :key="todo.id">
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
import Vue from 'vue'

type Todo = {
  done: boolean
  id: number
  taskName: string
}

type Data = {
  taskName: string
  todoList: Todo[]
}

type Methods = {
  onAddTodo: (e: KeyboardEvent) => void
  onClickDelete: (index: number) => void
  onClickTodo: (index: number) => void
}

type Computed = {
  // NOP
}

export default Vue.extend<Data, Methods, Computed>({
  layout: 'default-layout',
  data() {
    return {
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
