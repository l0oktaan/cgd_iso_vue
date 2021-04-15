<template>
  <v-navigation-drawer
    dark
    app
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
  >
    <v-list-item px-2 class="main-menu">
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-title>เมนูหลัก</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>
    
    <!-- <v-list shaped dense>
      <v-list-item
        router
        link
        to="/"
      >
        <v-list-item-icon>
          <v-icon>mdi-monitor-dashboard</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-group
          :value="false"
          prepend-icon="mdi-sack"
        >
          <template v-slot:activator>
            <v-list-item-content>
             <v-list-item-title>รายการทรัพย์สินย์</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            router
            link
            to="/asset_hardware"
            active-class="border"
          >
            <v-list-item-icon>
              <v-icon>mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-title>รายการอุปกรณ์</v-list-item-title>            
          </v-list-item>
          <v-list-item
            router
            link
            to="/asset_people"
            active-class="border"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>รายการผู้ดูแลระบบ</v-list-item-title>            
          </v-list-item>
      </v-list-group>
    </v-list> -->
    <v-list shaped dense>
      <v-list-item
        v-for="item in navs.group_1"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense>
      <v-list-item
        v-for="item in navs.group_2"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense v-if="false">
      <v-list-item
        
        v-for="item in navs.group_3"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list shaped dense>
      <v-list-item
        v-for="item in navs.group_4"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
            
            <v-chip class="text-right" color="error" x-small v-if="item.route=='/considers'" >1</v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      navs: 
        {
          group_1: [
            { title: "Dashboard", icon: "mdi-monitor-dashboard", route: "/" },   
            { title: "ผู้ดูแลระบบ", icon: "mdi-account-tie", route: "/admin" },   
          ],
        
          group_2: [
            { title: "Master Data", icon: "mdi-vector-link", route: "/master_data" },     
            { title: "รายการอุปกรณ์", icon: "mdi-server", route: "/asset_equipment" },
            { title: "รายการบุคลากร", icon: "mdi-account-multiple", route: "/asset_people" },
            { title: "รายการ Policy Firewall", icon: "mdi-wall", route: "/policy_firewall" },
          ],
        
          group_3: [
            { title: "การร้องขอการเปลี่ยนแปลง", icon: "mdi-stack-exchange", route: "/request_change" },
          ],
          group_4: [
            { title: "การร้องขอการเปลี่ยนแปลง", icon: "mdi-stack-exchange", route: "/request_change" },
            // { title: "การรับรองการร้องขอ", icon: "mdi-check-decagram", route: "/ensures" },
            { title: "การพิจารณาการร้องขอ", icon: "mdi-shield-check", route: "/considers" },
            { title: "การตรวจสอบผล", icon: "mdi-shield-check", route: "/checks" },
            // { title: "การอนุมัติการ้องขอ", icon: "mdi-check-bold", route: "/approves" },
            // { title: "การดำเนินการเปลี่ยนแปลง", icon: "mdi-cog", route: "/operators" },
            // { title: "การติดตามผล", icon: "mdi-cog", route: "/follows" },
          ]
        }
      ,
      items: [
        { title: "Dashboard", icon: "mdi-monitor-dashboard", route: "/" },   
        { title: "Master Data", icon: "mdi-vector-link", route: "/master_data" },     
        { title: "รายการอุปกรณ์", icon: "mdi-server", route: "/asset_equipment" },
        { title: "รายการบุคลากร", icon: "mdi-account-multiple", route: "/asset_people" },
        { title: "รายการ Policy Firewall", icon: "mdi-wall", route: "/policy_firewall" },
        { title: "Request for Change", icon: "mdi-stack-exchange", route: "/request_change" },
        { title: "Test", icon: "mdi-stack-exchange", route: "/test" },
      ],
      
        // { title: "ข้อมูลหน่วยงาน", icon: "mdi-home-city", route: "/division" },
        // {
        //   title: "ข้อมูลตำแหน่ง",
        //   icon: "mdi-chevron-triple-up",
        //   route: "/position"
        // },
        // {
        //   title: "ข้อมูลข้าราชการ",
        //   icon: "mdi-account-group",
        //   route: "/employee"
        // },
        // { title: "ปรับปรุงข้อมูล", icon: "fas fa-sync", route: "/change" }
      
      mini: false
    }
  }
};
</script>

<style scoped>
.v-list-item__title {
  line-height: 1.5 !important;
  padding-bottom: 6px;
  font-weight: normal !important;
}
.main-menu {
  min-height: 64px !important;
}
.v-list-item--active{
  background-color: rgb(255, 255, 255)!important;
  color: #1976d2!important;
}
.v-list-group__items>.v-list-item{
  padding-left: 10px!important;
  
}
.v-list-item__icon:first-child{
  margin-right: 15px!important;
}
</style>
