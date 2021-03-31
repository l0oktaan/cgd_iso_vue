<template>
    <v-row justify="center">
        <v-col cols="10">
            <v-card class="pa-2">
                <v-form>
                    <v-row>
                        <v-col :cols="col_l" class="text-right">ชื่อเรื่อง :</v-col>
                        <v-col :cols="col_r">
                            <v-text-field
                                outlined                                
                                dense
                                label=""
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-data-table
                                :headers="headers"
                                :items="policy_list"
                                :items-per-page="10"
                                @current-items="test"
                                class="elevation-1"                                                               
                            >
                                <template v-slot:top>
                                    <v-toolbar
                                        flat
                                    >
                                        <v-toolbar-title>
                                            <v-icon large>mdi-account-multiple</v-icon>
                                            Policy Firewall
                                        </v-toolbar-title>
                                            <v-btn
                                                class="ma-2"
                                                rounded
                                                color="red" 
                                                @click="add_row"                                               
                                            >
                                            <v-icon left>
                                            mdi-plus
                                            </v-icon>
                                            เพิ่มรายการใหม่
                                            </v-btn>
                                        
                                    </v-toolbar>
                                </template>
                                <template v-slot:item.source="{ item,index }">
                                    {{ index}}
                                    {{ source_select}}
                                    <v-menu
                                        v-model="menu_source"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-x
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn                                        
                                                    color="secondary"
                                                    fab
                                                    x-small
                                                    dark    
                                                    v-bind="attrs"
                                                    v-on="on"                                           
                                                >
                                                <v-icon>
                                                mdi-plus
                                                </v-icon>   
                                                                                   
                                            </v-btn> 
                                              
                                        </template>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-data-table
                                                        v-model="source_select"
                                                        :headers="source_headers"
                                                        :items="source_list"                                                        
                                                        item-key="id"
                                                        show-select
                                                        class="elevation-1"
                                                        hide-default-footer
                                                        hide-default-header
                                                        :search="search"
                                                    >
                                                        <template v-slot:top>
                                                            <v-toolbar
                                                                flat
                                                            >
                                                                <v-toolbar-title>
                                                                    <v-icon>mdi-server</v-icon>
                                                                    รายการอุปกรณ์
                                                                </v-toolbar-title> 
                                                        
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
                                                    </v-data-table>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-menu>
                                    
                                </template>
                                <template v-slot:item.destination="{ item }">                                    
                                    <v-menu
                                        v-model="menu_destination"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-x
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn                                        
                                                    color="secondary"
                                                    fab
                                                    x-small
                                                    dark    
                                                    v-bind="attrs"
                                                    v-on="on"                                           
                                                >
                                                <v-icon>
                                                mdi-plus
                                                </v-icon>                                        
                                            </v-btn> 
                                        </template>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-data-table
                                                        v-model="destination_select"
                                                        :headers="destination_headers"
                                                        :items="destination_list"                                                        
                                                        item-key="id"
                                                        show-select
                                                        class="elevation-1"
                                                        hide-default-footer
                                                        hide-default-header
                                                        :search="search"
                                                    >
                                                        <template v-slot:top>
                                                            <v-toolbar
                                                                flat
                                                            >
                                                                <v-toolbar-title>
                                                                    <v-icon>mdi-server</v-icon>
                                                                    รายการอุปกรณ์
                                                                </v-toolbar-title> 
                                                        
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
                                                    </v-data-table>
                                                </v-col>
                                            </v-row>
                                        </v-card>    
                                    </v-menu>
                                </template>
                                <template v-slot:item.service_port="{ item,index }">
                                    <v-menu
                                        v-model="menu_test"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-x
                                        >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn                                        
                                                    color="secondary"
                                                    fab
                                                    x-small
                                                    dark    
                                                    v-bind="attrs"
                                                    v-on="on"                                           
                                                >
                                                <v-icon>
                                                mdi-plus
                                                </v-icon>                                        
                                            </v-btn> 
                                        </template>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="12">
                                                    <asset-edit :items="source_list" :header="source_headers"></asset-edit>
                                                </v-col>
                                            </v-row>
                                        </v-card>    
                                    </v-menu>
                                    
                                </template>
                            </v-data-table>
                            {{policy_list}}
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>      
                   
            
        </v-col>
    </v-row>
</template>

<script>
import AssetEdit from './AssetEdit.vue'
export default {
    components:{
        'asset-edit':AssetEdit
    },
    data(){
        return {
            menu_test: false,
            menu_source: false,
            menu_destination: false,
            dialog:false,
            dialog_source:false,
            singleSelect: false,
            selected: [],
            source_select:[
                {id: 1, asset: 'app_server', ip_address: ['10.100.90.17']}
            ],
            destination_select:[],
            search: '',
            col_l: 3,
            col_r: 9,
            headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text']},       
                { text: 'Service/Port', value: 'service_port', class: ['blue darken-3', 'white--text']},                       
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text']}                       
                            
            ],
            source_headers:[
                { text: 'Asset', sortable: false, value: 'asset', class: ['blue darken-3', 'white--text']},
                { text: 'IP', sortable: false, value: 'ip_address', class: ['blue darken-3', 'white--text']},
                { text: 'Tags', sortable: false, value: 'tags', class: ['blue darken-3', 'white--text']},

            ],
            destination_headers:[
                { text: 'Asset', sortable: false, value: 'asset', class: ['blue darken-3', 'white--text']},
                { text: 'IP', sortable: false, value: 'ip_address', class: ['blue darken-3', 'white--text']},
                { text: 'Port', sortable: false, value: 'service_port', class: ['blue darken-3', 'white--text']},
                { text: 'Tags', sortable: false, value: 'tags', class: ['blue darken-3', 'white--text']},
            ],
            policy_list:[],
            policy:{
                source: [],
                destination: [],
                service_port:[]
            },
            policy_edit:{
                source: [],
                destination: [],
                service:[]
            },
            equip_list: [
                {id:1,equip_name: 'app server', ip_address : ['10.100.90.17','10.100.99.77'],service_port: ['22','443','smtp'],equip_tags:['egp','ewithdraw']},
                {id:2,equip_name: 'db server', ip_address : ['10.100.11.17','10.100.11.77'],service_port: ['3306','9292'],equip_tags:['egp','db']},
            ],
            people_list: [
                {id:1, people_name: 'ทรงวุฒิ สัจจบุตร', ip_address : '10.10.31.85',people_type: 1, organiz_id: 1,people_tags:['security','itc']},
                {id:2, people_name: 'สัจจบุตร ทรงวุฒิ', ip_address : '10.10.31.86',people_type: 2, organiz_id: 12,people_tags:['pcc','vender']},
            ],
            source_list:[
                {id: 1, asset: 'app_server', ip_address: ['10.100.90.17'],tags:['app']},
                {id: 2, asset: 'db_server', ip_address: ['10.100.90.17'],tags:['db']}
            ],
            destination_list:[
                {id: 1, asset: 'app_server', ip_address: ['10.100.90.17'],service_port:['22','443'],tags:['egp']},
                {id: 2, asset: 'db_server', ip_address: ['10.100.90.17'],service_port:['22','443'],tags:['admin']}
            ]
        }
    },
    methods: {
        clear(){
            this.dialog = false;
        },
        add_row(){
            this.policy_list.push(this.policy);
        },
        add_source(item){
            this.dialog_source = true;
        },
        create_list(){
            
        },
        test(item){
            console.log(item);
        }
    }
}
</script>

<style scoped>
td.text-start {
  border: 3px solid black!important;
}
.v-btn--fab.v-size--x-small{
    height: 25px!important;
    width: 25px!important;
}
</style>>

</style>