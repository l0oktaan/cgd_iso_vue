<template>

  <div>
    <!-- <v-row>
      <v-col>
        <request-search></request-search>
      </v-col>
    </v-row> -->
    
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
            loading-text="Loading... Please wait"
            class="elevation-1"
            :search="search"
            >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>
                    <v-icon large>mdi-stack-exchange</v-icon>
                    รายการเปลี่ยนแปลงข้อมูล</v-toolbar-title> 
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
                
                    {{ getRequestNumber(item) }}
                
            </template>
            <template v-slot:item.fullname="{ item }">
                
                    {{ item.fullname }}
                
            </template>
            <template v-slot:item.status="{ item }">
                <v-progress-circular
                  size=20
                  :value="(item.status/8)*100"
                  :color="getProgress(item.status)"
                ></v-progress-circular>
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
                <v-icon  
                    :disabled = "item.status > 1"
                    color="error"        
                    @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>
            
                            
            
        
        </v-data-table>
        </v-card>
        
      </v-col>
    </v-row>
    <v-dialog
        transition="dialog-bottom-transition"
        persistent
        max-width="700"
        v-model="request_dialog"
    >
        
        <template v-slot:default="dialog">
            <v-card>      
                <v-card-title>
                    <span> สร้างการร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ</span>
                </v-card-title>                      
                <v-card-text class="mt-4">
                    <v-row>
                      <v-col cols="3" class="text-right">เรื่อง :</v-col>
                      <v-col>
                        <v-text-field
                                outlined                                
                                dense
                                label=""
                                v-model="request_title" 
                                hide-details="auto"
                                :rules="[rules.required, rules.counter]"
                            maxlength="250"
                            
                          >                            
                        </v-text-field> 
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3" class="text-right">เหตุผล :</v-col>
                      <v-col>
                        <v-text-field
                          outlined                                
                          dense
                          label=""
                          v-model="request_reason" 
                          hide-details="auto"  
                          :rules="[rules.required, rules.counter]"
                          maxlength="250"
                          
                        >                            
                        </v-text-field> 
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <v-btn
                            class="ma-3"
                            rounded
                            color="primary"
                            :disabled="invalid"
                            @click="save_request"
                            
                        >
                            <v-icon left>
                                mdi-content-save-outline
                            </v-icon>
                            บันทึก
                        </v-btn>                           
                        
                      </v-col>
                    </v-row>
                                                        
                </v-card-text>
                <v-card-actions class="justify-end">
                <v-btn
                    text
                    @click="close_dialog"
                    color="error"
                >
                    <v-icon left>
                        mdi-cancel
                    </v-icon>
                    ยกเลิก</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
    <my-alert :AlertType="show_alert"></my-alert>
  </div>

</template>

<script>



import Swal from 'sweetalert2';

import axios from 'axios';

import RequestSearch from "../components/Request/RequestSearch"



export default {
  
  data(){
    return  {
      search: '',
      headers: [
        { text: 'วันที่จัดทำ', value: 'created_date', class: ['blue darken-3', 'white--text'],width: '10%'},
        
        {
            text: 'เลขที่เอกสาร',
            align: 'start',
            // sortable: false,
            value: 'request_no',
            class: ['blue darken-3', 'white--text', 'head-text'],
            width: '13%'
        },
        { text: 'เรื่อง', sortable: false, value: 'request_title', class: ['blue darken-3', 'white--text'],width: '35%'},
               
               
        { text: 'ผู้ร้องขอ', sortable: true, value: 'fullname', class: ['blue darken-3', 'white--text'],width: '15%'},       
        { text: 'สถานะ', sortable: true, value: 'status', class: ['blue darken-3', 'white--text'],width: '13%'},      
        { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                        
                      
      ],
      request_list: [
        // { request_no : 'SDG1-2564/002', create_date: '2021-03-25',request_title : 'ขอเปิดปิดระบบเพื่อ update firmware F5',user_id: 'songwut.saj', status: 'ระหว่างพิจารณา' },
        // { request_no : 'SDG1-2564/001', create_date: '2021-03-24',request_title : 'ขอเปิด policy firewall ระบบเงินเดือน',user_id: 'songwut.saj', status: 'รอรับรอง' }
      ],
      show_alert: '',
      loadTable: true,
      request_dialog: false,
      request_title: '',
      request_reason: '',
      rules: {
          required: value => !!value || 'กรุณาใส่ข้อมูล.',
          counter: value => value.length > 10 || 'ความยาวไม่น้อยกว่า 10 ตัวอักษร',          
        },
      user: this.$store.getters.user
    }
  },
  mounted(){
    this.fetchData();
  },
  computed: {
    invalid(){
      return (this.request_title == '' || this.request_reason == '') ? true : false;
    }
  },
  methods: {
    async fetchData(){
      await this.$store.dispatch('get_request_list');
      
      this.request_list = await this.$store.getters.request_list;
      this.loadTable = await false;
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

      this.request_dialog = true;
      // this.$router.push("/request_change/form");
    },
    getProgress(status){
      let progress = status/8*100
      let color = "gray";
      switch (progress) {
        case 12.5:
          color = "grey"
        break;
        case 25:
          color = "brown darken-2"
        break;
        case 37.5:
          color = "yellow darken-1"
        break;
        case 50:
          color = "amber darken-4"
        break;
        case 62.5:
          color = "light-blue accent-4"
        break;
        case 75:
          color = "light-blue darken-4"
        break;
        case 87.5:
          color = "green accent-3"
        break;
        case 100:
          color = "success"
        break;
      
        default:
          color = "blue-grey"
        break;
      }
      return color;
    },
    check_group(id){
          let group = this.$store.getters.group_cgd;
          let g = group.filter(x=>x.id == id)
          if (g.length>0){
              console.log('group :' + g[0].group_name_short);
              return g[0].group_name_short
          }
      },
      getDateTime(){
            let date = new Date();
            let text = new Date().toISOString().substring(0,19);
            return text.substring(0,10) + ' ' + date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        },
    async save_request(){
      let arr = [];
      let path = await `/api/request_forms`;
      let response = await axios.post(`${path}`,{
        user_id : this.user.id,
        user_name : this.user.name,
        group_id : this.user.group_id,
        group_code : this.check_group(this.user.group_id),
        year : parseInt(new Date().toISOString().substr(0, 4)) + 543,
        order_no : 0,
        created_date : this.getDateTime(),
        request_no : '',
        change_type : 0,
        request_title : this.request_title,
        request_reason : this.request_reason,
        document_relate : JSON.stringify(arr),
        person_relate : JSON.stringify(arr),
        system_relate : JSON.stringify(arr),
        env_impact : JSON.stringify(arr),
        system_impact : JSON.stringify(arr),
        level_impact : 1,
        begin_date : new Date().toISOString().substr(0, 10),        
        status : 0,
        description : '',
        updated_date : new Date().toISOString().substr(0, 10),
      })
      let request = await response.data.data;
      
      this.show_alert = await 'success';
      await this.close_dialog();
      await this.editItem(request.id);
    },
    editItem(id){
      this.$router.push("/request_change/form/" + id);
    },
    close_dialog(){
      this.request_title = '';
      this.request_reason = '';
      this.request_dialog = false;
    },
    async deleteItem(id){
      Swal.fire({
          title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",                
          icon: "warning",
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: `ยืนยัน`,
          cancelButtonText: `ยกเลิก`,
          }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
              this.delRequest(id);
          } else if (result.isDenied) {
              // Swal.fire('Changes are not saved', '', 'info')
          }
      })
    },
    async delRequest(id){
      let path = `/api/request_forms/${id}`;
            try {
                await axios.delete(`${path}`);   
                await this.fetchData();
                this.show_alert= await "success";
            } catch (error) {
                this.show_alert = "error";
                
            }
    },
    getRequestNumber(item){
      return !item.request_no||item.request_no == '' ? item.group_code + "-" + item.year.toString() + "/---" : item.request_no;
    },
    getStatus(status){
      let val = '';
      switch (status) {
        case 0:
          val = 'สร้างใหม่'          
          break;
        case 1:
          val = 'รอการส่ง'          
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
        case 8:
            val = 'เสร็จสิ้น'          
            break;
        default:
          val = '';
          break;
        
      }
      return val;
    }
  },
  
  components : {
    RequestSearch
  }
}
</script>

<style scoped>

</style>