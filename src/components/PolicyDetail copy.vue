<template>
    <v-row justify="center">
        <v-col cols="12">
            <v-card class="pa-2">
                <v-form @submit.prevent="submit">
                    <v-row>
                        <v-col :cols="col_l" class="text-right">ชื่อเรื่อง :</v-col>
                        <v-col :cols="col_r">
                            <v-text-field
                                outlined                                
                                dense
                                label=""
                                v-model="policy_name"
                            >
                            
                            </v-text-field>     
                            {{edit_policy}}                       
                        </v-col>
                    </v-row>
                    <v-row v-if="status == 'edit'">
                        
                        <v-col cols="12">
                            <v-data-table
                                id="tbPolicyEdit"
                                :headers="headers"
                                :items="policy_list_edit"
                                :items-per-page="10"
                                @current-items="test"
                                class="elevation-1"    
                                hide-default-footer                                                           
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
                                                color="success" 
                                                @click="create_new"                                               
                                            >
                                            <v-icon left>
                                            mdi-plus
                                            </v-icon>
                                            เพิ่มรายการใหม่
                                            </v-btn>
                                        
                                    </v-toolbar>
                                </template>
                                
                                <template v-slot:item.source="{ item,index }">
                                    
                                            <asset-edit 
                                                :items="source_list" 
                                                :header="source_headers" 
                                                :select="item.source"
                                                :index="index"
                                                @updateItem="updateSource"
                                            ></asset-edit>
                                       
                                    
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
                                <template v-slot:item.destination="{ item,index }">                                    
                                    <asset-edit 
                                        :items="destination_list" 
                                        :header="destination_headers" 
                                        :select="item.destination"
                                        :index="index"
                                        @updateItem="updateDestination"
                                    ></asset-edit>
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
                                    
                                        <v-menu        
                                            :close-on-content-click="false"
                                            :nudge-width="200"
                                            offset-x
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn                                        
                                                        color="success"
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
                                            
                                                <v-checkbox 
                                                    v-for="(port,index) in service_port_list"
                                                    :key="index"
                                                    v-model="item.service_port"                                                
                                                    :value="port"
                                                    :label="port"
                                                    dense
                                                >
                                                    
                                                </v-checkbox>
                                            
                                            <!-- <v-combobox
                                                v-model="service_port_select"
                                                :items="service_port_list"
                                                :search-input.sync="search"
                                                    hide-details="true"
                                                dense
                                                multiple
                                                persistent-hint
                                                                                            
                                                >                                            
                                            </v-combobox> -->
                                            
                                        </v-menu>
                                        
                                        <div>
                                            <v-chip                                                       
                                            
                                                color="black"
                                                small
                                                outlined
                                                close
                                                @click:close="delPort(item.service_port,index)"
                                                v-for="(port,index) in item.service_port"
                                                :key="index"
                                                >     
                                                <v-icon left>
                                                    mdi-label
                                                </v-icon>                                   
                                                {{ port }}
                                            </v-chip>
                                        </div>                                  
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-row align="center" style="height:100%">
                                            <v-col>
                                                <v-btn                                        
                                                    color="primary"
                                                    fab
                                                    small
                                                    dark  
                                                    class="ma-1" 
                                                    @click="savePolicy"                                                                                        
                                                >
                                                <v-icon>
                                                    mdi-content-save
                                                </v-icon> 
                                                                                       
                                            </v-btn>
                                            
                                            
                                                <v-btn
                                                    fab
                                                    small
                                                    dark 
                                                    class="ma-1" 
                                                    @click="clear"                                                
                                                color="error"
                                            >
                                                <v-icon>
                                                    mdi-cancel
                                                </v-icon>
                                            </v-btn>
                                            </v-col>
                                        </v-row>                                           
                                    </template>      
                            </v-data-table>
                            
                            <v-data-table
                                id="tbPolicy"
                                :headers="policy_headers"
                                :items="policy_list"
                                :items-per-page="10"
                                @current-items="test"
                                class="elevation-1"    
                                                                                          
                            >
                            <template v-slot:item.source="{ item,index }">  
                                                          

                               <v-row v-for="(s,i) in getArray(item.source)" :key="i">
                                        <v-col>{{s.asset}}</v-col>
                                        <v-col>
                                            <p v-for="(ip,x) in s.ip_address" :key="x">
                                                {{ip}}
                                            </p>
                                        </v-col>
                                    </v-row> 
                            </template>  
                                <template v-slot:item.destination="{ item,index }">
                                    <v-row v-for="(s,i) in getArray(item.destination)" :key="i">
                                        <v-col>{{s.asset}}</v-col>
                                        <v-col>
                                            <p v-for="(ip,x) in s.ip_address" :key="x">
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
                                            v-for="(port,index) in getArray(item.service_port)"
                                            :key="index"
                                            >     
                                            <v-icon left>
                                                mdi-label
                                            </v-icon>                                   
                                            {{ port }}
                                        </v-chip>
                                    </div>                                  
                                </template>
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
                    <v-row  justify="center">
                        <v-col cols="12 text-center">
                            <v-btn
                                
                                color="primary"
                                rounded
                                dark                
                                dense
                                @click="submit"
                            >
                                <v-icon left>
                                    mdi-content-save-outline
                                </v-icon>
                                บันทึก
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>                   
            <my-alert :AlertType="show_alert"></my-alert>
        </v-col>
    </v-row>
</template>

<script>
import AssetEdit from './Request//AssetEdit.vue'
import Swal from 'sweetalert2';

import NewAlert from '@/components/NewAlert';
import axios from 'axios'
import { required, max, digits, regex, excluded} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
...required,
message: 'กรุณาใส่ข้อมูล',
})
extend('excluded', {
...excluded,
message: 'กรุณาเลือกข้อมูล',
})
extend('max', {
...max,
message: 'ความยาวไม่เกิน {length} ตัวอักษร',
})
extend('digits', {
    ...digits,
    message: 'ใส่ได้เฉพาะตัวเลข และจำนวน {length} หลัก',
})
extend('regex', {
    ...regex,
    message: 'รูปแบบข้อมูลไม่ถูกต้อง',
})
export default {
    props: ['edit_policy','policy_status'],
    components:{
        'asset-edit' : AssetEdit,
        'new-alert':NewAlert,
        // 'my-alert':MyAlert,
        ValidationProvider,
        ValidationObserver
    },
    data(){
        return {
            policy_name: '',
            menu_test: false,
            menu_source: false,
            menu_destination: false,
            dialog:false,
            dialog_source:false,
            singleSelect: false,
            selected: [],
            source_select:[],
            destination_select:[],
            service_port_select:[],
            search: '',
            status: 'new',
            select_index: null,
            col_l: 3,
            col_r: 9,
            
            headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-1', 'white--text', 'head-text'],
                    width: '30%'
                },
                { text: 'Destination',align: 'start', sortable: false, sortable: false, value: 'destination', class: ['blue darken-1', 'white--text'],width: '30%'},       
                { text: 'Service/Port',align: 'start', sortable: false, value: 'service_port', class: ['blue darken-1', 'white--text'],width: '25%'},                       
                { text: 'Action',align: 'center', sortable: false, value: 'actions',class: ['blue darken-1', 'white--text'],width: '15%'}                       
                            
            ],
            policy_headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '25%'
                },
                { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text'],width: '30%'},       
                { text: 'Service/Port', value: 'service_port', sortable: false, class: ['blue darken-3', 'white--text'],width: '20%'},                       
                { text: 'Tags', value: 'tags', sortable: false, class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'Action', value: 'actions', sortable: false,class: ['blue darken-3', 'white--text'],width: '10%'}                       
                            
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
            policy_list_edit:[],
            policy_list:[],
            policy:{
                source: [],
                destination: [],
                service_port:[],
                
            },
            policy_edit:{
                source: [],
                destination: [],
                service_port:[],
                
            },
            equip_list: [],
            people_list: [],
            source_list:[],
            destination_list:[],
            service_port_list:[],
            group_id: 1,
            show_alert: ''
        }
    },
    mounted() {
        this.status = this.policy_status;
        if (this.edit_policy){  
            this.policy_name = this.edit_policy.policy_name;          
            this.policy_list = JSON.parse(JSON.stringify(this.edit_policy.policy_detail));
        }
    },
    watch: {
        policy_status(){
            this.status = this.policy_status;
        },
        edit_policy(){
            console.log('edit')
            this.status = this.policy_status;
            if (this.edit_policy){  
                this.policy_name = this.edit_policy.policy_name;          
                this.policy_list = JSON.parse(JSON.stringify(this.edit_policy.policy_detail));
            }
        }
    },
    methods: {
        getArray(item){
            try {
                
                return JSON.parse(item);    
            } catch (error) {
                console.log(error);
                return [];
            }
            
        },
        delPort(item,index){
            item.splice(index,1);
        },
        clear(){
            this.status = 'new';
            this.source_select = [];
            this.destination_select = [];
            this.service_port_select = [];
            this.policy = JSON.parse(JSON.stringify(this.policy_edit));
            
            this.policy_list_edit = [];
            this.select_index = null;            
        },
        clearAll(){
            this.status = 'new';
            this.source_select = [];
            this.destination_select = [];
            this.service_port_select = [];
            this.policy = JSON.parse(JSON.stringify(this.policy_edit));
            this.policy_list = [];
            this.policy_list_edit = [];
            this.select_index = null;            
        },
        create_new(){
            if (this.policy_list_edit.length>0)      {
                this.policy_list_edit = [];
            }
            let policy = JSON.parse(JSON.stringify(this.policy));
            this.policy_list_edit.push(policy);                      
        },
        add_source(item){
            this.dialog_source = true;
        },
        create_list(){
            
        },
        test(item){
            //console.log(item);
        },
        editPolicy(item,index){
            this.clear();
            this.status = 'edit';
            this.select_index = index;
            
            this.policy_list_edit = [];
            this.policy_list_edit.push({
                id: item.id,                
                source: this.getArray(item.source),
                destination: this.getArray(item.destination),
                service_port: this.getArray(item.service_port)
            })
        },
        updateSource(obj){
            
            let index = obj.index;
            
            let selected = obj.value;
            this.policy_list_edit[index].source = selected;
        },
        updateDestination(obj){
            
            let index = obj.index;            
            let selected = obj.value;
            if (selected){
                this.policy_list_edit[index].destination = selected;
                this.updatePort(selected);
            }
            
        },
        updatePort(dest){
            
            if (dest.length>0){
                this.service_port_select = [];                
                this.service_port_list = [];
                //this.policy_list_edit[0].service_port = [];
                let port = [];
                if (dest.length > 1){
                    for (let i=0;i<dest.length;i++){
                        for (let j=0;j<dest[i].service_port.length;j++){
                            port.push(dest[i].service_port[j]);
                        }
                    }
                    let tmp = [];
                    tmp = Array.from(new Set(port));
                    let count = 0;
                    for (let i=0;i<tmp.length;i++){
                        count = port.filter(x=>x==tmp[i]).length;
                        if (count > 1){
                            this.service_port_list.push(tmp[i]);
                        }
                    }
                }else{
                    this.service_port_list = dest[0].service_port;
                }
                // if (this.policy_list_edit && this.policy_list_edit[0].service_port.length>0){
                //     let port = this.policy_list_edit[0].service_port;
                //     let count = 0;
                //     for (let i=0;i<port;i++){
                //         count = this.service_port_list.filter(x=>x == port[i]).length;
                //         if (count == 0){
                //             this.$delete(this.policy_list_edit[0].service_port,this.policy_list_edit[0].service_port.indexOf(x=>x == port[i]));
                //         }

                //     }
                // }
            }
            
            
            //this.service_port_list = tmp;

        },
        savePolicy(){
            if (this.policy_list_edit.length > 0){

                let policy = [];
                policy = JSON.parse(JSON.stringify(this.policy_list_edit[0]));
                let source = this.policy_list_edit[0].source;
                let dest = this.policy_list_edit[0].destination;
                let port = this.policy_list_edit[0].service_port;
                
                if (source.length > 0 && dest.length > 0 && port.length > 0){
                    
                    if (this.status == 'new'){
                        // this.$nextTick(()=>{
                        this.policy_list.push(policy);
                        this.clear();
                        // })
                        
                    }else if (this.status == 'edit'){
                        this.$nextTick(()=>{
                            console.log('status ' + this.status);
                            console.log('select_index ' + this.select_index);
                            //this.policy_list[this.select_index] = policy;
                            this.$set(this.policy_list,this.select_index,policy);
                            this.clear();
                        })
                        
                    }
                }else{
                    console.log('no');
                }
            }
        },
        deletePolicy(item,index){

        },
        async submit(){
            console.log('name ' + this.policy_name);
            if (this.policy_name != ''){
                let path = await `/api/groups/${this.group_id}/policies`;
                if (this.status == 'new'){
                    let response = await axios.post(`${path}`,{
                        policy_name: this.policy_name,
                        updated_date: new Date().toISOString().substr(0, 10),                        
                    })
                    this.show_alert = await 'success';
                    this.status = await 'edit';
                }
            }
        }
    }
}
</script>

<style scoped>
.text-start {
  border: 3px solid black!important;
  vertical-align: top!important;
}
.v-btn--fab.v-size--x-small{
    height: 25px!important;
    width: 25px!important;
}
.v-select__selections{
    max-width: 250px!important;
}
thead>tr>th{
    font-size: 2em!important;
}
.menuable__content__active{
    
    background-color: #ffffff;
   max-height: 350px!important;
}
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>td{
    vertical-align: top!important;
}
.v-data-table__wrapper>table>tbody>tr>td{
    vertical-align: top!important;

}
#tbPolicy.col{
    padding: 2px!important;
}

</style>>

</style>