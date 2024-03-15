<template>
<v-app-bar
      absolute     
      app
      
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
          <v-avatar>
            <v-img class="ma-3 logo" height="45" contain src="@/assets/logo.png" @click="$router.replace('/')"></v-img>
          </v-avatar>
      </v-toolbar-title>
      <v-toolbar-title>
        <strong class="logo">ISMS Portal</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$store.dispatch('fetchRequest')">
        <v-icon>mdi-refresh-circle</v-icon>
      </v-btn>

      {{user.firstname + ' : ' + check_group(user.group_id)}}
      <v-menu
      
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar v-bind="attrs"
          v-on="on">
            
              <v-icon large>mdi-account-circle</v-icon>
            
        </v-avatar>
      </template>

      <v-list>
        <!-- <v-list-item link>
          <v-list-item-title>เมนู 1</v-list-item-title>          
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>เมนู 2</v-list-item-title>          
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>เมนู 3</v-list-item-title>          
        </v-list-item> -->
        <v-list-item link  @click="logout">
          <v-list-item-title>ออกจากระบบ</v-list-item-title>          
        </v-list-item>
      </v-list>
    </v-menu>
      
      
      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

</template>

<script>
export default {
  data(){
    return {
      user: this.$store.getters.user
    }
  },
  methods: {
    check_group(id){
          let group = this.$store.getters.group_cgd;
          let g = group.filter(x=>x.id == id)
          if (g.length>0){
              
              return g[0].group_name
          }
      },
    async logout(){
      await this.$store.dispatch('logout')
      await this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.logo{
  cursor: pointer;
}
</style>