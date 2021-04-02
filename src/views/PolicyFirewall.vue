<template>
    <v-row>
        <v-col>
            <v-data-table
                id="tbPolicyTemplate"
                :headers="headers"
                :items="policy_template_list"
                :items-per-page="10"
                :search="search"
                class="elevation-1"    
                                                                            
            >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>
                        <v-icon>mdi-server</v-icon>
                        รายการ Policy Firewall
                    </v-toolbar-title> 

                    <v-dialog
                        transition="dialog-bottom-transition"
                        persistent
                        max-width="1100"
                        v-model="policy_dialog"
                    >
                        
                        <template v-slot:default="dialog">
                            <v-card>      
                                <v-card-title>
                                    <span> รายละเอียด Policy Firewall</span>
                                </v-card-title>                      
                                <v-card-text class="mt-4">
                                    <request-firewall 
                                    ref="request_firewall"
                                        :edit_policy="policy_edit.policy_list"
                                    ></request-firewall>
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
                    <v-btn
                        class="ma-2"
                        rounded
                        color="success" 
                        @click="policy_dialog=true"                                               
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
            <!-- <template v-slot:item.policy_list.source="{ item,index }">                            

            <v-row v-for="(s,i) in item.source" :key="i">
                        <v-col>{{s.asset}}</v-col>
                        <v-col>
                            <p v-for="(ip,x) in s.ip_address" 
                                :key="x"
                            >
                                {{ip}}
                            </p>
                        </v-col>
                    </v-row>
            </template>
                <template v-slot:item.policy_list.destination="{ item,index }">
                    <v-row v-for="(s,i) in item.destination" :key="i">
                        <v-col>{{s.asset}}</v-col>
                        <v-col>
                            <p v-for="(ip,x) in s.ip_address" 
                                :key="x"
                                >
                                    {{ip}}
                                </p>
                            </v-col>
                    </v-row>
                </template>
                <template v-slot:item.service_port="{ item,index }">                                    
                    <div>
                        <v-chip                                                       
                        
                            color="black"
                            small
                            outlined
                            v-for="(port,index) in item.service_port"
                            :key="index"
                            >     
                            <v-icon left>
                                mdi-label
                            </v-icon>                                   
                            {{ port }}
                        </v-chip>
                    </div>                                  
                </template> -->
                <template v-slot:item.actions="{ item,index }">
                <v-icon                    
                    class="mr-2"
                    large
                    color="primary"
                    @click="editPolicy(item,index)"
                >
                    mdi-pencil-circle
                </v-icon>
                <v-icon  
                    
                    color="error"        
                    @click="deletePolicy(item,index)"
                >
                    mdi-delete
                </v-icon>
            </template>
            </v-data-table>
            
        </v-col>
    </v-row>
</template>

<script>
import RequestFirewall from '../components/Request/RequestFirewall.vue'
export default {
    components:{
        'request-firewall' : RequestFirewall
    },
    
    data(){
        return {
            policy_dialog: false,
            search: '',
            headers: [
                {
                    text: 'วันที่ปรับปรุง',
                    align: 'start',
                    // sortable: false,
                    value: 'updated_date',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '12%'
                },
                {
                    text: 'ชื่อรายการ',
                    align: 'start',                    
                    value: 'policy_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '20%'
                },
                // {                    
                //     text: 'Source',
                //     align: 'start',
                //     sortable: false,
                //     value: 'source',
                //     class: ['blue darken-3', 'white--text', 'head-text'],
                //     width: '25%'
                // },
                // { text: 'Destination',align: 'start', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text'],width: '25%'},       
                // { text: 'Service/Port',align: 'start', sortable: false, value: 'service_port', class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'Action',align: 'center', sortable: false, value: 'actions',class: ['blue darken-3', 'white--text'],width: '20%'}                       
                            
            ],
            policy_template_list: [
                {
                    id:1,
                    policy_name:'การพัฒนาระบบ ewithdraw',
                    policy_list:[
                        {
                            source:[
                                {
                                    id:1,
                                    asset_type: 1,
                                    asset: 'ทรงวุฒิ สัจจบุตร',
                                    ip_address: ['10.10.10.100','10.10.11.100'],
                                    tags: ['admin','ewithdraw']
                                }
                            ],
                            destination:[
                                {
                                    id:1,
                                    asset_type: 1,
                                    asset: 'app server',
                                    ip_address: ['10.10.10.10'],
                                    service_port:['22','443'],
                                    tags: ['app_server','ewithdraw']
                                }
                            ],
                            service_port:[
                                '22','443'
                            ],
                        }
                    ],
                    
                    updated_date: '2021-03-31'
                }
            ],
            policy_edit: []
        }
    },
    methods:{
        editPolicy(item,index){
            this.$nextTick(()=>{
                this.policy_edit = JSON.parse(JSON.stringify(item));
            this.policy_dialog =true;
            })
            
        },
        close_dialog(){
            this.$refs.request_firewall.clearAll();
            this.policy_dialog = false;
        }
    }
}
</script>

<style>

</style>