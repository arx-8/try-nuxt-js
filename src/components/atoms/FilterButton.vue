<template>
  <button
    class="filter-button"
    :disabled="disabled"
    @click.stop.prevent="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
// organize-imports-ignore
import Vue from 'vue'

type Data = Record<string, never>

type Methods = Record<string, never>

type Computed = Record<string, never>

type Props = {
  disabled: boolean
  onClick: () => void
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    disabled: {
      type: Boolean,
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
.filter-button {
  cursor: pointer;
}

.filter-button:disabled {
  cursor: default;
}
</style>
