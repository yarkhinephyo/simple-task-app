<template>
  <div id="app">
    <TaskPage />
  </div>
</template>

<script>
import TaskPage from './components/TaskPage.vue'

export default {
  name: 'App',
  components: {
    TaskPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
