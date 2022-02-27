<template>
  <div>
    <div class="root">
      <AtomsFilterButton
        v-for="v in keyLabels"
        :key="v.key"
        class="filter-button"
        :disabled="v.key === currentKey"
        :on-click="() => onClick(v.key)"
      >
        {{ v.label }}
      </AtomsFilterButton>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'
import { KeyLabel } from '@/pages/todo-app-vuex/types'

type Data = Record<string, never>

type Methods = Record<string, never>

type Computed = Record<string, never>

type Props = {
  currentKey: string
  keyLabels: KeyLabel[]
  onClick: (key: string) => void
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    currentKey: {
      type: String,
      required: true,
    },
    keyLabels: {
      type: Array,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
})
</script>

<style scoped>
.root {
  display: flex;
}

.filter-button:not(:first-child) {
  margin-left: 8px;
}
</style>
