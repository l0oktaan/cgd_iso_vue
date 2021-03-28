import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://192.168.1.60:8080/engine-rest/';

import UploadButton from 'vuetify-upload-button';
Vue.use(UploadButton);


new Vue({
  created() {
      window.addEventListener('beforeunload', this.beforePageDestroyed)
  },
  methods: {
    beforePageDestroyed: function () {
        this.$store.dispatch('resetState');
    }
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
