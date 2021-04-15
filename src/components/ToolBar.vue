<template>
<v-app-bar
      absolute     
      app
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
          <v-avatar>
            <v-img class="ma-3" height="45" contain src="@/assets/logo.png"></v-img>
          </v-avatar>
      </v-toolbar-title>
      <v-toolbar-title>
        <strong>Request for Change System</strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
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
        <v-list-item link>
          <v-list-item-title>เมนู 1</v-list-item-title>          
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>เมนู 2</v-list-item-title>          
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>เมนู 3</v-list-item-title>          
        </v-list-item>
        <v-list-item link>
          <v-list-item-title>ออกจากระบบ</v-list-item-title>          
        </v-list-item>
      </v-list>
    </v-menu>
      
      
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

</template>

<script>
export default {

}
</script>

<style>

</style>