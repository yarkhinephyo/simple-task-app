<template>
  <b-card class="my-2">
    <b-container fluid>
      <!-- If it is not expanded and there is a valid task name -->
      <b-row v-if="taskData.name && !expanded">
        <!-- Task Details -->
        <b-col sm="9">
          {{ taskData }}
        </b-col>

        <!-- User Options -->
        <b-col sm="3">
          <a class="mx-1" href="#" @click="expanded = true">
            <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
          </a>
          <a class="mx-1" href="#"
            ><b-icon-check2 variant="success"> </b-icon-check2>
          </a>
          <a class="mx-1" href="#" @click="deleteTask(taskData.id)">
            <b-icon-trash-fill variant="danger"></b-icon-trash-fill>
          </a>
        </b-col>
      </b-row>

      <!-- If it is expanded or has data -->
      <b-row class="justify-content-center" v-else>
        <b-col sm="10">
          <b-form-input
            v-model="taskname"
            type="text"
            placeholder="I have to..."
          ></b-form-input>
        </b-col>
        <b-col sm="2">
          <b-button
            class="mx-1"
            size="sm"
            variant="outline-secondary"
            @click="handleUpdate"
          >
            <b-icon-journal-plus variant="secondary"></b-icon-journal-plus>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TaskCard",
  data() {
    return {
      expanded: false,
      taskname: "",
    };
  },
  created() {
    if (this.taskData.name) {
      this.taskname = this.taskData.name;
    }
  },
  props: [
    'taskData'
  ],
  methods: {
    ...mapActions({
      deleteTask: "tasks/deleteTask",
      updateTask: "tasks/updateTask"
    }),
    handleUpdate(){
      this.expanded = false
      
      // Do nothing if no input by user
      if(this.taskname === ""){
        return
      }

      this.updateTask({
        id: this.taskData.id,
        name: this.taskname,
        done: false
      })
    }
  },
};
</script>

<style>
</style>