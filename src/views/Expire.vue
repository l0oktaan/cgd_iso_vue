<template>

  <request-list :list="request_list" :status="88" :h_color="$route.path.includes('remote')? 'red darken-4' : 'blue darken-3'"></request-list>

</template>

<script>
import Swal from 'sweetalert2';

import axios from 'axios';

import RequestList from '../components/Request/RequestList'
export default {
  
  data(){
    return  {
      status: 7,
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
      show_alert: ''
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    async fetchData(){
      // let path = await `/api/request_form_follow`;
      // let response = await axios.get(`${path}`);
      // this.request_list = await response.data.data;
      if (this.$route.path.includes('remote')){
        await this.$store.dispatch('get_remote_expire');
        this.request_list = await this.$store.getters.remote_expire;
      }else{

        await this.$store.dispatch('get_request_expire');
        this.request_list = await this.$store.getters.request_expire;
      }
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
  
  components : {
    RequestList
  }
}
</script>

<style scoped>

</style>