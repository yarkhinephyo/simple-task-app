<template>
  <div>{{ tasks }}</div>
</template>

<script>
import axios from "axios";
import { jsonServer } from '../config.js';

export default {
  name: "TaskPage",
  data(){
    return {
      tasks: []
    }
  },
  async created() {
    const res = await axios.get(`${jsonServer}/tasks`)
    this.tasks = [...res.data]
  },
};
</script>

<style>
</style>
