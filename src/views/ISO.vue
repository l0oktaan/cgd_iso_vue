<template>
  <div>
    <v-row>
      <v-col cols="3" v-if="true || request_new.length>0"><my-block :status="1" :value="request_new.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_ensure.length>0"><my-block :status="2" :value="request_ensure.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_consider.length>0"><my-block :status="3" :value="request_consider.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_approve.length>0"><my-block :status="4" :value="request_approve.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_operate.length>0"><my-block :status="5" :value="request_operate.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_follow.length>0"><my-block :status="6" :value="request_follow.length"></my-block></v-col>
      <v-col cols="3" v-if="true || request_check.length>0"><my-block :status="7" :value="request_check.length"></my-block></v-col>    
      <v-col cols="3" v-if="true || request_success.length>0"><my-block :status="8" :value="request_success.length"></my-block></v-col>
    </v-row>
    <div class="chart" v-if="hasPermiss">
      <div class="donut" v-if="g_1" ><my-donut :series="g_1.num" :labels="g_1.labels" ititle="กลุ่มงานพัฒนาระบบงาน 1"></my-donut></div>
      <div class="donut" v-if="g_2" ><my-donut :series="g_2.num" :labels="g_2.labels" ititle="กลุ่มงานพัฒนาระบบงาน 2"></my-donut></div>
      <div class="donut" v-if="g_3" ><my-donut :series="g_3.num" :labels="g_3.labels" ititle="กลุ่มงานพัฒนาระบบงาน 3"></my-donut></div>
      <div class="donut" v-if="g_4" ><my-donut :series="g_4.num" :labels="g_4.labels" ititle="กลุ่มงานพัฒนาระบบงาน 4"></my-donut></div>
      <div class="donut" v-if="g_5" ><my-donut :series="g_5.num" :labels="g_5.labels" ititle="กลุ่มงานเครื่องคอมพิวเตอร์"></my-donut></div>
      <div class="donut" v-if="g_6" ><my-donut :series="g_6.num" :labels="g_6.labels" ititle="กลุ่มงานเครือข่ายและการสื่อสาร"></my-donut></div>
      <div class="donut" v-if="g_7" ><my-donut :series="g_7.num" :labels="g_7.labels" ititle="กลุ่มงานรักษาความปลอดภัยสารสนเทศ"></my-donut></div>

      <!-- <div class="donut" ><my-donut :list="getByGroup(2)"></my-donut></div> -->
    </div>
  </div>
  
  
</template>

<script>
import Block from '../components/Dashboard/Block'
import Donut from '../components/Dashboard/Donut'
export default {
  components: {
    'my-block' : Block,
    'my-donut' : Donut
  },
  data(){
    return {
      request_list: null,
      request_new: [],
      request_ensure: [],
      request_consider: [],
      request_approve: [],
      request_operate: [],
      request_follow: [],
      request_check: [],
      request_success: [],
      showList: {
        labels: ["x","y","z"],
        count: [1,2,3]
      },
      g_1: null,
      g_2: null,
      g_3: null,
      g_4: null,
      g_5: null,
      g_6: null,
      g_7: null,
      user: this.$store.getters.user,
      hasPermiss: false
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    permissCheck(){
      JSON.parse(this.user.roles).includes("admin") || JSON.parse(this.user.roles).includes("approve") ? this.hasPermiss = true : this.hasPermiss = false; 
      
      // return (JSON.parse(this.user.roles).includes("admin")) ? true : false;
    },
    async fetchData(){
      await this.$store.dispatch('get_request_all');
      this.request_list = await this.$store.getters.request_all;
      
      await this.filterList();
      this.permissCheck()
    },
    async filterList(){
      this.request_new = await this.getStatus(1);
      this.request_ensure = await this.getStatus(2);
      this.request_consider = await this.getStatus(3);
      this.request_approve = await this.getStatus(4);
      this.request_operate = await this.getStatus(5);
      this.request_follow = await this.getStatus(6);
      this.request_check = await this.getStatus(7);
      this.request_success = await this.getStatus(8);

      this.g_1 = await this.getByGroup(1);
      this.g_2 = await this.getByGroup(2);
      this.g_3 = await this.getByGroup(3);
      this.g_4 = await this.getByGroup(4);
      this.g_5 = await this.getByGroup(5);
      this.g_6 = await this.getByGroup(6);
      this.g_7 = await this.getByGroup(7);


    },
    async getStatus(status){
      return this.request_list ? this.request_list.filter(x=>x.status == status) : [];
    },
    getLabel(status){ 
        let val='';
        switch (status) {
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

    },
    async getByGroup(group_id){
      let tmp = {
          num: [],
          labels: []
        };
      let list = this.request_list ? this.request_list.filter(x=>x.group_id == group_id) : [];
      
      if (list.length > 0){        
        for (let status = 1; status <= 8 ;status++){
          let l = list.filter(x=>x.status == status)
          let num = l ? l.length : 0
          tmp.num.push(num)
          let label = this.getLabel(status)
          
          tmp.labels.push(label)          
        }        
        return tmp;
      }else{
        return tmp;
      }
    }


    
  }
}
</script>

<style scoped>
.chart {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px; 
  
  justify-content:center;
}
</style>