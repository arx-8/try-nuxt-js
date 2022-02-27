<template>
  <transition-group tag="ul" name="todo-list">
    <li v-for="todo in todoList" :key="todo.id">
      <button
        class="delete-button"
        @click.stop.prevent="() => onClickDelete(todo.id)"
      >
        X
      </button>
      <label class="todo-item" @click.stop.prevent="() => onClickTodo(todo.id)">
        <!-- `@click.stop=""` is workaround. Without this, when user click on the checkbox, the check status will be wrong. -->
        <input
          class="todo-item"
          type="checkbox"
          :checked="todo.done"
          @click.stop=""
          @change.stop.prevent="() => onClickTodo(todo.id)"
        />
        <span :class="{ done: todo.done }">
          {{ todo.taskName }}
        </span>
      </label>
    </li>
  </transition-group>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'
import { Todo, TodoID } from '@/domain/todo'

type Data = Record<string, never>

type Methods = Record<string, never>

type Computed = Record<string, never>

type Props = {
  onClickDelete: (id: TodoID) => void
  onClickTodo: (id: TodoID) => void
  todoList: Todo[]
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    onClickDelete: {
      type: Function,
      required: true,
    },
    onClickTodo: {
      type: Function,
      required: true,
    },
    todoList: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped>
li:not(:first-child) {
  padding-top: 8px;
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

.todo-item:hover {
  cursor: pointer;
  opacity: 0.6;
}

.done {
  text-decoration: line-through;
}
</style>
