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
    group_cgd: null,
    user1: {
      user_id : 1,
      username : 'songwut.saj',
      group_id : 1,
      group_code : 'SECD',
      roles: ['admin','request','ensure','consider','approve','operate','follow','check']
    },
    user2: {
      user_id : 2,
      username : 'songwut.saj',
      group_id : 2,
      group_code : 'NETD',
      roles: ['request','operate','follow']
    },
    user_ensure: {
      user_id : 3,
      username : 'siriluk.sir',
      group_id : 1,
      group_code : 'SECD',
      roles: ['request','ensure','consider','follow','check']
    },
    roles: ['admin','request','ensure','consider','approve','operate','follow','check']
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
      return Vue.$set(state.user_ensure)
    },
    roles (state){
      return state.roles
    },
    group_cgd (state){
      return state.group_cgd
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
    },
    group_cgd (state, data){
      state.group_cgd = data
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
    },
    async get_group_cgd ( {commit}){
      let path = await `/api/groups?type=1`
      let response = await axios.get(`${path}`,{
        "type" : "0"
      })
      commit('group_cgd',response.data.data)

    }
  },
  modules: {}
});
