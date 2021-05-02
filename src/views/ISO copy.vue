<template>
  <v-row>
    <v-col>
      {{ext}}
      <v-btn
        @click="start"
      >
        Start
      </v-btn>
      workerID :{{workerID}}<br>
      <v-btn
        @click="fetchAndLock"
      >
        FetchLock
      </v-btn>
      externalTask : {{externalTask}}
      <v-btn
        @click="complete"
      >
        Complete
      </v-btn>
      {{list}}
    </v-col>
  </v-row>
</template>

<script>
var BPMN_BASE_URL = `http://localhost:8080`;

import axiosa from '../axiosa'

import axios from 'axios'

export default {
  components:{
    'axiosa' : axiosa
  },
  name: "Home",
  data() {
    return {
      workerID: '',
      externalTask : '',
      ext: '',
      list: []
    };
  },
  mounted(){
    this.fetchData();
    // this.start();
  },
  methods: {
    fetchData(){
      
      // let path = `/engine-rest/deployment`;
      // axiosa.get(`${path}`,{        
      //   baseURL : BPMN_BASE_URL
      // })       
      // .then(response=>{
      //   this.ext = response.data;
      // })
      // .catch(error=>{
      //   // console.log(error);
      // })
      
     
      

    },
    start(){
      this.$nextTick(()=>{
        let list = this.getTaskList();
        console.log(list);
      })
      
        return 
      let path = `/engine-rest/process-definition/key/change-control/start`;
      
      axiosa({
        method: 'POST',
        baseURL : BPMN_BASE_URL,
        url: path,
        
        data:{
          "variables" : {
           "id" : {
             "value" : "1"
           }
         }
        }
      })
      .then(res=>{
        this.workerID = res.data.id
      })
    },
    
    fetchAndLock(){
      let path = `/engine-rest/external-task/fetchAndLock`;
      
      axiosa({
        method: 'POST',
        baseURL : BPMN_BASE_URL,
        url: path,        
        data:{
          "workerId":this.workerID,
          "maxTasks":2,
          "topics" : [{
              "topicName" : "send-request",
              "lockDuration" : 20000
          }]
        }
      })
      .then(res=>{
        this.externalTask = res.data[0].id
      })
    },
    complete(){
      let path = `/engine-rest/external-task/${this.externalTask}/complete`;
      
      axiosa({
        method: 'POST',
        baseURL : BPMN_BASE_URL,
        url: path,
        
        data:{
          "workerId" : this.workerID,//"8d40f12f-a5e1-11eb-aa45-0242ac110002",
          "variables" : {
              "id" : {
                  "value" : 1
              },
              "request_no" : {
                  "value" : "SECD-2564/002"
              },
              "consider" : {
                  "value" : true
              }
          }
        }
      })
      .then(res=>{
        console.log('sended')
      })
    },
  }
};
</script>
