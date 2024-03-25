<template>

  <v-container>
   
    <v-row>
      <v-col>
        <v-card
          elevation="4"
        >
          <v-data-table
            :headers="(status == 44 || status==55) ? header2 : headers"
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
                    {{'รายการเปลี่ยนแปลงที่' + getStatus(status)}}</v-toolbar-title> 
                    
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
                    :color="(status == 44 || status == 55) ? 'success' : 'primary'"
                    @click="editItem(item.id)"
                >
                    {{(status == 44 || status == 55) ? 'mdi-magnify' : 'mdi-pencil-circle'}}
                </v-icon>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon        
                      v-if="status==7"            
                      class="mr-2"
                      large
                      color="success"
                      v-bind="attrs"
                      v-on="on"
                      @click="checkItem(item.id)"
                    >
                      mdi-shield-check
                    </v-icon>
                  </template>
                  <span>บันทึกตรวจสอบ</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon        
                      v-if="status==3"            
                      class="mr-2"
                      large
                      color="success"
                      v-bind="attrs"
                      v-on="on"
                      @click="accept(item.id)"
                    >
                      mdi-shield-check
                    </v-icon>
                  </template>
                  <span>พิจารณา</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon        
                      v-if="status==3"            
                      class="mr-2"
                      large
                      color="warning"
                      v-bind="attrs"
                      v-on="on"
                      @click="forward(item.id)"
                    >
                      mdi-account-arrow-right
                    </v-icon>
                  </template>
                  <span>ส่งต่อ ผอ.</span>
                </v-tooltip>
                

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
    <v-dialog
        transition="dialog-bottom-transition"
        persistent
        max-width="600"
        v-model="check_dialog"
    >
        
        <template v-slot:default="dialog">
        <v-card>      
            <v-card-title>
                <span>การตรวจสอบผลการเปลี่ยนแปลง</span>
            </v-card-title>                      
            <v-card-text class="mt-4">
                <v-row justify="center">  
                          
                    <v-col cols="12">                                 
                        <v-radio-group
                        v-model="check_status"
                        mandatory
                        row
                        >
                        <v-radio
                            label="ดำเนินการตรวจสอบแล้ว"
                            value="1"
                        ></v-radio>
                        <v-radio
                            label="ไม่สามารถตรวจสอบได้"
                            value="0"
                        ></v-radio>
                        </v-radio-group>           
                        <v-textarea
                            v-model="check_detail"
                            outlined
                            label="รายละเอียด"
                            no-resize
                            rows="2"
                            
                        ></v-textarea>
                    </v-col>                                    
                </v-row>
                <v-row  justify="center">
                    <v-col class="text-center">
                        <v-btn                                    
                            color="primary"
                            rounded
                            dark                
                            dense
                            @click="saveCheck"
                            
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
                @click="dialog.value = false"
                color="error"
            >
                <v-icon left>
                    mdi-cancel
                </v-icon>
                ปิด</v-btn>
            </v-card-actions>
        </v-card>
        </template>
    </v-dialog>
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
      user: this.$store.getters.user,
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
        { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '15%'}                        
                      
      ],
      header2: [
        
        
        { text: 'วันที่ขอดำเนินการ', value: 'created_date', class: ['green darken-3', 'white--text'],width: '15%'},       
        {
            text: 'เลขที่เอกสาร',
            align: 'start',
            // sortable: false,
            value: 'request_no',
            class: ['green darken-3', 'white--text', 'head-text'],
            width: '15%'
        },
        { text: 'เรื่อง', sortable: false, value: 'request_title', class: ['green darken-3', 'white--text'],width: '30%'},       
        { text: 'ผู้ร้องขอ', sortable: false, value: 'user_id', class: ['green darken-3', 'white--text'],width: '15%'},       
        { text: 'สถานะ', sortable: false, value: 'status', class: ['green darken-3', 'white--text'],width: '15%'},      
        { text: 'Action', value: 'actions',class: ['green darken-3', 'white--text'],width: '10%'}                        
                      
      ],
      request_list: [
        // { request_no : 'SDG1-2564/002', create_date: '2021-03-25',request_title : 'ขอเปิดปิดระบบเพื่อ update firmware F5',user_id: 'songwut.saj', status: 'ระหว่างพิจารณา' },
        // { request_no : 'SDG1-2564/001', create_date: '2021-03-24',request_title : 'ขอเปิด policy firewall ระบบเงินเดือน',user_id: 'songwut.saj', status: 'รอรับรอง' }
      ],
      show_alert: '',
      loadTable: true,
      check_dialog:false,
      check_status: null,
      check_detail:'',
      request_id: null
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
      let path = this.$route.path;
      if (path.includes('remote')){
        this.$router.push("/remote/remote_list/remote_form/" + id);
      }else{
        this.$router.push("/change/request_change/form/" + id);
      }
      
      
      
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
        case 44:
            val = 'อนุมัติแล้ว'          
            break;
        case 5:
            val = 'รอดำเนินการ'          
            break;
        case 55:
            val = 'ดำเนินการแล้ว'          
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
        case 88:
            val = 'ใกล้หมดอายุ'          
            break;
        default:
          val = '';
          break;
        
      }
      return val;
    },
    
    checkItem(id){
      this.request_id = id;
      this.check_dialog = true;

    },
    getDateTime(){
        let date = new Date();
        let text = new Date().toISOString().substring(0,19);
        return text.substring(0,10) + ' ' + date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    },

    async saveCheck(){
      let path = await `/api/request_forms/${this.request_id}/request_status`;
      let response = await axios.get(`${path}`);
      let request_status = await response.data.data[0];
      
      const detail = await {
          check_status : this.check_status,                        
          check_detail : this.check_detail,
          check_date : this.getDateTime(),
          check_by : this.user.firstname + ' ' + this.user.lastname
      }
      try {
        path = await `/api/request_forms/${this.request_id}/request_status/${request_status.id}`;
        let res = await axios.put(`${path}`,detail)
        this.show_alert = await "success";
        await this.$store.dispatch('fetchRequest');
        await this.fetchData();
        this.check_dialog = await false;
      } catch (error) {
        this.show_alert = await "error";
      }
      
    },
    async accept(id){
      let path = await `/api/request_forms/${id}/request_status`;
      
      let response = await axios.get(`${path}`);
      let request_status = await response.data.data[0];
      
      const detail = await {          
        consider_status : 1,
        forward_to : '[6]',
        consider_detail : 'เห็นควรดำเนินการ',
        consider_date : this.getDateTime(),
        consider_by : this.user.firstname + ' ' + this.user.lastname
      }
      await console.log(detail);
      // case "consider":
      //               detail = {
      //                   consider_status : this.consider_result == 1 ? this.consider.status : 0,
      //                   forward_to : this.getArrayItem(this.consider.forward_to),
      //                   consider_detail : this.consider.detail,
      //                   consider_date : this.getDateTime(),
      //                   consider_by : this.user.firstname + ' ' + this.user.lastname
      //               }
      //               break;
      //           case "approve":
      //               detail = {
      //                   approve_status : this.approve.status,                        
      //                   approve_detail : this.approve.detail,
      //                   approve_date : this.getDateTime(),
      //                   approve_by : this.user.firstname + ' ' + this.user.lastname
      //               }
      //               break;
      try {
        path = await `/api/request_forms/${id}/request_status/${request_status.id}`;
        let res = await axios.put(`${path}`,detail)
        this.show_alert = await "success";
        await this.$store.dispatch('fetchRequest');
        // await this.fetchData();
        await this.$emit("getConsider");
        this.check_dialog = await false;
      } catch (error) {
        console.log(error);
        this.show_alert = await "error";
      }
      
    },
    async forward(id){
      let path = await `/api/request_forms/${id}/request_status`;
      
      let response = await axios.get(`${path}`);
      let request_status = await response.data.data[0];
      
      const detail = await {          
        consider_status : 2,
        forward_to : '[6]',
        consider_detail : 'เห็นควรอนุมัติให้ดำเนินการ',
        consider_date : this.getDateTime(),
        consider_by : this.user.firstname + ' ' + this.user.lastname
      }
      await console.log(detail);
      // case "consider":
      //               detail = {
      //                   consider_status : this.consider_result == 1 ? this.consider.status : 0,
      //                   forward_to : this.getArrayItem(this.consider.forward_to),
      //                   consider_detail : this.consider.detail,
      //                   consider_date : this.getDateTime(),
      //                   consider_by : this.user.firstname + ' ' + this.user.lastname
      //               }
      //               break;
      //           case "approve":
      //               detail = {
      //                   approve_status : this.approve.status,                        
      //                   approve_detail : this.approve.detail,
      //                   approve_date : this.getDateTime(),
      //                   approve_by : this.user.firstname + ' ' + this.user.lastname
      //               }
      //               break;
      try {
        path = await `/api/request_forms/${id}/request_status/${request_status.id}`;
        let res = await axios.put(`${path}`,detail)
        this.show_alert = await "success";
        await this.$store.dispatch('fetchRequest');
        await this.$emit("getConsider");
        // await this.fetchData();
        this.check_dialog = await false;
      } catch (error) {
        console.log(error);
        this.show_alert = await "error";
      }
      
    }
  },
  
  
}
</script>

<style scoped>

</style>