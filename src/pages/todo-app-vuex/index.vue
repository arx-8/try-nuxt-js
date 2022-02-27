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

export default Vue.extend<Data, Methods, Computed>({
  layout: 'default-layout',
  data() {
    return {
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
    }
  },
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
