<template>
  <div>
    <div>
      <h1>Try Vue.js!</h1>
    </div>
    <main class="main">
      <ul>
        <li class="item">
          <nuxt-link to="/todo-app">TODO App</nuxt-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
/* eslint-disable sort-keys-fix/sort-keys-fix */
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'default-layout',
})
</script>

<style scoped>
.item {
  padding-top: 16px;
}
</style>
