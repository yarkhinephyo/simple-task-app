<template>
  <b-card class="my-2">
    <!-- If it is not expanded and there is a valid task name -->
    <b-row v-if="taskData.name && !expanded">
      <!-- Task Details -->
      <b-col xs="9">
        <span v-if="!taskData.done">
          {{ taskData.name }}
        </span>
        <span v-else>
          <del>{{ taskData.name }}</del>
        </span>
      </b-col>

      <!-- User Options, varies based on whether task is done or not -->
      <b-col xs="3" class="d-none d-md-block">
        <a class="mx-1" href="#" @click="toggleDone">
          <b-icon-check2 variant="success" v-if="!taskData.done">
          </b-icon-check2>
          <b-icon-check2-all variant="success" v-else> </b-icon-check2-all>
        </a>
        <a class="mx-1" href="#" @click="expanded = true" v-if="!taskData.done">
          <b-icon-pencil-fill variant="primary"></b-icon-pencil-fill>
        </a>
        <a class="mx-1" href="#" @click="deleteTask(taskData.id)">
          <b-icon-trash-fill variant="danger"></b-icon-trash-fill>
        </a>
      </b-col>

      <!-- User Options, for smaller size devices -->
      <b-col xs="3" class="d-xs-block d-md-none">
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          dropleft
        >
          <template v-slot:button-content>
            <b-icon-three-dots variant="secondary"></b-icon-three-dots>
          </template>

          <b-dropdown-item @click="toggleDone">
            <span v-if="!taskData.done">Mark Done</span>
            <span v-else>Mark Undone</span>
          </b-dropdown-item>
          <b-dropdown-item @click="expanded = true" v-if="!taskData.done">
            Edit
          </b-dropdown-item>
          <b-dropdown-item @click="deleteTask(taskData.id)">
            Delete
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>

    <!-- If it is expanded or has data -->
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
    return {
      expanded: false,
      taskname: "",
      placeholder: "I have to...",
    };
  },
  created() {
    if (this.taskData.name) {
      this.taskname = this.taskData.name;
    }
  },
  props: ["taskData"],
  methods: {
    ...mapActions({
      deleteTask: "tasks/deleteTask",
      updateTask: "tasks/updateTask",
    }),
    toggleDone() {
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