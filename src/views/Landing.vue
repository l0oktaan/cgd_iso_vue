<template>
  <div class="myflex">
    <div v-for="(item,index) in systems" :key="index" @click="onClick(item.route)" :class="'mycard ' + item.color" >
      <v-icon
          x-large 
          class=""         
        >
          {{item.icon}}
      </v-icon>
        <p>{{item.name}}</p>
    </div>
    
  </div>
  
  </template>
  
  <script>
  
 
  export default {    
  
    
  
    data: () => ({
      systems: [
        {
          id: 1,
          name : 'Request for Change',
          icon : 'mdi-directions-fork',
          route : 'change',
          color : ''
        },
        {
          id : 2,
          name : 'Policy Firewall / VPN',
          icon : 'fas fa-network-wired',
          route : 'remote',
          color : 'indigo'
        }
      ]
    }),
    methods:{
      onClick(route){
        this.$router.push(route)
      }
    }
  };
  </script>
  <style scoped>
    .myflex{
      display: flex;
      flex-direction: row;
      justify-content: center;

    }
    
    .mycard{

      display: flex;
      flex-direction: column;
      justify-content :space-between;
      align-items: center;
    }

    .mycard{
      border: 1px solid #777;
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
      cursor: pointer;
    }
    .mycard p{
      margin-top: 15px;
      margin-bottom: 5px;
      
    }
    .mycard:hover{
      box-shadow: 0 0 5px #ffee10;
    }
    .indigo{
      color: #fff;
    }
  </style>
  