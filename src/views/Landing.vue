<template>
  <div class="myflex">
    <div v-for="(item,index) in systems.filter(x=>x.status == 1)" :key="index" @click="onClick(item.route)" :class="'mycard ' + item.color " :data-text="item.name">
      
      <v-icon          
          class=""         
        >
          {{item.icon}}
      </v-icon>
       
    </div>
    <div @click="onClick(adminMenu.route)" :class="'mycard ' + adminMenu.color" :data-text="adminMenu.name" v-if="user.roles.includes('admin')" >
      
      <v-icon          
          class=""         
        >
          {{adminMenu.icon}}
      </v-icon>
       
    </div>
    
  </div>
  
  </template>
  
  <script>
  
 
  export default {    
  
    
  
    
  data() {
    return {
      user: this.$store.getters.user,
      systems: [
        {
          id: 1,
          name : 'Request for Change',
          icon : 'mdi-directions-fork',
          route : 'change/dashboard',
          role : ['it'],
          status : 1,
          color : ''
        },
        {
          id : 2,
          name : 'Policy Firewall / VPN',
          icon : 'fas fa-network-wired',
          route : 'remote/dashboard',
          role : ['it'],
          status : 1,
          color : ''
        },
        {
          id : 3,
          name : 'Document',
          icon : 'mdi-book-open-page-variant',
          route : 'document/home',
          role : ['isms'],
          status : 0,
          color : ''
        }       
        
      ],
      adminMenu:{
          id : 4,
          name : 'Admin',
          icon : 'fas fa-user-cog',
          route : 'admin/user',
          role : ['admin'],
          status : 1,
          color : ''
        },
    }
  },
    methods:{
      onClick(route){
        this.$router.push(route)
      },
      
    }
  };
  </script>
  <style scoped>
    *{
      margin: 0; 
      padding: 0;
      box-sizing: border-box;
      
    }
    .myflex{
      display: flex;
      flex-direction: row;
      justify-content: center;
      background: #0f222f;
      min-height: 100vh;     


    }
    
    .mycard{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content :center;
      align-items: center;
    }

    .mycard{
      width: 200px;
      height: 240px;
      background: linear-gradient(#fff2, transparent);
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 25px 25px rgba(0,0,0,0.25);
      border-radius: 10px;
      padding: 10px;
      margin: 100px 10px 0 10px;
      cursor: pointer;
      color: #ffffff;
    }

    .mycard:hover{
      background: linear-gradient(-45deg,#ececec, transparent);
      border: 0;
      
    }
    .mycard:hover > i{
      color:#0f222f;
    }
    .mycard::before{
      content: attr(data-text);
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgba(255,255,255,0.05);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mycard:hover::before{
      border-top: 1px solid #0f222f;
      color:#0f222f;
    }
    .mycard i{
      font-size: 4em;
      color: #ffffff;
    }
    
    .mycard p{
      margin-top: 15px;
      margin-bottom: 5px;
      
    }
    
    
    .indigo{
      color: #fff;
    }
  </style>
  