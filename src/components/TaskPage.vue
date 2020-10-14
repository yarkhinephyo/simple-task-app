<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col xs="10" sm="9" md="8">
        <TaskCard v-for="task in tasks" :taskData="task" :key="task.id"/>
      </b-col>
    </b-row>
  </b-container>
    
</template>

<script>
import TaskCard from './TaskCard.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TaskPage",
  components: {
    TaskCard
  },
  computed: {
    ...mapGetters({
      tasks: 'tasks/getTasks'
    })
  },
  created(){
    this.retrieveLatestTasks()
  },
  methods: {
    ...mapActions({
      retrieveLatestTasks: "tasks/retrieveLatestTasks"
    })
  }
};
</script>

<style>
</style>
