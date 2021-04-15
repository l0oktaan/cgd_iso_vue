import Vue from "vue";
import axios from 'axios';
import Vuex from "vuex";

Vue.use(Vuex);
import VuexPersistence from 'vuex-persist'
const getDefaultState = () => {
  return {
    request_list : null,
    equip_list : null,
    people_list : null,
    group_id : 1,
    user: {
      user_id : 1,
      username : 'songwut.saj',
      group_id : 1
    }
  }
}
export default new Vuex.Store({
  state: getDefaultState(),
  plugins: [new VuexPersistence().plugin],

  getters: {
    request_list (state){
      return state.request_list
    },
    equip_list (state){
      return state.equip_list
    },
    people_list (state){
      return state.people_list
    },
    user (state){
      return state.user
    }
  },
  mutations: {
    request_list (state, data){
      state.request_list = data
    },
    equip_list (state,data){
      state.equip_list = data
    },
    people_list (state,data){
      state.people_list = data
    }
  },
  actions: {
    async get_request_list({commit}){
      let path = '/api/request_forms'
      let response = await axios.get(path)

      commit('request_list',response.data.data)
    },
    async get_equip_list( {state,commit}){
      let path = await `/api/groups/${state.group_id}/asset_equipments`
      let response = await axios.get(`${path}`)
      let list = response.data.data
      commit('equip_list',list)
    },
    async get_people_list( {state,commit}){
      let path = await `/api/groups/${state.group_id}/asset_peoples`
      let response = await axios.get(`${path}`)
      let list = response.data.data
      commit('people_list',list)
    }
  },
  modules: {}
});
