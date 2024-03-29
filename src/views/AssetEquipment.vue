<template>
    <v-container>        
        <v-row>
            <v-col>
                <v-card
                elevation="4"
                >
                <v-data-table
                    :headers="headers"
                    :items="equip_list"
                    :items-per-page="15"
                    :search="search"
                    class="elevation-1"            
                    v-if="equip_list"
                    :loading="loadTable"
                    
                    >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                        <v-toolbar-title>
                            <v-icon large>mdi-server</v-icon>
                            รายการอุปกรณ์</v-toolbar-title> 
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
                                >
                                <v-icon left>
                                mdi-plus
                                </v-icon>
                                เพิ่มรายการใหม่
                                </v-btn>
                            </template>
                            <validation-observer
                                ref="observer"
                                v-slot="{ invalid }"
                            >
                            <v-form @submit.prevent="submit">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-server</v-icon>ข้อมูลรายการอุปกรณ์</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่ออุปกรณ์ :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="equip_name"
                                                rules="required"
                                            >
                                            <v-text-field      
                                                v-model="equip_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                                :error-messages="errors"
                                                data-vv-name="equip_name"
                                            ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>                        
                                    <v-row>
                                        <v-col cols="4 text-right">IP Address :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="ip_address"
                                                rules="required"                                                
                                            >
                                            <v-combobox multiple
                                                v-model="ip_address" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                :error-messages="errors"
                                                data-vv-name="ip_address"
                                                >
                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        
                                                        close
                                                        color="primary"
                                                        small
                                                        label
                                                        outlined
                                                        :key="JSON.stringify(data.item)"
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"                                        
                                                        @click:close="data.parent.selectItem(data.item)"
                                                        >                                        
                                                        {{ data.item }}
                                                    </v-chip>
                                                </template>
                                            </v-combobox>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">Port/Service :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="service_port"
                                                rules="required"                                                
                                            >
                                            <v-combobox multiple
                                                v-model="service_port" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                :error-messages="errors"
                                                data-vv-name="service_port"
                                                >
                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        
                                                        close
                                                        color="deep-orange"
                                                        dark
                                                        small
                                                        :key="JSON.stringify(data.item)"
                                                        v-bind="data.attrs"
                                                        :input-value="data.selected"                                        
                                                        @click:close="data.parent.selectItem(data.item)"
                                                        >                                        
                                                        {{ data.item }}
                                                    </v-chip>
                                                </template>
                                            </v-combobox>  
                                            </validation-provider>                          
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">Tag :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="equip_tags" 
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
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        
                                        <v-col cols="12 text-center">
                                            <v-btn
                                                    class="ma-3"
                                                    rounded
                                                    color="primary"
                                                    :disabled="invalid"
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
                                                    mdi-arrow-u-left-top-bold
                                                </v-icon>
                                                ออก
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-form>
                            </validation-observer>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
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
                    <template v-slot:item.equip_name="{ item }">                        
                        <v-icon class="mr-1" small>mdi-server</v-icon>
                        {{ item.equip_name }}
                        
                    </template>
                    <template v-slot:item.ip_address="{ item }">
                        <v-chip  
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small
                            v-for="(ip,index) in getArray(item.ip_address)"  
                            :key="index"
                            dark
                        >
                        {{ ip }}
                        </v-chip>
                    </template>
                    <template v-slot:item.service_port="{ item }">
                        <v-chip  
                            color="deep-orange"   
                            class="ma-1"
                            small
                            v-for="(port,index) in getArray(item.service_port)"               
                            :key="index"
                            dark
                        >
                        {{ port }}
                        </v-chip>
                    </template>
                    <template v-slot:item.equip_tags="{ item }">
                        <v-chip  
                            color="black"   
                            class="ma-1"
                            small

                            v-for="(tags,index) in getArray(item.equip_tags)"               
                            :key="index"
                            outlined
                        >
                        <v-icon left>
                            mdi-label
                        </v-icon>
                        {{ tags }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn
                            class="mr-2"                                            
                            outlined
                            x-small
                            fab
                            color="primary"
                            @click="editItem(item)"
                            >
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn     
                                                                
                            fab
                            dark
                            x-small
                            color="error"
                            
                            @click="deleteItem(item.id)"
                            >
                            <v-icon>
                                mdi-close
                            </v-icon>
                        </v-btn>
                        
                    </template>            
                    </v-data-table>
                </v-card>
            </v-col>
    </v-row>
    <my-alert :AlertType="show_alert"></my-alert>
    </v-container>
</template>

<script>
import Swal from 'sweetalert2';

import NewAlert from '@/components/NewAlert';
import axios from 'axios'
import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
...required,
message: 'กรุณาใส่ข้อมูล',
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
    components: {
        'new-alert':NewAlert,
        // 'my-alert':MyAlert,
      ValidationProvider,
      ValidationObserver    
        
    },
    data(){
        return{
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'ชื่ออุปกรณ์',
                    align: 'start',
                    // sortable: false,
                    value: 'equip_name',
                    class: ['red darken-4', 'white--text', 'head-text'],
                    width: '20%'
                },
                { text: 'IP Address', value: 'ip_address', class: ['red darken-4', 'white--text'],width: '30%'},       
                { text: 'Port / Service', sortable: false, value: 'service_port', class: ['red darken-4', 'white--text'],width: '20%'},       
                { text: 'Tags', sortable: false, value: 'equip_tags', class: ['red darken-4', 'white--text'],width: '20%'},
                { text: 'Action', value: 'actions',class: ['red darken-4', 'white--text']}                       
                            
            ],
            equip_list: [],
            status: 'new',
            equip_id: 0,
            equip_name: '',
            ip_address: [],
            service_port: [],
            equip_tags: [],
            search: '',
            show_alert: '',
            group_id: this.$store.getters.group_id,
            loadTable: true
        }
    },
    mounted(){
        this.fetchData();
    },
    methods: {
        invalid(){
            this.$validator.validateAll();
        },
        async fetchData(){
            let path = await `/api/groups/${this.group_id}/asset_equipments`;
            try {
                let response = await axios.get(path);
                this.equip_list = await response.data.data;
                this.loadTable = await false;
            } catch (error) {
                console.log(error);
            }
        },
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
        },
        getFiltered(e){
            console.log(e) //output the filtered items
        },
        processTags($event){ 
            console.log($event.target.value);
            if ($event.target.value == '0'){
                $event.preventDefault();
            }
            
        },
        add_equip(){
            this.dialog = true;
        },
        editItem(item){
            this.status = 'edit';
            this.equip_id = item.id;
            this.equip_name = item.equip_name;
            this.ip_address = JSON.parse(item.ip_address);
            this.service_port = JSON.parse(item.service_port);
            this.equip_tags = JSON.parse(item.equip_tags);
            this.description = item.description;
            this.dialog = true;
        },
        deleteItem(id){
            this.equip_id = id;
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
                    let path = `/api/groups/${this.group_id}/asset_equipments/${id}`;
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
        deleteItemConfirm(id){

        },
        closeDelete() {
            this.dialogDelete = false
        },
        async submit(){
            let path = await `/api/groups/${this.group_id}/asset_equipments`;
            console.log(this.status);
            if (this.status == 'new'){ 
                try {
                    let response = await axios.post(`${path}`,{
                        "ip_address" : JSON.stringify(this.ip_address),
                        "equip_name" : this.equip_name,
                        "service_port" : JSON.stringify(this.service_port),
                        "equip_tags" : JSON.stringify(this.equip_tags),                    
                        "description" : this.description
                    })
                    this.show_alert = await 'success';
                    await this.fetchData();
                    await this.clear();
                    
                } catch (error) {
                    this.show_alert = 'error';
                }
            }else if (this.status == 'edit'){
                try {
                    await axios.put(`${path}/${this.equip_id}`,{
                        "ip_address" : JSON.stringify(this.ip_address),
                        "equip_name" : this.equip_name,
                        "service_port" : JSON.stringify(this.service_port),
                        "equip_tags" : JSON.stringify(this.equip_tags),                    
                        "description" : this.description
                    })
                    this.show_alert = await 'success';
                    await this.fetchData();
                    await this.clear();
                    
                    
                } catch (error) {
                    
                }
            }
        },
        clear(){
            this.status = 'new';
            this.equip_id = '';
            this.equip_name = '';
            this.ip_address = [];
            this.service_port = [];
            this.equip_tags = [];
            this.description = '';            
            this.show_alert = '';
            this.dialog = false;
        }
    }
}
</script>

<style scoped>
.v-input--selection-controls{
    margin: 0!important;
}
.col{
    padding: 8px!important;
}
.v-chip--select{
    vertical-align: middle!important;
}
</style>>

