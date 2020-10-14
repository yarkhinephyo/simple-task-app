<template>
  <b-container fluid>
    <b-row class="justify-content-center">
      <b-col xs="12" sm="10" md="8">
        <TaskCard v-for="task in tasks" :taskData="task" :key="task.id" />
        <b-button
          class="mx-1"
          size="sm"
          variant="outline-success"
          @click="addTaskCard"
        >
          <b-icon-folder-plus variant="success"></b-icon-folder-plus>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TaskCard from "./TaskCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TaskPage",
  components: {
    TaskCard,
  },
  computed: {
    ...mapGetters({
      tasks: "tasks/getTasks",
    }),
  },
  created() {
    this.retrieveLatestTasks();
  },
  methods: {
    ...mapActions({
      retrieveLatestTasks: "tasks/retrieveLatestTasks",
      addEmptyTask: "tasks/addEmptyTask",
    }),
    addTaskCard() {
      this.addEmptyTask({ id: Date.now(), name: "", done: false });
    },
  },
};
</script>

<style>
</style>
