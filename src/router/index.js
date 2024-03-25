import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index.js';

import Home from "../views/Home.vue";
import Admin from "../views/Admin/Admin.vue";
import User from "../views/Admin/User.vue";
import MasterData from "../views/Admin/MasterData.vue";
import Attach from "../views/Attach.vue";
import ISO from "../views/ISO.vue";
import Login from "../views/Login.vue";
import ISMS from "../views/ISMS.vue";
import Landing from "../views/Landing.vue";

import Remote from "../views/Remote/Remote.vue";
import RemoteForm from "../views/Remote/RemoteForm.vue";
import RemoteDashboard from "../views/Remote/RemoteDashboard.vue";
import RemoteList from "../views/Remote/RemoteList.vue";

import AssetEquipment from "../views/AssetEquipment.vue";
import AssetPeople from "../views/AssetPeople.vue";

import Request from "../views/Request.vue";
import RequestChange from "../views/RequestChange.vue";
import RequestForm from "../views/RequestForm.vue";

import Ensure from "../views/Ensure.vue";
import Consider from "../views/Consider.vue";
import Approve from "../views/Approve.vue";
import Operate from "../views/Operate.vue";
import Follow from "../views/Follow.vue";
import Expire from "../views/Expire.vue";
import Check from "../views/Check.vue";

import PolicyFirewall from "../views/PolicyFirewall.vue";

import EmptyPage from "../views/EmptyPage.vue";
import SearchUser from "../views/Admin/SearchUser.vue";

import Test from "../views/Test.vue";
Vue.use(VueRouter);

const routes = [
  {
  path: "/",    
    component: ISMS,
    name: "ISMS",
    beforeEnter (to, from, next) {
      store.dispatch('checkLogin')
      if (store.state.user) {          
          next()          
      } else {
          next('/login')
      }
    },
    children: [
      {
        path: "",
        name: "Landing",
        component: Landing,
      },
    ]
  },
  {
    path: "/remote",    
    component: Remote,
    beforeEnter (to, from, next) {
      store.dispatch('checkLogin')
      if (store.state.user) {          
          next()          
      } else {
          next('/login')
      }
    },
    children: [
      {
        path: "",
        name: "remote-dashboard",
        component: RemoteDashboard,
      },
      {
        path: "remote_list",        
        component: Request,
        children:[
          {
            path: "",
            name: "remote_list",
            component: RemoteList,
          },
          {
            path: "remote_form",
            name: "remote_form",
            component: RemoteForm,
          },
          {
            path: "remote_form/:id",
            name: "edit_remote_form",
            component: RemoteForm,
          },          
        ]
      },
      {
        path: "ensure",        
        component: Ensure,
      },
      {
        path: "consider",        
        component: Consider,
      },
      {
        path: "approve",        
        component: Approve,
      },
      {
        path: "operate",        
        component: Operate,
      },
      {
        path: "follow",        
        component: Follow,
      },
      {
        path: "remote_expire",        
        component: Expire,
      },
      {
        path: "check",        
        component: Check,
      },
      {
        path: "asset_equipment",
        name: "asset_equipment",
        component: AssetEquipment,
      },
      {
        path: "asset_people",
        name: "asset_people",
        component: AssetPeople,
      },
      {
        path: "policy_firewall",
        name: "policy_firewall",
        component: PolicyFirewall,
      },
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    beforeEnter (to, from, next) {
      //string.includes(substring)
      if(store.state.user.roles.includes("admin")){           
        next()          
      } else {
        next({ name: 'ISO' })
      }
    },
    children: [
      {
        path: "", 
        name : "user",
        component: User,
      },
      
      {
        path: "master_data",
        name: "master_data",
        component: MasterData,
      },
      {
        path: "attach",
        name: "attach",
        component: Attach,
      },
      {
        path: "search_user",
        name: "search_user",
        component: SearchUser,
      },
    ]
  },
  {
    path: "/change",    
    component: Home,
    beforeEnter (to, from, next) {
      store.dispatch('checkLogin')
      if (store.state.user) {          
          next()          
      } else {
          next('/login')
      }
    },
    children: [
      
      {
        path: "",
        name: "ISO",
        component: ISO,
      },
      
      
      
      {
        path: "test",
        name: "test",
        component: Test,
      },
      {
        path: "ensure",        
        component: Ensure,
      },
      {
        path: "consider",        
        component: Consider,
      },
      {
        path: "approve",        
        component: Approve,
      },
      {
        path: "operate",        
        component: Operate,
      },
      {
        path: "follow",        
        component: Follow,
      },
      {
        path: "request_expire",        
        component: Expire,
      },
      {
        path: "check",        
        component: Check,
      },
      {
        path: "request_change",        
        component: Request,
        children:[
          {
            path: "",
            name: "request_change",
            component: RequestChange,
          },
          {
            path: "form",
            name: "request_form",
            component: RequestForm,
          },
          {
            path: "form/:id",
            name: "edit_request_form",
            component: RequestForm,
          },
          
        ]
      },
         
    ]
  },
  {
    path: "/login",    
    component: Login,
    beforeEnter (to, from, next) {
      store.dispatch('checkLogin')
      if (store.state.user) {          
        next({ name: 'ISO' })
      } else {
          next()
      }
    },
    
  },
  {
    path: "*",
    // beforeEnter(to,from,next){
    //   next(vm => {
    //     vm.prevRoute = from
    //   })
    // }
    name: "empty_page",
    component: EmptyPage,
  }   
];

const router = new VueRouter({
  mode: "history",
  base: "/", //process.env.BASE_URL,
  routes
});

export default router;
