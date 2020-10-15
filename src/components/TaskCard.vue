<template>
  <b-card class="my-2">
    <!-- If there is a valid task name and the user does not want to edit -->
    <b-row v-if="taskData.name && !expanded">
      
      <!-- Task Details -->
      <b-col cols="10" md="8">
        <span v-if="!taskData.done">
          {{ taskData.name }}
        </span>
        <span v-else>
          <del>{{ taskData.name }}</del>
        </span>
      </b-col>

      <!-- User Options for wider devices, varies based on whether task is done or not -->
      <b-col md="4" class="d-none d-md-block">
        <!-- Check done task and undone task -->
        <a class="mx-1" href="#" @click="toggleDone">
          <b-icon-check2
            variant="success"
            width="20"
            height="20"
            v-if="!taskData.done"
          >
          </b-icon-check2>
          <b-icon-check2-all variant="success" width="20" height="20" v-else>
          </b-icon-check2-all>
        </a>
        <!-- Edit task name -->
        <a class="mx-1" href="#" @click="expanded = true" v-if="!taskData.done">
          <b-icon-pencil-fill
            variant="primary"
            width="20"
            height="20"
          ></b-icon-pencil-fill>
        </a>
        <!-- Delete task -->
        <a class="mx-1" href="#" @click="deleteTask(taskData.id)">
          <b-icon-trash-fill
            variant="danger"
            width="20"
            height="20"
          ></b-icon-trash-fill>
        </a>
      </b-col>

      <!-- User Options, for smaller size devices -->
      <b-col cols="2" class="d-xs-block d-md-none">
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          dropleft
        >
          <template v-slot:button-content>
            <b-icon-three-dots variant="secondary"></b-icon-three-dots>
          </template>

          <!-- Check done task and undone task -->
          <b-dropdown-item @click="toggleDone">
            <span v-if="!taskData.done">Mark Done</span>
            <span v-else>Mark Undone</span>
          </b-dropdown-item>
          <!-- Edit task name -->
          <b-dropdown-item @click="expanded = true" v-if="!taskData.done">
            Edit
          </b-dropdown-item>
          <!-- Delete task -->
          <b-dropdown-item @click="deleteTask(taskData.id)">
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>

    <!-- If the user wants to edit or there is no task name -->
    <b-row class="justify-content-center" v-else>
      <b-col md="9" lg="10">
        <b-form-input
          v-model="taskname"
          type="text"
          :placeholder="placeholder"
          @keyup.enter="handleUpdate"
        ></b-form-input>
      </b-col>
      <b-col md="3" lg="2">
        <b-button
          class="my-1"
          size="sm"
          variant="outline-secondary"
          @click="handleUpdate"
          block
        >
          Done
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TaskCard",
  data() {
    // If it is 'expanded', user can edit the task
    return {
      expanded: false,
      taskname: "",
      placeholder: "I have to...",
    };
  },
  created() {
    // taskname is v-model of input
    if (this.taskData.name) {
      this.taskname = this.taskData.name;
    }
  },
  // Details about the task are passed from parent
  props: ["taskData"],
  methods: {
    ...mapActions({
      deleteTask: "tasks/deleteTask",
      updateTask: "tasks/updateTask",
    }),
    toggleDone() {
      // Update the done state of task and send http request
      this.updateTask({
        ...this.taskData,
        done: !this.taskData.done,
      });
    },
    handleUpdate() {
      this.expanded = false;

      // Do nothing if no input by user
      if (this.taskname === "") {
        this.placeholder = "Please write a task first...";
        return;
      }
      // Update the name state of task and send http request
      this.updateTask({
        ...this.taskData,
        name: this.taskname,
      });
    },
  },
};
</script>

<style>
</style>