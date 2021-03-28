<template>

  <v-container>
    <v-row>
      <v-col>
        <request-search></request-search>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          elevation="4"
        >
          <v-data-table
            :headers="headers"
            :items="request_list"
            :items-per-page="15"
            
            class="elevation-1"
            
            v-if="request_list">
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>รายการเปลี่ยนแปลงข้อมูล</v-toolbar-title> 
                  <v-btn
                    class="ma-2"
                    rounded
                    color="success"
                    @click="create_request"
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    เพิ่มรายการใหม่
                  </v-btn>            
                </v-toolbar>
            </template>
            
            <template v-slot:item.create_date="{ item }">
                
                    {{ getThaiDate(item.create_date) }}
                
            </template>
            
            
            
                            
            
        
        </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import RequestSearch from "../components/Request/RequestSearch"
export default {
  data(){
    return  {
      headers: [
        {
            text: 'เลขที่เอกสาร',
            align: 'start',
            // sortable: false,
            value: 'request_no',
            class: ['blue darken-3', 'white--text', 'head-text']
        },
        { text: 'วันที่ร้องขอ', value: 'create_date', class: ['blue darken-3', 'white--text']},       
        { text: 'ชื่อเรื่อง', sortable: false, value: 'request_title', class: ['blue darken-3', 'white--text']},       
        { text: 'ผู้ร้องขอ', sortable: false, value: 'user_id', class: ['blue darken-3', 'white--text']},       
        { text: 'สถานะ', sortable: false, value: 'status', class: ['blue darken-3', 'white--text']},       
                      
      ],
      request_list: [
        { request_no : 'SDG1-2564/002', create_date: '2021-03-25',request_title : 'ขอเปิดปิดระบบเพื่อ update firmware F5',user_id: 'songwut.saj', status: 'ระหว่างพิจารณา' },
        { request_no : 'SDG1-2564/001', create_date: '2021-03-24',request_title : 'ขอเปิด policy firewall ระบบเงินเดือน',user_id: 'songwut.saj', status: 'รอรับรอง' }
      ]
    }
  },
  methods: {
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
    }
  },
  components : {
    RequestSearch
  }
}
</script>

<style scoped>

</style>