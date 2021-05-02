<template>
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
  
</template>

<script>
import Block from '../components/Dashboard/Block'
export default {
  components: {
    'my-block' : Block
  },
  data(){
    return {
      request_list: [],
      request_new: [],
      request_ensure: [],
      request_consider: [],
      request_approve: [],
      request_operate: [],
      request_follow: [],
      request_check: [],
      request_success: [],
    }
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    async fetchData(){
      await this.$store.dispatch('get_request_all');
      this.request_list = await this.$store.getters.request_all;
      await this.filterList();
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
    },
    async getStatus(status){
      return this.request_list ? this.request_list.filter(x=>x.status == status) : [];
    }
    
  }
}
</script>

<style>

</style>