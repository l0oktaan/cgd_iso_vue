<template>
  
        <v-card
          class="d-flex justify-center align-center mb-6"
          color="grey lighten-2"
          flat
          height="100%"
          width="100%"
          tile
          
        >
          <my-login></my-login>   
        </v-card>
      
      
</template>

<script>

import MyLogin from "../components/Login.vue";

export default {
  components: {
      MyLogin
  },
  data() {
    return {
      
    };
  },
  
  
};
</script>
