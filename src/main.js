import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)


// axios.defaults.baseURL = 'http://192.168.1.60:8080/engine-rest/';
axios.defaults.baseURL = ''; //'http://10.100.90.23';
//axios.defaults.baseURL = 'http://localhost:8000'; 
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');    
    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

import camunda from './camunda'
Vue.use(camunda)

import UploadButton from 'vuetify-upload-button';
Vue.use(UploadButton);

import MyAlert from "./components/MyAlert.vue"
Vue.component('my-alert',MyAlert);



// Vue.config.devtools = false;
new Vue({
  created() {
      window.addEventListener('beforeunload', this.beforePageDestroyed)
  },
  methods: {
    beforePageDestroyed: function () {
        this.$store.dispatch('resetState');
    },
    getThaiDate(item){
      if (item){
          var d = new Date(item);
      return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
      }else{
          return "";
      }            
    },
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
