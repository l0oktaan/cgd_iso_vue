<template>

  <v-container>
   
    <v-row>
      <v-col>
        <v-card
          elevation="4"
        >
          <v-data-table
            :headers="headers"
            :items="request_list"
            :items-per-page="15"
            :loading="loadTable"
            loading-text="กรุณารอสักครู่"
            class="elevation-1"
            :search="search"
            >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>
                    <v-icon large>mdi-stack-exchange</v-icon>
                    {{'รายการเปลี่ยนแปลงข้อมูล' + getStatus(status)}}</v-toolbar-title> 
                    
                  <v-spacer></v-spacer>        
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="ค้นหา"
                        single-line
                        hide-details
                  ></v-text-field>          
                </v-toolbar>

            </template>
            <template v-slot:item.request_no="{ item }">
                
                    {{ item.request_no }}
                
            </template>
            <template v-slot:item.user_id="{ item }">
                
                    {{ item.fullname }}
                
            </template>
            <template v-slot:item.status="{ item }">
                
                    {{ getStatus(item.status) }}
                
            </template>
            <template v-slot:item.created_date="{ item }">
                
                    {{ getThaiDate(item.created_date) }}
                
            </template>
            
            <template v-slot:item.actions="{ item }">
                <v-icon                    
                    class="mr-2"
                    large
                    color="primary"
                    @click="editItem(item.id)"
                >
                    mdi-pencil-circle
                </v-icon>
                <!-- <v-icon  
                    :disabled = "item.status > 1"
                    color="error"        
                    @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon> -->
            </template>
        </v-data-table>
        </v-card>
        
      </v-col>
    </v-row>
    <my-alert :AlertType="show_alert"></my-alert>
  </v-container>

</template>

<script>
import Swal from 'sweetalert2';

import axios from 'axios';


export default {
  props: ['list','status'],
  data(){
    return  {
      
      search: '',
      headers: [
        
        
        { text: 'วันที่ขอดำเนินการ', value: 'created_date', class: ['blue darken-3', 'white--text'],width: '15%'},       
        {
            text: 'เลขที่เอกสาร',
            align: 'start',
            // sortable: false,
            value: 'request_no',
            class: ['blue darken-3', 'white--text', 'head-text'],
            width: '15%'
        },
        { text: 'เรื่อง', sortable: false, value: 'request_title', class: ['blue darken-3', 'white--text'],width: '30%'},       
        { text: 'ผู้ร้องขอ', sortable: false, value: 'user_id', class: ['blue darken-3', 'white--text'],width: '15%'},       
        { text: 'สถานะ', sortable: false, value: 'status', class: ['blue darken-3', 'white--text'],width: '15%'},      
        { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                        
                      
      ],
      request_list: [
        // { request_no : 'SDG1-2564/002', create_date: '2021-03-25',request_title : 'ขอเปิดปิดระบบเพื่อ update firmware F5',user_id: 'songwut.saj', status: 'ระหว่างพิจารณา' },
        // { request_no : 'SDG1-2564/001', create_date: '2021-03-24',request_title : 'ขอเปิด policy firewall ระบบเงินเดือน',user_id: 'songwut.saj', status: 'รอรับรอง' }
      ],
      show_alert: '',
      loadTable: true
    }
  },
  watch: {
      async list(){
          this.request_list = await this.list;
          this.loadTable = await false;
      }
  },
  async mounted(){
    //   this.request_list = await this.list;
    //   this.loadTable = await false;
  },
  methods: {
    async fetchData(){
      await this.$store.dispatch('get_request_list');
      let list = await this.$store.getters.request_list;
      this.request_list = await list.filter(x=>x.status==this.status);
    },
    getThaiDate(item){
      if (item){
          var d = new Date(item);
      return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
      }else{
          return "";
      }            
    },
    create_request(){
      this.$router.push("/request_change/form");
    },
    editItem(id){
      this.$router.push("/request_change/form/" + id);
    },
    
    getRequestNumber(item){
      return !item.request_no||item.request_no == '' ? item.group_code + "-" + item.year.toString() + "/---" : item.request_no;
    },
    getStatus(status){
      let val = '';
      switch (status) {
        case 1:
          val = 'สร้างใหม่'          
          break;
        case 2:
          val = 'รอการรับรอง'          
          break;
        case 3:
            val = 'รอการพิจารณา'          
            break;
        case 4:
            val = 'รอการอนุมัติ'          
            break;
        case 5:
            val = 'รอดำเนินการ'          
            break;
        case 6:
            val = 'รอติดตามผล'          
            break;
        case 7:
            val = 'รอตรวจสอบผล'          
            break;
        default:
          val = '';
          break;
        
      }
      return val;
    }
  },
  
  
}
</script>

<style scoped>

</style>