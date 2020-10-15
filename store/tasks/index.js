import { serverIP } from '../../config.js';
import axios from 'axios'

const state = {
  // Tasks to be displayed
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
    state.tasks = [...tasks].sort((a, b) => a.id - b.id)
  },
  DELETETASKS(state, taskID){
    state.tasks = [...state.tasks.filter(task => task.id !== taskID)]
  },
  UPDATETASK(state, updatedTask){
    state.tasks = [...state.tasks.filter(task => task.id !== updatedTask.id), updatedTask].sort((a, b) => a.id - b.id)
  }
}

const actions = {
  // Retrieve tasks from DB
  async retrieveLatestTasks({ commit }){
    try{
      const res = await axios.get(`${serverIP}/tasks`)
      console.log(res.data);
      commit('SETTASKS', res.data.tasks)
    } catch (e) {
      console.log(e);
    }
  },

  async deleteTask({ commit }, taskID){
    try{
      axios.delete(`${serverIP}/tasks/${taskID}`)
      commit('DELETETASKS', taskID)
    } catch (e) {
      console.log(e);
    }
  },

  async updateTask({ commit }, taskToUpdate){
    try{
      commit('UPDATETASK', taskToUpdate) // Change state first

      const res = await axios.get(`${serverIP}/tasks`) // Check if exists in DB
      const tasks = res.data.tasks
      
      // If exists in DB, update the value. If not, add the task
      if(tasks.filter(task => task.id === taskToUpdate.id).length > 0){
        await axios.put(`${serverIP}/tasks/${taskToUpdate.id}`, taskToUpdate)
      } else {
        await axios.post(`${serverIP}/tasks`, taskToUpdate)
      }
    } catch (e) {
      console.log(e);
    }
  },

  // Add empty task to state but not DB
  async addEmptyTask({ commit, state }, task){
    try{
      // Limit empty task that can be added to 1
      if (state.tasks.length == 0 || state.tasks[state.tasks.length - 1].name){
        commit('ADDTASKS', task)
        return true
      }
      return false
    } catch (e) {
      console.log(e);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}