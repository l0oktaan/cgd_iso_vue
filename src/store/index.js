import Vue from "vue";
import axios from 'axios';
import Vuex from "vuex";
import router from 'vue-router'
Vue.use(Vuex);
import VuexPersistence from 'vuex-persist'
const getDefaultState = () => {
  return {
    request_list : null,
    equip_list : null,
    people_list : null,
    group_id : 1,
    group_cgd: null,
    user: null,
    userToken: null,
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
      return state.user
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
    },
    authUser (state, userData){
      //console.log(userData.user);
      state.user = userData
      state.userToken = userData.token
    },
    clearAuthData (state){
      state.user = null
      state.userToken = null      
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
  },
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

    },
    async login ({ commit, state}, authData){
      let path = '/api/login'
      
      let response =  await axios.post(path,{
              username: authData.username,
              password: authData.password
          })
          
      const now = await new Date()
      const expirationDate = await new Date(now.getTime() + 1*60*60*1000)

      const userData = await response.data.user      
      await commit('authUser',userData)
      await localStorage.setItem('token', userData.token)
      await localStorage.setItem('expirationDate', expirationDate)           
      
              
              
        
          
      
  },
  checkLogin({ commit,state }){
      let expirationDate = new Date(localStorage.getItem('expirationDate'))
      let now = new Date()

      if (now >= expirationDate){
          console.log('expire')
          commit('clearAuthData')
          return
      }
      expirationDate = new Date(now.getTime() + 1*60*60*1000)
      localStorage.setItem('expirationDate', expirationDate)
      // const userData = state.user
      // if (userData){
      //     if (userData.status == 1){
      //         router.replace('/passchange')
      //     }else if (userData.type == 'admin'){
      //         router.replace('/admin')
      //     }else if (userData.type == 'user'){
      //         router.replace('/refund')
      //     }
      // }else{
      //     return
      // }
  },
  logout({ commit }){
    commit('clearAuthData')    
  },
},
  modules: {}
});
