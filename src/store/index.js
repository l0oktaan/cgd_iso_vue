import Vue from "vue";
import axios from 'axios';
import Vuex from "vuex";
import router from 'vue-router'
Vue.use(Vuex);
import VuexPersistence from 'vuex-persist'
const getDefaultState = () => {
  return {
    request_list : null,
    remote_list : null,
    equip_list : null,
    people_list : null,
    group_id : null,
    group_cgd: null,
    user: null,
    userToken: null,
    request_all: null,
    
    request_ensure: null,
    request_consider: null,
    request_approve: null,
    request_operate: null,
    request_follow: null,
    request_expire: null,
    request_check: null,  
    remote_all: null,
    remote_ensure: null,
    remote_consider: null,
    remote_approve: null,
    remote_operate: null,
    remote_follow: null,
    remote_expire: null,
    remote_check: null,  
    roles: ['admin','request','ensure','consider','approve','operate','follow','check','search']
  }
}
export default new Vuex.Store({
  state: getDefaultState(),
  plugins: [new VuexPersistence().plugin],

  getters: {
    request_list (state){
      return state.request_list
    },
    remote_list (state){
      return state.remote_list
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
      return ['admin','request','ensure','consider','approve','operate','follow','check','search'] //state.roles
    },
    group_id (state){
      return state.user.group_id
    },
    group_cgd (state){
      return state.group_cgd
    },
    request_all ( state){
      return state.request_all
    },
    request_ensure(state){
      return state.request_ensure
    },
    request_consider(state){
      return state.request_consider
    },
    request_approve(state){
      return state.request_approve
    },
    request_follow(state){
      return state.request_follow
    },
    request_expire(state){
      return state.request_expire
    },
    request_check(state){
      return state.request_check
    },
    request_operate(state){
      return state.request_operate
    },
    remote_all ( state){
      return state.remote_all
    },
    remote_ensure(state){
      return state.remote_ensure
    },
    remote_consider(state){
      return state.remote_consider
    },
    remote_approve(state){
      return state.remote_approve
    },
    remote_follow(state){
      return state.remote_follow
    },
    remote_expire(state){
      return state.remote_expire
    },
    remote_check(state){
      return state.remote_check
    },
    remote_operate(state){
      return state.remote_operate
    },
  },
  mutations: {
    request_list (state, data){
      state.request_list = data
    },
    remote_list (state, data){
      state.remote_list = data
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
      state.group_id = userData.group_id
      //state.userToken = userData.token
    },
    clearAuthData (state){
      state.user = null
      state.userToken = null   
      state.request_all = null
      state.request_ensure = null
      state.request_consider = null
      state.request_approve = null
      state.request_operate = null
      state.request_follow = null
      state.request_expire = null
      state.request_check = null  
      state.remote_all = null
      state.remote_ensure = null
      state.remote_consider = null
      state.remote_approve = null
      state.remote_operate = null
      state.remote_follow = null
      state.remote_expire = null
      state.remote_check = null  
      state.group_cgd = null
      state.request_list = null
      state.group_id = null
      // state.roles = null
      localStorage.removeItem('token')
      localStorage.removeItem('expirationDate')
    },
    request_all(state, data){
      state.request_all = data
    },
    request_ensure(state, data){
      state.request_ensure = data
    },
    request_consider(state, data){
      state.request_consider = data
    },
    request_approve(state, data){
      state.request_approve = data
    },
    request_follow(state, data){
      state.request_follow = data
    },
    request_expire(state, data){
      state.request_expire = data
    },
    request_check(state, data){
      state.request_check = data
    },
    request_operate(state, data){
      state.request_operate = data
    },
    remote_all(state, data){
      state.remote_all = data
    },
    remote_ensure(state, data){
      state.remote_ensure = data
    },
    remote_consider(state, data){
      state.remote_consider = data
    },
    remote_approve(state, data){
      state.remote_approve = data
    },
    remote_follow(state, data){
      state.remote_follow = data
    },
    remote_expire(state, data){
      state.remote_expire = data
    },
    remote_check(state, data){
      state.remote_check = data
    },
    remote_operate(state, data){
      state.remote_operate = data
    },
    
  },
  actions: {
    
    async get_request_list({commit}){
      let path = '/api/request_forms'
      let response = await axios.get(path)

      commit('request_list',response.data.data)
    },
    async get_remote_list({commit}){
      let path = '/api/remote_forms'
      let response = await axios.get(path)

      commit('remote_list',response.data.data)
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
      let path = await `/api/groups`
      let response = await axios.get(`${path}`,{
        "type" : 1
      })
      commit('group_cgd',response.data.data)

    },
    async login ({ commit, dispatch}, authData){
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
      await dispatch('get_group_cgd')
      
      let roles = JSON.parse(userData.roles)
      
      for (let i=0;i<roles.length;i++){
        
        switch (roles[i]) {
          case 'ensure':
            dispatch('get_request_ensure')
            break;
          case 'consider':
            dispatch('get_request_consider')
            break;
          case 'approve':
            dispatch('get_request_approve')
            break;
          case 'operate':
            dispatch('get_request_operate')
            break;
          case 'follow':
            dispatch('get_request_follow')
            break;
          case 'check':
            dispatch('get_request_check')
            break;
        
          default:
            break;
        }
      }
        
      
  },
  checkLogin({ commit,state }){
      let expirationDate = new Date(localStorage.getItem('expirationDate'))
      let now = new Date()

      if (now >= expirationDate){
          //console.log('expire')
          commit('clearAuthData')
          return
      }else{
        //console.log('expire')
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
  

  async logout({ commit }){
    let path = await '/api/logout'      
    await axios.post(path)
    await commit('clearAuthData')    
  },

  async fetchRequest({dispatch}){
    if (this.state.user.roles.includes('ensure')){
      await dispatch('get_request_ensure')
    }
    if (this.state.user.roles.includes('consider')){
      await dispatch('get_request_consider')
    }
    if (this.state.user.roles.includes('approve')){
      await dispatch('get_request_approve')
    }
    if (this.state.user.roles.includes('operate')){
      await dispatch('get_request_operate')
    }
    if (this.state.user.roles.includes('follow')){
      await dispatch('get_request_follow')
    }
    if (this.state.user.roles.includes('check')){
      await dispatch('get_request_check')
    } 
    
    await dispatch('get_request_expire')
       
    
  },
  async fetchRemote({dispatch}){
    //console.log('fetch remote');
    if (this.state.user.roles.includes('ensure')){
      await dispatch('get_remote_ensure')
    }
    if (this.state.user.roles.includes('consider')){
      await dispatch('get_remote_consider')
    }
    if (this.state.user.roles.includes('approve')){
      await dispatch('get_remote_approve')
    }
    if (this.state.user.roles.includes('operate')){
      await dispatch('get_remote_operate')
    }
    if (this.state.user.roles.includes('follow')){
      await dispatch('get_remote_follow')
    }
    if (this.state.user.roles.includes('check')){
      await dispatch('get_remote_check')
    } 
    
    await dispatch('get_remote_expire')
       
    
  },
  async get_request_all({commit}){
    let path = await '/api/request_forms'
    let response = await axios.get(path)
    await commit('request_all',response.data.data)
  },
  async get_request_ensure({commit}){
    let path = await '/api/request_form_ensure'
    
    let response = await axios.get(path)
    //console.log('ensure :' + response.data.data.length)
    await commit('request_ensure',response.data.data)
  },
  async get_request_consider({commit}){
    let path = await `/api/request_form_consider`
    let response = await axios.get(`${path}`)
    await commit('request_consider',response.data.data)
  },
  async get_request_approve({commit}){
    let path = await `/api/request_form_approve`
    let response = await axios.get(`${path}`)
    await commit('request_approve',response.data.data)
  },
  async get_request_operate({commit}){
    let path = await `/api/request_form_operate`
    let response = await axios.get(`${path}`)
    await commit('request_operate',response.data.data)
  },
  async get_request_follow({commit}){     

    let path = await `/api/request_form_follow`
    let response = await axios.get(`${path}`)
    //console.log('follow length :' + response.data.data)
    await commit('request_follow',response.data.data)
  },
  async get_request_expire({commit}){     

    let path = await `/api/request_form_expire`
    let response = await axios.get(`${path}`)
    // console.log('expire length :' + response.data.data)
    await commit('request_expire',response.data.data)
  },
  async get_request_check({commit}){
    let path = await `/api/request_form_check`
    let response = await axios.get(`${path}`)
    await commit('request_check',response.data.data)
  },
  async get_remote_all({commit}){
    let path = await '/api/remote_forms'
    let response = await axios.get(path)
    await commit('remote_all',response.data.data)
  },
  async get_remote_ensure({commit}){
    let path = await '/api/remote_form_ensure'
    
    let response = await axios.get(path)
    
    await commit('remote_ensure',response.data.data)
  },
  async get_remote_consider({commit}){
    let path = await `/api/remote_form_consider`
    let response = await axios.get(`${path}`)
    // console.log('consider length :' + response.data.data)
    await commit('remote_consider',response.data.data)
  },
  async get_remote_approve({commit}){
    let path = await `/api/remote_form_approve`
    let response = await axios.get(`${path}`)
    await commit('remote_approve',response.data.data)
  },
  async get_remote_operate({commit}){
    let path = await `/api/remote_form_operate`
    let response = await axios.get(`${path}`)
    await commit('remote_operate',response.data.data)
  },
  async get_remote_follow({commit}){     

    let path = await `/api/remote_form_follow`
    let response = await axios.get(`${path}`)
    
    await commit('remote_follow',response.data.data)
  },
  async get_remote_expire({commit}){     

    let path = await `/api/remote_form_expire`
    let response = await axios.get(`${path}`)
    // console.log('remote expire length :' + response.data.data)
    await commit('remote_expire',response.data.data)
  },
  async get_remote_check({commit}){
    let path = await `/api/remote_form_check`
    let response = await axios.get(`${path}`)
    await commit('remote_check',response.data.data)
  },
  
},
  modules: {}
});
