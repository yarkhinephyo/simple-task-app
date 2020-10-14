import { jsonServer } from '../../config.js';
import axios from 'axios'

const state = {
  tasks: []
}

const getters = {
  getTasks: (state) => {
    return state.tasks
  },
}

const mutations = {
  ADDTASKS(state, newTask){
    state.tasks = [...state.tasks, newTask]
  },
  SETTASKS(state, tasks){
    state.tasks = [...tasks]
  }
}

const actions = {
  async retrieveLatestTasks({ commit }){
    const res = await axios.get(`${jsonServer}/tasks`)
    commit('SETTASKS', res.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}