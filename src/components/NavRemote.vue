<template>
  <v-navigation-drawer
  class="indigo"
    dark
    
    app
    v-model="drawer"
    permanent
    :mini-variant.sync="min"
    width="270"
    
  >
    <v-list-item px-2 class="main-menu" link>
      <v-list-item-icon>
        <v-icon @click="$router.replace('/')">mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-title @click="$router.replace('/')">หน้าหลัก</v-list-item-title>

      <!-- <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn> -->
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
        v-for="item in checkRole(navs.group_1)"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-tooltip right color="primary">
            <template v-slot:activator="{ on, attrs }">                      
            <v-icon              
              v-bind="attrs"
              v-on="on">
              {{ item.icon }}</v-icon>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense>
      <v-list-item
        v-for="item in checkRole(navs.group_11)"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-tooltip right color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                dot
                color="error"
                overlap
                :value="countRequest(item.show)"
              >
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ item.icon }}
                </v-icon>
              </v-badge>
          
          </template>
          <span>{{ item.title }}</span>  
          </v-tooltip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}           
            
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense>
      <v-list-item
        v-for="item in checkRole(navs.group_2)"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-tooltip right color="primary">
            <template v-slot:activator="{ on, attrs }">
          <v-icon 
            v-bind="attrs"
            v-on="on">{{ item.icon }}</v-icon>
          </template>
          <span>{{ item.title }}</span>  
          </v-tooltip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense>
      <v-list-item
        
        v-for="item in navs.group_3"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-tooltip right color="primary">
            <template v-slot:activator="{ on, attrs }">
          <v-icon 
            v-bind="attrs"
            v-on="on"
          >{{ item.icon }}</v-icon>
          </template>
          <span>{{ item.title }}</span>  
          </v-tooltip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{item.title }}
            <v-chip class="text-right" color="error" x-small v-if="countRequest(item.show)>0">{{countRequest(item.show)}}</v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped dense>
      <v-list-item
        v-for="item in checkRole(navs.group_4)"
        :key="item.title"
        router
        :to="item.route"
        active-class="border"
        link
      >
        <v-list-item-icon>
          <v-tooltip right color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                dot
                color="error"
                overlap
                :value="countRequest(item.show)"
              >
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ item.icon }}
                </v-icon>
              </v-badge>
          
          </template>
          <span>{{ item.title }}</span>  
          </v-tooltip>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}            
            <v-chip class="text-right" color="error" x-small v-if="countRequest(item.show)>0">{{countRequest(item.show)}}</v-chip>
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
      user: this.$store.getters.user,
      navs: 
        {
          group_1: [
            { title: "Dashboard", icon: "mdi-monitor-dashboard", route: "/remote" ,show : "all"},   
            { title: "รายการผู้ใช้ระบบ", icon: "mdi-account-tie", route: "/admin", show: "admin" }, 
            { title: "Master Data", icon: "mdi-vector-link", route: "/master_data", show: "admin" },  
            { title: "Attach Files", icon: "mdi-paperclip", route: "/attach", show: "admin" }, 
          ],
          group_11: [            
            { title: "AD Search", icon: "mdi-account-search", route: "/search_user", show: "search" },  
          ],
        
          group_2: [                 
            { title: "รายการอุปกรณ์", icon: "mdi-server", route: "/asset_equipment" , show: "all"},
            { title: "รายการบุคลากร", icon: "mdi-account-multiple", route: "/asset_people" , show: "all"},
            { title: "รายการ Policy Firewall", icon: "mdi-wall", route: "/policy_firewall" , show: "all"},
          ],
        
          group_3: [
            { title: "ขอดำเนินการ Policy Firewall/VPN", icon: "mdi-stack-exchange", route: "/remote_list"},
            { title: "รายการใหล้หมดอายุ", icon: "mdi-alarm", route: "/request_expire", show: "expire"},
          ],
          group_4: [            
            { title: "การรับรอง", icon: "mdi-jira", route: "/ensure", show: "ensure" },
            { title: "การพิจารณา", icon: "mdi-file-find", route: "/consider", show: "consider" },
            
            { title: "การอนุมัติกา", icon: "mdi-check-bold", route: "/approve", show: "approve" },
            { title: "การดำเนินการเ", icon: "mdi-cog", route: "/operate", show: "operate" },
            { title: "การติดตามผล", icon: "mdi-clipboard-clock", route: "/follow", show: "follow" },
            { title: "การตรวจสอบผล", icon: "mdi-shield-check", route: "/check", show: "check" },
            
            // { title: "Test", icon: "mdi-stack-exchange", route: "/test" },
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
  },
  computed: {
    min: {
        get() {
          
          // return this.$vuetify.breakpoint.mdAndDown || !this.mini;  
          if (this.$vuetify.breakpoint.mdAndDown) {
            if (this.mini){
              return false;
            }
            //console.log('get md : ' + this.$vuetify.breakpoint.mdAndDown + ' mini : ' + this.mini);
            return this.$vuetify.breakpoint.mdAndDown || this.mini;
            
          }else{
            //console.log('get md mini : ' + this.mini);
            
            return this.mini;
          }
                    
        },
        set(value) {
           //this.mini = value;
           //console.log('set md : ' + this.$vuetify.breakpoint.mdAndDown + ' mini : ' + this.mini);
        }
    }
  },
  mounted(){
    this.getRequest();
  },
  methods: {
    getMini(){
      return this.mini || this.min;
    },
    countRequest(role){
      let count=0;
      
      switch (role) {
          case 'ensure':
            count = this.$store.getters.request_ensure ? this.$store.getters.request_ensure.length : 0
            break;
          case 'consider':
            count = this.$store.getters.request_consider ? this.$store.getters.request_consider.length : 0
            break;
          case 'approve':
            count = this.$store.getters.request_approve ? this.$store.getters.request_approve.length : 0
            break;
          case 'operate':
            count = this.$store.getters.request_operate ? this.$store.getters.request_operate.length : 0
            break;
          case 'follow':
            count = this.$store.getters.request_follow ? this.$store.getters.request_follow.length : 0
            break;
          case 'check':
            count = this.$store.getters.request_check ? this.$store.getters.request_check.length : 0
            break;
          case 'expire':
            count = this.$store.getters.request_expire ? this.$store.getters.request_expire.length : 0
            break;        
          default:
            break;
        }
        return count;
    },
    getRequest(){
      let roles = JSON.parse(this.user.roles);
      
      for (let i=0;i<=roles;i++){
        
        switch (roles[i]) {
          case 'ensure':
            this.$store.dispatch('get_request_ensure')
            break;
          case 'consider':
            this.$store.dispatch('get_request_consider')
            break;
          case 'approve':
            this.$store.dispatch('get_request_approve')
            break;
          case 'operate':
            this.$store.dispatch('get_request_operate')
            break;
          case 'follow':
            this.$store.dispatch('get_request_follow')
            break;
          case 'check':
            this.$store.dispatch('get_request_check')
            break;
            
            
            
        
          default:
            break;
        }
      }
    },
    checkRole(list){      
      let show = list.filter(x=>x.show === 'all' || JSON.parse(this.user.roles).includes(x.show));          
      return show
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
.v-navigation-drawer{
  
}
</style>
