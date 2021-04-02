import Vue from "vue";
import axios from 'axios';
import Vuex from "vuex";

Vue.use(Vuex);
import VuexPersistence from 'vuex-persist'
const getDefaultState = () => {
  return {
    request_list : null
  }
}
export default new Vuex.Store({
  state: getDefaultState(),
  plugins: [new VuexPersistence().plugin],

  getters: {
    request_list (state){
      return state.request_list
    }
  },
  mutations: {
    request_list (state, data){
      state.request_list = data
    }
  },
  actions: {
    async get_request_list({commit}){
      let path = '/api/request_forms'
      let response = await axios.get(path)

      commit('request_list',response.data.data)
    }
  },
  modules: {}
});
