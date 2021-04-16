<template>
<v-container>        
        <v-row>
            <v-col>
                <v-card
                elevation="4"
                >
                <v-data-table
                    :headers="headers"
                    :items="user_list"
                    :items-per-page="15"
                    :search="search"
                    class="elevation-1"            
                    v-if="user_list"
                    :loading="loadTable"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                        <v-toolbar-title>
                            <v-icon large>mdi-card-account-details</v-icon>
                            รายการผู้ใช้ระบบ</v-toolbar-title> 
                        <v-dialog
                            v-model="dialog"
                            width="650"
                            persistent
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="ma-2"
                                    rounded
                                    color="success"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="add_user"
                                >
                                <v-icon left>
                                mdi-plus
                                </v-icon>
                                เพิ่มผู้ใช้ใหม่
                                </v-btn>
                            </template>
                            <v-form @submit.prevent="submit">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-card-account-details</v-icon>ข้อมูลผู้ใช้ระบบ</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อผู้ใช้ :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="user.ldap"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อ :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="user.firstname"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>                                            
                                        </v-col>
                                    </v-row>   
                                    <v-row>
                                        <v-col cols="4 text-right">นามสกุล :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="user.lastname"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>                                            
                                        </v-col>
                                    </v-row>                     
                                    <v-row>
                                        <v-col cols="4 text-right">กลุ่มงาน :</v-col>
                                        <v-col>  
                                            <v-select
                                                outlined
                                                dense                                                
                                                v-model="user.group_id"
                                                :items="group_list_show"
                                                item-text="text"
                                                item-value="value"
                                                hide-details="auto" 
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">สิทธิ์ :</v-col>
                                        <v-col>                                            
                                            <v-combobox multiple
                                                v-model="user.roles" 
                                                :items="roles"
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                
                                                hide-details="auto"
                                                label="เลือกสิทธิ์"
                                                >
                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        class="mt-2"
                                                        close
                                                        small
                                                        color="primary"                                        
                                                        :key="JSON.stringify(data.item)"
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"                                        
                                                        @click:close="data.parent.selectItem(data.item)"
                                                        >
                                                        {{ data.item.text || data.item}}
                                                    </v-chip>
                                                </template>
                                            </v-combobox>                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">สถานะ :</v-col>
                                        <v-col>                                            
                                            <v-radio-group
                                                v-model="user.status"
                                                row
                                                dense
                                                mandatory
                                            >
                                                <v-radio
                                                    label="ปกติ"
                                                    :value="1"
                                                ></v-radio>
                                                <v-radio
                                                    label="ยกเลิก"
                                                    :value="0"
                                                ></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        
                                        <v-col cols="12 text-center">
                                            <v-btn
                                                    class="ma-3"
                                                    rounded
                                                    color="primary"
                                                    dark
                                                    type="submit"
                                                >
                                                    <v-icon left>
                                                        mdi-content-save-outline
                                                    </v-icon>
                                                    บันทึก
                                                </v-btn>
                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12 text-right">
                                            <v-btn
                                                text
                                                @click="clear"
                                                color="error"
                                            >
                                                <v-icon left>
                                                    mdi-cancel
                                                </v-icon>
                                                ยกเลิก
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-form>
                        </v-dialog>
                        <v-spacer></v-spacer>    
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา"
                            single-line
                            hide-details
                            max-width="300"
                        ></v-text-field>                
                        </v-toolbar>
                    </template>
                     <template v-slot:item.ldap="{ item }">                       
                        <v-icon class="mr-1" small>mdi-account</v-icon>
                        {{ item.ldap }}
                        
                    </template>
                    <template v-slot:item.firstname="{ item }">                       
                        
                        {{ item.firstname + ' ' + item.lastname }}
                        
                    </template>
                    <template v-slot:item.status="{ item }">                       
                        <v-chip  
                            :color="item.status == 1 ? 'success' : 'error'"                            
                            label
                            small                            
                            dark
                        >
                        {{ item.status == 1 ? 'ปกติ' : 'ยกเลิก'}}
                        </v-chip>
                        
                    </template>

                    <template v-slot:item.roles="{ item }">
                        <v-chip  
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small
                            v-for="(role,index) in getArray(item.roles)"               
                            :key="index"
                            dark
                        >
                        {{ role }}
                        </v-chip>
                    </template>
                    
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip 
                            top
                            color="black"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="mr-2"                                            
                                    outlined
                                    x-small
                                    fab
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="editItem(item)"
                                    >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>                                
                            </template>
                            <span>แก้ไข</span>
                        </v-tooltip>
                        
                        <!-- <v-btn
                            fab
                            dark
                            x-small
                            color="error"                            
                            @click="deleteItem(item.id)"
                            >
                            <v-icon>
                                mdi-close
                            </v-icon>
                        </v-btn>                         -->
                    </template>            
                    </v-data-table>
                </v-card>
                <my-alert :AlertType="show_alert"></my-alert>
                
            </v-col>
    </v-row>
    </v-container>
</template>

<script>
import Swal from 'sweetalert2';


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
    components:{        
        
        ValidationProvider,
        ValidationObserver
        

    },
    data(){
        return{
            search: '',
            headers: [
                { text: 'ชื่อผู้ใช้', sortable: true, value: 'ldap', class: ['blue darken-3', 'white--text'],width: '12%'},
                {
                    text: 'ชื่อ-นามสกุล',
                    align: 'start',
                    // sortable: false,
                    value: 'firstname',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '15%'
                },
                {
                    text: 'กลุ่มงาน',
                    align: 'start',
                    // sortable: false,
                    value: 'group_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '20%'
                },                
                { text: 'สิทธิ์', sortable: false, value: 'roles', class: ['blue darken-3', 'white--text'],width: '20%'},       
                { text: 'สถานะ', sortable: false, value: 'status', class: ['blue darken-3', 'white--text'],width: '8%'},      
                { text: 'Action', align: 'end',value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                        
                            
            ],
            user_list: [
                // { username : 'sudjit.lab', group_name: 'ITCD',user_type:'user', roles: ['ผู้อนุมัติ'],status:'ปกติ'},
                // { username : 'siriluk.sir', group_name: 'SECD',user_type:'admin', roles: ['ผู้รับรอง','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                // { username : 'chanathip.kea', group_name: 'SECD',user_type:'admin', roles: ['ผู้ร้องขอ','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                // { username : 'songwut.saj', group_name: 'SECD',user_type:'admin', roles: ['ผู้ร้องขอ','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                // { username : 'juntharut.ink', group_name: 'NETD',user_type:'user', roles: ['ผู้ร้องขอ','ผู้ดำเนินการ','ผู้ติดตาม'],status:'ปกติ'},
            ],
            user:{},
            group_list: [],
            group_list_show: [],
            loadTable: true,
            dialog : false,
            show_alert: '',
            status: 'new',
            roles : this.$store.getters.roles

        }

    },
    mounted(){
        this.getGroupList();
        this.fetchData();
    },
    methods: {
        processTags($event){ 
            console.log($event.target.value);
            if ($event.target.value == '0'){
                $event.preventDefault();
            }
            
        },
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }            
        },
        async getGroupList(){
            
            let path = await `/api/groups`;
            let response = await axios.get(`${path}`);
            let group = await response.data.data;
            console.log('get group :' + group.length);
            let list = [];
            list.push(
                {
                    text: 'เลือกหน่วยงาน',
                    value: 0,
                    type: 0
                }
            )
            
            for (let i=0;i<group.length;i++){
                list.push(
                    {
                        text: group[i].group_name,
                        value: group[i].id,
                        type: group[i].group_type
                    }
                )
            }
            this.group_list = JSON.parse(JSON.stringify(list));
            this.group_list_show = this.group_list.filter(x=>x.type == 1);
        },
        async fetchData(){
            let path = await `/api/user_details`;
            let response = await axios.get(`${path}`);
            this.user_list = await response.data.data;
            this.loadTable = await false;   
            // this.show_alert = "success";
        },
        async add_user(){
            this.status = 'new';
        },
        async submit(){
            let path = await `/api/user_details`;
            if (this.status == 'new'){
                let response = await axios.post(`${path}`,{
                    'ldap' : this.user.ldap,
                    'firstname' : this.user.firstname,
                    'lastname' : this.user.lastname,
                    'group_id' : this.user.group_id,
                    'roles' : JSON.stringify(this.user.roles),
                    'status' : this.user.status
                })
                let item = await response.data.data;
                this.user = await this.bind_user(item);
                this.status = await 'edit';
                this.show_alert = 'success';
                await this.fetchData();
            }else if (this.status == 'edit'){
                let response = await axios.put(`${path}/${this.user.id}`,{

                    'ldap' : this.user.ldap,
                    'firstname' : this.user.firstname,
                    'lastname' : this.user.lastname,
                    'group_id' : this.user.group_id,
                    'roles' : JSON.stringify(this.user.roles),
                    'status' : this.user.status
                })
                let item = await response.data.data;
                this.user = await this.bind_user(item);
                this.status = await 'edit';
                this.show_alert = 'success';
                await this.fetchData();
            }
        },
        async bind_user(item){
            
            return {                
                id : await item.id,
                ldap : await item.ldap,
                firstname : await item.firstname,
                lastname : await item.lastname,
                group_id : await item.group_id,
                roles : await JSON.parse(item.roles),
                status : await item.status,
            }
            
        },
        clear(){
            this.status = 'new';
            this.dialog = false;
            this.user = {};
        },
        async editItem(item){
            console.log('status :' + item.status);
            this.status = await 'edit';
            
            this.user = await this.bind_user(item);
            this.dialog = await true;
        },
        delete_item(id){

        }
    }
}
</script>

<style>

</style>