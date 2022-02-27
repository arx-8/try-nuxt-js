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
          v-model="typingTaskName"
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
                  class="todo-item"
                  type="checkbox"
                  :checked="todo.done"
                  @click.stop=""
                  @change.stop.prevent="onClickTodo(todo.id)"
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
import type { Computed, Data, Methods } from './types'

export default Vue.extend<Data, Methods, Computed>({
  layout: 'default-layout',
  computed: {
    filteredTodoList() {
      return this.$accessor.todoApp.filteredTodoList
    },
    typingTaskName: {
      get() {
        return this.$accessor.todoApp.typingTaskName
      },
      set(v) {
        this.$accessor.todoApp.setTypingTaskName(v)
      },
    },
    filter: {
      get() {
        return this.$accessor.todoApp.filter
      },
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
      this.$accessor.todoApp.addTodo()
    },
    onClickDelete(id) {
      this.$accessor.todoApp.deleteTodo(id)
    },
    onClickTodo(id) {
      this.$accessor.todoApp.toggleTodo(id)
    },
    onClickFilter(filter) {
      this.$accessor.todoApp.setFilter(filter)
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
