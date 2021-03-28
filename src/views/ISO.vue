<template>
  <div class="row">
    <div class="col-md-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <span class="glyphicon glyphicon-cog"></span> Worker 'transcodeVideo'
        </div>
        <div class="panel-body">
          <v-btn
            depressed
            color="primary"
            @click="receiveExternalTasks('ensure-change')"
          >
            Primary
          </v-btn>
          
          <div class="table-responsive">
            <table id="tabletranscodeVideo" class="table table-striped">
              <thead>
                <tr>
                  <th>Received External Task for processing</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var REST_BASE_URL = "http://192.168.1.60:8080/engine-rest/engine/default";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  methods: {
    async receiveExternalTasks(topicName) {
      var fetchRequest = {
        workerId: "worker01",
        maxTasks: 5,
        topics: [
          {
            topicName: topicName,
            lockDuration: 10000            
          }
        ]
      };
      let response = await axios.post("external-task/fetchAndLock/" ,{
        data: JSON.stringify(fetchRequest),
        contentType: "application/json"        
      })
      console.log(response.length);
      // $.ajax(REST_BASE_URL + "/external-task/fetchAndLock/", {
      //   data: JSON.stringify(fetchRequest),
      //   contentType: "application/json",
      //   type: "POST",
      //   success: function(result) {
      //     for (var index = 0; index < result.length; ++index) {
      //       var externalTask = result[index];
      //       console.log(externalTask);
      //       addRowToTable("table" + topicName, JSON.stringify(externalTask));

      //       $.ajax(
      //         REST_BASE_URL + "/external-task/" + externalTask.id + "/complete",
      //         {
      //           data: JSON.stringify({ workerId: "worker01" }),
      //           contentType: "application/json",
      //           type: "POST"
      //         }
      //       );
      //     }
      //   }
      // });
    }
  }
};
</script>
