import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ISO from "../views/ISO.vue";
import Login from "../views/Login.vue";

import AssetHardware from "../views/AssetHardware.vue";
import AssetPeople from "../views/AssetPeople.vue";

import Request from "../views/Request.vue";
import RequestChange from "../views/RequestChange.vue";
import RequestForm from "../views/RequestForm.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",    
    component: Home,
    children: [
      {
        path: "",
        name: "ISO",
        component: ISO,
      },
      {
        path: "/asset_hardware",
        name: "asset_hardware",
        component: AssetHardware,
      },
      {
        path: "/asset_people",
        name: "asset_people",
        component: AssetPeople,
      },

      {
        path: "/request_change",        
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
          }
          
        ]
      }      
    ]
  },
  {
    path: "/login",    
    component: Login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/", //process.env.BASE_URL,
  routes
});

export default router;
