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
                                                   
                        </v-col>
                    </v-row>
                    <v-row v-if="policy_edit_id > 0">                        
                        <v-col cols="12" >                                              
                            <v-data-table                                
                                id="tbPolicyEdit"
                                :headers="headers"
                                :items="policy_list_edit"
                                :items-per-page="10"
                                @current-items="test"
                                class="elevation-1"  
                                :hide-default-header = "policy_list_edit.length == 0"
                                hide-default-footer 
                                   
                                no-data-text=""                             
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
                                        <v-col>{{s.ldap}}</v-col>
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
                                                class="ma-1"
                                                color="deep-orange darken-3"
                                                small
                                                dark
                                                close
                                                @click:close="delPort(item.service_port,index)"
                                                v-for="(port,index) in item.service_port"
                                                :key="index"
                                                >     
                                                                           
                                                {{ port }}
                                            </v-chip>
                                        </div>                                  
                                    </template>
                                    <template v-slot:item.tags="{ item,index }">
                                        <v-combobox multiple
                                                v-model="item.tags" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                @keydown.tab.prevent="processTags($event)"
                                                >
                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        
                                                        close
                                                        color="black"
                                                        small
                                                        outlined
                                                        :key="JSON.stringify(data.item)"
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"                                        
                                                        @click:close="data.parent.selectItem(data.item)"
                                                        
                                                        >     
                                                        <v-icon left>
                                                            mdi-label
                                                        </v-icon>                                   
                                                        {{ data.item }}
                                                    </v-chip>
                                                </template>
                                            </v-combobox>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-row align="center" style="height:100%">
                                            <v-col>
                                                <v-tooltip 
                                                    top
                                                    color="black"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-icon                    
                                                            class="mr-2"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="primary"
                                                            @click="savePolicy"
                                                        >
                                                            mdi-content-save
                                                        </v-icon>
                                                    </template>
                                                    <span>บันทึก</span>
                                                </v-tooltip>
                                                <v-tooltip 
                                                    color="red"
                                                    top
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-icon  
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            color="error"        
                                                            @click="clear"
                                                        >
                                                            mdi-cancel
                                                        </v-icon>
                                                    </template>
                                                    <span>ยกเลิก</span>
                                                </v-tooltip>
                                                
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
                                :loading="loadTable"
                                                                                          
                            >
                            <template v-slot:item.source="{ item,index }">  
                                                          

                               <v-row v-for="(s,i) in getArray(item.source)" :key="i">
                                        <v-col>{{s.asset}}</v-col>
                                        <v-col>{{s.ldap}}</v-col>
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
                                        
                                            color="deep-orange darken-3"
                                            class="ma-1"
                                            small
                                            dark
                                            v-for="(port,index) in getArray(item.service_port)"
                                            :key="index"
                                            >     
                                                                              
                                            {{ port }}
                                        </v-chip>
                                    </div>                                  
                                </template>
                                <template v-slot:item.tags="{ item,index }">
                                        <v-chip   
                                            class="ma-1"                                         
                                            color="black"
                                            small
                                            outlined
                                            v-for="(tag,i) in getArray(item.tags)"
                                            :key="i"
                                        >     
                                            <v-icon left>
                                                mdi-label
                                            </v-icon>                                   
                                            {{ tag }}
                                        </v-chip>
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
    props: ['policy_id'],
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
                { text: 'Destination',align: 'start', sortable: false, sortable: false, value: 'destination', class: ['blue darken-1', 'white--text'],width: '25%'},       
                { text: 'Service/Port',align: 'start', sortable: false, value: 'service_port', class: ['blue darken-1', 'white--text'],width: '20%'},                       
                { text: 'Tags', value: 'tags', sortable: false, class: ['blue darken-1', 'white--text'],width: '15%'},                       
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
                { text: 'LDAP', sortable: false, value: 'ldap', class: ['blue darken-3', 'white--text']},
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
            
            policy_edit:{
                id: 0,
                source: [],
                destination: [],
                service_port:[],
                tags: []
            },
            policy_detail:{
                id:0,
                source: [],
                destination: [],
                service_port:[],
                tags: []
            },
            equip_list: [],
            people_list: [],
            source_list:[],
            destination_list:[],
            service_port_list:[],
            group_id: 1,
            show_alert: '',
            policy_edit_id: null,
            policy: null,
            policy_status: 'new',
            loadTable: true,
            loadEditTable: true,
            user: this.$store.getters.user
        }
    },
    async mounted() {
        this.policy_edit_id = await this.policy_id;
        await this.$store.dispatch('get_equip_list');
        await this.$store.dispatch('get_people_list');
        await this.getAsset();
    },
    watch: {        
        policy_id(){
            console.log('policy id :' + this.policy_id);
            if (this.policy_id){
                console.log('edit policy id :' + this.policy_id);
                this.policy_edit_id = this.policy_id;                
            }
        },
        policy_edit_id(){
            if (this.policy_edit_id){
                console.log('policy edit id :' + this.policy_edit_id);
                if (this.policy_edit_id > 0){
                    this.policy_status = 'edit'
                    this.fetchData();
                }else{
                    this.policy_status = 'new'
                }
            }
        }
    },
    methods: {
        getArray(item){
            if (item){
                try {                
                    return JSON.parse(item);    
                } catch (error) {
                    console.log(error);
                    return [];
                }
            }else{
                return [];
            }
            
            
        },
        async fetchData(){
            let path = await `/api/groups/${this.group_id}/policies/${this.policy_edit_id}`;
            let response = await axios.get(`${path}`);
            this.policy =  await response.data.data[0];
            this.policy_name =  await this.policy.policy_name;
            this.policy_list =  await this.policy.policy_detail;
            this.loadTable = await false;
        },
        async getAsset(){
            let equip = await this.$store.getters.equip_list;
            let people = await this.$store.getters.people_list;
            
            this.source_list = [];
            this.destination_list = [];
            for (let i=0;i<equip.length;i++){
                await this.source_list.push({
                    code : 'equip_' + (i+1),
                    asset : equip[i].equip_name,                    
                    ldap : '',
                    ip_address : JSON.parse(equip[i].ip_address),
                    tags : JSON.parse(equip[i].equip_tags)
                })
                await this.destination_list.push({
                    code : 'equip_' + (i+1),
                    asset : equip[i].equip_name,
                    ip_address : JSON.parse(equip[i].ip_address),
                    service_port : JSON.parse(equip[i].service_port),
                    tags : JSON.parse(equip[i].equip_tags)
                })
            }
            for (let i=0;i<people.length;i++){
                await this.source_list.push({
                    code : 'people_' + (i+1),
                    asset : people[i].people_name,                    
                    ldap : people[i].ldap_name,
                    ip_address : JSON.parse(people[i].ip_address),
                    tags : JSON.parse(people[i].people_tags)
                })
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
            
            this.source_select = [];
            this.destination_select = [];
            this.service_port_select = [];
            this.policy = JSON.parse(JSON.stringify(this.policy_edit));
            this.policy_list = [];
            this.policy_list_edit = [];
            this.select_index = null;  
            this.policy_name = '' ;
            this.policy_edit_id = null;         
        },
        async create_new(){
            
            if (this.policy_list_edit.length > 0)      {
                this.policy_list_edit = await [];
            }
            let policy =  await JSON.parse(JSON.stringify(this.policy_detail));
            await this.policy_list_edit.push(policy);
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
                service_port: this.getArray(item.service_port),
                tags:this.getArray(item.tags),
            })
            this.loadEditTable = false;
        },
        updateSource(obj){         
            console.log('up source');
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
        async savePolicy(){
            if (this.policy_list_edit.length > 0){

                let policy = [];
                policy = await JSON.parse(JSON.stringify(this.policy_list_edit[0]));
                let source = await this.policy_list_edit[0].source;
                let dest = await this.policy_list_edit[0].destination;
                let port = await this.policy_list_edit[0].service_port;
                let tags = await this.policy_list_edit[0].tags;
                console.log('tag :' + tags);
                if (source.length > 0 && dest.length > 0 && port.length > 0){
                    
                    if (this.status == 'new'){
                        // this.$nextTick(()=>{
                        let path = await `/api/groups/${this.group_id}/policies/${this.policy_edit_id}/policy_details`;
                        let response = await axios.post(`${path}`,{
                            source : JSON.stringify(source),
                            destination : JSON.stringify(dest),
                            service_port : JSON.stringify(port),
                            tags : JSON.stringify(tags),
                            updated_date: new Date().toISOString().substr(0, 10),
                        })
                        let detail = response.data.data;
                        this.show_alert = await 'success';
                        this.status = await 'edit';
                        this.policy_list_edit[0].id = await detail.id
                        await this.fetchData();
                        
                        await this.clear();
                        
                        
                    }else if (this.status == 'edit'){
                        let path = await `/api/groups/${this.group_id}/policies/${this.policy_edit_id}/policy_details/${this.policy_list_edit[0].id}`;
                        let response = await axios.put(`${path}`,{
                            source : JSON.stringify(source),
                            destination : JSON.stringify(dest),
                            service_port : JSON.stringify(port),
                            tags : JSON.stringify(tags),
                            updated_date: new Date().toISOString().substr(0, 10),
                        })
                        let detail = response.data.data;
                        this.show_alert = await 'success';
                        this.status = await 'edit';
                        this.policy_list_edit[0].id = await detail.id
                        await this.fetchData();
                        
                        await this.clear();
                    }
                }else{
                    console.log('no');
                }
            }
        },
        processTags($event){ 
            console.log($event.target.value);
            if ($event.target.value == '0'){
                $event.preventDefault();
            }
            
        },
        async deletePolicy(item,index){
            Swal.fire({
                title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",                
                icon: "warning",
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: `ยืนยัน`,
                cancelButtonText: `ยกเลิก`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    let path = `/api/groups/${this.group_id}/policies/${this.policy_edit_id}/policy_details/${item.id}`;
                    axios.delete(`${path}`)
                    .then(resposne=>{
                        this.show_alert = "success"
                        this.fetchData();
                        this.clear();
                    })
                    .catch(error=>{
                        this.show_alert = "error"
                    })
                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                }
            })
            
            
        },
        async submit(){
            
            if (this.policy_name != ''){
                let path = await `/api/groups/${this.group_id}/policies`;
                if (this.policy_status == 'new'){
                    let response = await axios.post(`${path}`,{
                        policy_name: this.policy_name,
                        updated_date: new Date().toISOString().substr(0, 10), 
                        updated_by: this.user.username                       
                    })
                    let policy = response.data.data;
                    this.policy_edit_id = policy.id;
                    this.policy_name = policy.policy_name;
                    // this.policy_list = policy.policy_detail;
                    this.show_alert = await 'success';
                    this.policy_status = await 'edit';
                }else if (this.policy_status == 'edit'){
                    let response = await axios.put(`${path}/${this.policy_edit_id}`,{
                        policy_name: this.policy_name,
                        updated_date: new Date().toISOString().substr(0, 10),  
                        updated_by: this.user.username                      
                    })                    
                    // this.policy_list = policy.policy_detail;
                    this.show_alert = await 'success';
                    this.policy_status = await 'edit';
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