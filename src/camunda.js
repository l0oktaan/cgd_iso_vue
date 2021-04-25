var BPMN_BASE_URL = `http://localhost:8080`;

import axiosa from './axiosa'

import Vue from 'vue'

const camunda = {
    install(Vue, options) {
        Vue.prototype.getTaskList= () => {
            
            let path = `/engine-rest/external-task`;
            axiosa({
                method: 'GET',
                baseURL : BPMN_BASE_URL,
                url: path     
            })       
            .then(response=>{      
                return response         
                let x = response.data
                console.log(typeof(x));
            })
            .catch(error=>{
                console.log(error);
            })
        },
        Vue.prototype.startRequest= (id) => {
            let path = `/engine-rest/process-definition/key/change-control/start`;            
            axiosa({
              method: 'POST',
              baseURL : BPMN_BASE_URL,
              url: path,
              
              data:{
                    "variables" : {
                        "id" : {
                            "value" : id
                    }
                }
              }
            })
            .then(res=>{
                return res.data.id
            })
        },
        Vue.prototype.fetchAndLock = (workerID,topic) => {
            let path = `/engine-rest/external-task/fetchAndLock`;
            
            axiosa({
              method: 'POST',
              baseURL : BPMN_BASE_URL,
              url: path,        
              data:{
                "workerId": workerID,
                "maxTasks":2,
                "topics" : [{
                    "topicName" : topic,
                    "lockDuration" : 20000
                }]
              }
            })
            .then(res=>{
                return res.data[0].id
            })
          },
        Vue.prototype.complete = (workerID,request_no,externalTask) => {
            let path = `/engine-rest/external-task/${externalTask}/complete`;            
            axiosa({
              method: 'POST',
              baseURL : BPMN_BASE_URL,
              url: path,
              
              data:{
                "workerId" : workerID,//"8d40f12f-a5e1-11eb-aa45-0242ac110002",
                "variables" : {
                    "id" : {
                        "value" : 1
                    },
                    "request_no" : {
                        "value" : request_no
                    },
                    "consider" : {
                        "value" : true
                    },
                    "approve" : {
                        "value" : true
                    }
                }
              }
            })
            .then(res=>{
                return "completed"
            })
          }
    },
  }

  export default camunda
// Vue.mixin({
//     methods:{
//         showCamunda(){
//             console.log('camunda')
//         }
//     }
//   })