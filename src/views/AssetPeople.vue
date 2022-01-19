<template>
    <v-container>        
        <v-row>
            <v-col>
                <v-card
                elevation="4"
                >
                <v-data-table
                    :headers="headers"
                    :items="people_list"
                    :items-per-page="15"
                    :search="search"
                    class="elevation-1"                               
                    :loading="loadTable"
                    >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                        <v-toolbar-title>
                            <v-icon large>mdi-account-multiple</v-icon>
                            รายการบุคลากร</v-toolbar-title> 
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
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-account-multiple</v-icon>ข้อมูลรายการบุคลากร</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อ-นามสกุล :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="people_name"
                                                rules="required"
                                            >
                                            <v-text-field      
                                                v-model="people_edit.people_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                                :error-messages="errors"
                                                data-vv-name="people_name"
                                            ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อ AD :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="ldap_name"
                                                rules="required"
                                            >
                                            <v-text-field      
                                                v-model="people_edit.ldap_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                                :error-messages="errors"
                                                data-vv-name="ldap_name"
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
                                                v-model="people_edit.ip_address" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                @keydown.tab.prevent="processTags($event)"
                                                :error-messages="errors"
                                                data-vv-name="ip_address"
                                                >
                                                <template v-slot:selection="data">
                                                    <v-chip
                                                        
                                                        close
                                                        color="primary"
                                                        small
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
                                        <v-col cols="4 text-right">ประเภทบุคลากร :</v-col>
                                        <v-col>
                                            <v-radio-group
                                                v-model="people_edit.people_type"
                                                row
                                                @change="changeType"
                                                >
                                                <v-radio
                                                    label="เจ้าหน้าที่กรม"
                                                    :value="1"
                                                ></v-radio>
                                                <v-radio
                                                    label="เจ้าหน้าที่บริษัท"
                                                    :value="2"
                                                ></v-radio>
                                            </v-radio-group>                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">หน่วยงาน :</v-col>
                                        <v-col>      
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="org_name"
                                                rules="required|excluded:0"
                                            >                                                                                
                                            <v-select
                                                outlined
                                                dense
                                                
                                                v-model="people_edit.org_name"
                                                :items="group_list_show"
                                                item-text="text"
                                                item-value="text" 
                                                :error-messages="errors"
                                                data-vv-name="org_name"                                                                                              
                                            ></v-select>  
                                            </validation-provider>                                        
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">Tag :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="people_edit.people_tags" 
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
                                                    
                                                    type="submit"
                                                    :disabled="invalid"
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
                    <template v-slot:item.people_name="{ item }">                        
                        <v-icon class="mr-1" small>mdi-account</v-icon>
                        {{ item.people_name }}
                        
                    </template>
                    <template v-slot:item.people_type="{ item }">                        
                        
                        {{ item.people_type == 1 ? 'เจ้าหน้าที่กรม' : 'เจ้าหน้าที่บริษัท' }}
                        
                    </template>
                    <template v-slot:item.ip_address="{ item }">
                        <v-chip  
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small                            
                            dark
                            v-for="(ip,index) in getArray(item.ip_address)" 
                            :key="index"
                        >
                        {{ ip }}
                        </v-chip>
                    </template>
                    
                    <template v-slot:item.people_tags="{ item }">
                        <v-chip  
                            color="black"   
                            class="ma-1"
                            small

                            v-for="(tags,index) in getArray(item.people_tags)" 
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
            <my-alert :AlertType="show_alert"></my-alert>
    </v-row>
    </v-container>
</template>

<script>
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
                    text: 'ชื่อ - นามสกุล',
                    align: 'start',
                    // sortable: false,
                    value: 'people_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '20%'
                },
                {
                    text: 'AD',
                    align: 'start',
                    // sortable: false,
                    value: 'ldap_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '10%'
                },
                { text: 'ประเภท', sortable: false, value: 'people_type', class: ['blue darken-3', 'white--text'],width: '10%'},       
                { text: 'IP Address', value: 'ip_address', class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'หน่วยงาน', sortable: false, value: 'org_name', class: ['blue darken-3', 'white--text'],width: '20%'},
                { text: 'Tags', sortable: false, value: 'people_tags', class: ['blue darken-3', 'white--text']},
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '15%'}                       
                            
            ],
            people_list: [],
            group_list: [],
            group_list_show: [],
            status: 'new',
            people_default: {
                people_id: 0,
                people_name: '',
                ldap_name: '',
                people_type: 1,
                ip_address: '',
                org_name: '',
                people_tags: [],
                description: ''
            },
            people_edit: {
                people_id: 0,
                people_name: '',
                ldap_name: '',
                people_type: 1,
                ip_address: [],
                org_name: '',
                people_tags: [],
                description: ''
            },
            search: '',
            group_id: this.$store.getters.group_id,
            show_alert: '',
            loadTable: true

        }
    },
    mounted(){
        this.getGroupList();
        this.fetchData();
    },
    
    methods: {
        changeType(e){
            this.group_list_show = this.group_list.filter(x=>x.type == e);
            //console.log('change type :' + e);
        },
        invalid(){
            console.log('check')
            this.people_edit.group_id > 0;
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
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
        },
        async fetchData(){
            let path = await `/api/groups/${this.group_id}/asset_peoples`;
            try {
                let response = await axios.get(path);
                this.people_list = await response.data.data;
                this.loadTable = await false;
            } catch (error) {
                console.log(error);
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
        async editItem(item){
            this.status = await "edit";
            // this.people_edit = Object.assign({},item);
            this.people_edit.id = await item.id;
            this.people_edit.people_name = await item.people_name;
            this.people_edit.ldap_name = await item.ldap_name;
            this.people_edit.ip_address = await JSON.parse(item.ip_address);
            this.people_edit.people_type = await 0
            this.people_edit.people_type = await item.people_type;
            this.group_list_show = await this.group_list.filter(x=>x.type == item.people_type);
            this.people_edit.org_name = await item.org_name;            
            this.people_edit.people_tags = await JSON.parse(item.people_tags);
            this.people_edit.description = await item.description;
            this.dialog = await true;
        },
        deleteItem(id){
            
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
                    let path = `/api/groups/${this.group_id}/asset_peoples/${id}`;
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
            // this.dialogDelete = false
            this.clear();
        },
        async submit(){
            let path = await `/api/groups/${this.group_id}/asset_peoples`;
            console.log(this.status);
            if (this.status == 'new'){ 
                try {
                    let response = await axios.post(`${path}`,{                        
                        "people_name" : this.people_edit.people_name,
                        "ldap_name" : this.people_edit.ldap_name,
                        "people_type" : this.people_edit.people_type,
                        "ip_address" : JSON.stringify(this.people_edit.ip_address),
                        "org_name" : this.people_edit.org_name,
                        "people_tags" : JSON.stringify(this.people_edit.people_tags),
                        "description" : this.people_edit.description                        
                    })
                    this.show_alert = await 'success';
                    await this.fetchData();
                    await this.clear();
                    
                } catch (error) {
                    this.show_alert = 'error';
                }
            }else if (this.status == 'edit'){
                try {
                    await axios.put(`${path}/${this.people_edit.id}`,{
                        "people_name" : this.people_edit.people_name,
                        "ldap_name" : this.people_edit.ldap_name,
                        "people_type" : this.people_edit.people_type,
                        "ip_address" : JSON.stringify(this.people_edit.ip_address),
                        "org_name" : this.people_edit.org_name,
                        "people_tags" : JSON.stringify(this.people_edit.people_tags),
                        "description" : this.people_edit.description
                    })
                    this.show_alert = await 'success';
                    await this.fetchData();
                    await this.clear();
                    
                    
                } catch (error) {
                    
                }
            }
        },
        clear(){
            this.people_edit = Object.assign({},this.people_default);
            this.status = "new";
            this.group_list_show = this.group_list.filter(x=>x.type == 1);
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

