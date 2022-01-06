<template>
  <div>
    
    <v-card
      class="mx-auto mt-5"
      
      height="100"
      max-width="300"
      color="default"
      dask
      
    >
      <v-card-text>
          <v-card
            class="mt-n6 ml-n6 mx-auto pl-0"
            
            height="50"
            max-width="50"
            color="primary"
            elevation="10"            
            >
            <v-card-text class="text-center ml-n1 mt-n1" >
                <v-icon dark>{{getIcon()}}</v-icon>
            </v-card-text>
            </v-card>
            <v-row class="mt-n10" justify-end align="start">
                <v-col class="text-right"><h3>{{getTitle()}}</h3></v-col>
            </v-row>
            <v-row class="mt-2" justify-end align="end">
                <v-col class="text-right"><h2>{{value}}</h2></v-col>
            </v-row>
      </v-card-text>
    </v-card>    
  </div>
</template>

<script>

export default {
    props: ['status','value'],
    data(){
        return {
            
        }
    },
    methods: {
        getTitle(){ 
            let val=''           ;
            switch (this.status) {
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
        getIcon(){ 
            let val='';
            switch (this.status) {
                case 1:
                val = 'mdi-clock'          
                break;
                case 2:
                val = 'mdi-jira'          
                break;
                case 3:
                    val = 'mdi-file-find'          
                    break;
                case 4:
                    val = 'mdi-check-bold'          
                    break;
                case 5:
                    val = 'mdi-cog'          
                    break;
                case 6:
                    val = 'mdi-clipboard-clock'          
                    break;
                case 7:
                    val = 'mdi-shield-check'          
                    break;
                case 8:
                    val = 'mdi-check-bold'          
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

<style>

</style>