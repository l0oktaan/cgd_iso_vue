<template>
    <v-row>
        <v-col>
            <v-data-table
                id="tbPolicyTemplate"
                :headers="headers"
                :items="policy_list"
                :items-per-page="10"
                :search="search"
                class="elevation-1"
                :loading="loadTable"
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
                        max-width="1200"
                        v-model="policy_dialog"
                    >
                        
                        <template v-slot:default="dialog">
                            <v-card>      
                                <v-card-title>
                                    <span> รายละเอียด Policy Firewall</span>
                                </v-card-title>                      
                                <v-card-text class="mt-4">
                                    <!-- <policy-detail 
                                        ref="request_firewall"
                                        :edit_policy="policy_edit"
                                        :policy_status="policy_status"
                                    ></policy-detail> -->
                                    <policy-detail
                                        ref="request_firewall"
                                        :policy_id="policy_id"
                                        @close_dialog="close_dialog"
                                    >
                                    </policy-detail>                                    
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
                        @click="addPolicy"                                               
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
            <template v-slot:item.updated_date="{ item,index }">                            
                {{getThaiDate(item.updated_date)}}
            </template>
                
                <template v-slot:item.actions="{ item,index }">
                    <v-btn
                        class="mr-2"                                            
                        outlined
                        x-small
                        fab
                        color="primary"
                        @click="editPolicy(item,index)"
                        >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn     
                                                            
                        fab
                        dark
                        x-small
                        color="error"
                        
                        @click="deletePolicy(item.id)"
                        >
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                
            </template>
            </v-data-table>
            
        </v-col>
    </v-row>
</template>

<script>

import PolicyDetail from '../components/PolicyDetail'
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
    components:{
        'policy-detail' : PolicyDetail,
        'new-alert':NewAlert,
        // 'my-alert':MyAlert,
        ValidationProvider,
        ValidationObserver

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
                    width: '50%'
                },
                {
                    text: 'ผู้ปรับปรุง',
                    align: 'start',                    
                    value: 'updated_by',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '20%'
                },
                { text: 'Action',align: 'center', sortable: false, value: 'actions',class: ['blue darken-3', 'white--text'],width: '20%'}                       
                            
            ],
            policy_template_list: [],
            policy_edit: [],
            policy_list: [],
            policy_id: null,
            group_id: this.$store.getters.group_id,
            show_alert: '',
            policy_status: 'new',
            loadTable: true,
            user: this.$store.getters.user
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            let path = await `/api/groups/${this.group_id}/policies`;
            let response = await axios.get(`${path}`);
            this.policy_list = await response.data.data;
            this.loadTable = await false;
        },
        editPolicy(item,index){
            // this.policy_status = 'edit';
            // this.$nextTick(()=>{
            //     this.policy_edit = JSON.parse(JSON.stringify(item));
            // this.policy_dialog =true;
            // })
            this.$nextTick(()=>{
                this.policy_id = item.id;
            console.log('id ' + this.policy_id);
            this.policy_dialog = true;
            })
            
            
        },
        addPolicy(){
            this.policy_id= 0;
            this.policy_dialog = true;
            
        },        
        deletePolicy(id){
            
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
                    let path = `/api/groups/${this.group_id}/policies/${id}`;
                    axios.delete(`${path}`)
                    .then(resposne=>{
                        this.show_alert = "success"
                        this.fetchData();                        
                    })
                    .catch(error=>{
                        this.show_alert = "error"
                    })
                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                }
            })
            

            

        },
        close_dialog(){
            this.$refs.request_firewall.clearAll();
            this.policy_edit= [],
            this.policy_id = null;
            this.fetchData();
            this.policy_dialog = false;
        },
        getThaiDate(item){
            if (item){
                var d = new Date(item);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
            }else{
                return "";
            }            
        },
    }
}
</script>

<style>

</style>