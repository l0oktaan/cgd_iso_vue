<template>
    <v-app>     
  
      <tool-bar v-if="$store.getters.user"></tool-bar>
  
      <!-- Sizes your content based upon application components -->
      <v-main app>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <!-- <v-scroll-x-transition mode="in" hide-on-leave="true"> -->
          <v-fade-transition mode="out-in">
            <router-view />
          </v-fade-transition>
          <!-- </v-scroll-x-transition> -->
        </v-container>
      </v-main>
  
      <my-footer></my-footer>
    </v-app>
  </template>
  
  <script>
  
  import ToolBar from "@/components/ToolBar.vue";
  import MyFooter from "@/components/Footer.vue";
  export default {
    
  
    components: {
      ToolBar,
      MyFooter
    },
  
    data: () => ({
      //
    })
  };
  </script>
  <style scoped>
   *{
      margin: 0 !important; 
      padding: 0 !important;
      box-sizing: border-box;
      
    }
  </style>