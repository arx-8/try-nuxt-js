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
      <div class="actions-wrapper">
        <OrganismsFiltersBar
          :current-key="filter"
          :key-labels="filterKeyLabels"
          :on-click="onClickFilter"
        />
      </div>
      <div class="todo-list-wrapper">
        <OrganismsTodoList
          :on-click-delete="onClickDelete"
          :on-click-todo="onClickTodo"
          :todo-list="filteredTodoList"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'
import type { Computed, Data, Methods } from './types'
import { TodoID, generateTodoID } from '@/domain/todo'
import { assertNever } from '@/types/utils'

export default Vue.extend<Data, Methods, Computed>({
  layout: 'default-layout',
  data() {
    return {
      filter: 'all',
      filterKeyLabels: [
        {
          key: 'all',
          label: 'ALL',
        },
        {
          key: 'todo',
          label: 'TODO',
        },
        {
          key: 'done',
          label: 'DONE',
        },
      ],
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

.actions-wrapper {
  padding-top: 16px;
}

.todo-list-wrapper {
  padding-top: 16px;
}

.input::placeholder {
  color: silver;
}
</style>
