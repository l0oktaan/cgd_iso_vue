import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ISO from "../views/ISO.vue";
import Login from "../views/Login.vue";

import AssetEquipment from "../views/AssetEquipment.vue";
import AssetPeople from "../views/AssetPeople.vue";

import Request from "../views/Request.vue";
import RequestChange from "../views/RequestChange.vue";
import RequestForm from "../views/RequestForm.vue";
import MasterData from "../views/MasterData.vue";
import PolicyFirewall from "../views/PolicyFirewall.vue";

import Test from "../views/Test.vue";
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
        path: "/asset_equipment",
        name: "asset_equipment",
        component: AssetEquipment,
      },
      {
        path: "/asset_people",
        name: "asset_people",
        component: AssetPeople,
      },
      {
        path: "/master_data",
        name: "master_data",
        component: MasterData,
      },
      {
        path: "/policy_firewall",
        name: "policy_firewall",
        component: PolicyFirewall,
      },
      {
        path: "/test",
        name: "test",
        component: Test,
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
          },
          {
            path: "form/:id",
            name: "edit_request_form",
            component: RequestForm,
          },
          
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
