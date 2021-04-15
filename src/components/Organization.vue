<template>
    
            <v-card elevation="4">
                <v-data-table
                    :headers="headers"
                    :items="group_list"
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
                            <v-icon large>mdi-home-city</v-icon>
                            รายการหน่วยงาน</v-toolbar-title> 
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
                            <v-form @submit.prevent="submit" ref="frmGroup">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-home-city</v-icon>ข้อมูลหน่วยงาน</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อหน่วยงาน :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="group_name"
                                                rules="required"
                                            >
                                                <v-text-field      
                                                    v-model="group_edit.group_name"  
                                                                                                      
                                                    
                                                    outlined 
                                                    dense
                                                    :error-messages="errors"
                                                    data-vv-name="group_name"
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>  
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อย่อ :</v-col>
                                        <v-col>
                                            <validation-provider
                                                v-slot="{ errors }"
                                                name="group_name_short"
                                                rules="required"
                                            >
                                            <v-text-field      
                                                v-model="group_edit.group_name_short"                                                    
                                                
                                                outlined 
                                                dense
                                                :error-messages="errors"
                                                data-vv-name="group_name_short"
                                            ></v-text-field> 
                                            </validation-provider>                                           
                                        </v-col>
                                    </v-row>    
                                    <v-row>
                                        <v-col cols="4 text-right">ประเภทหน่วยงาน :</v-col>
                                        <v-col>
                                            
                                            <v-radio-group
                                                v-model="group_edit.group_type"
                                                row
                                                
                                                >
                                                <v-radio
                                                    label="หน่วยงานของกรม"
                                                    :value="1"
                                                ></v-radio>
                                                <v-radio
                                                    label="ผู้ให้บริการภายนอก"
                                                    :value="2"
                                                ></v-radio>
                                            </v-radio-group>
                                                                                    
                                        </v-col>
                                    </v-row>                  
                                    <v-row>
                                        <v-col cols="4 text-right">IP Address :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="group_edit.ip_address" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                label="กด tab เพื่อเพิ่มหลายค่า"
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
                                            
                                        </v-col>
                                    </v-row>
                                    
                                   
                                    <v-row>
                                        <v-col cols="4 text-right">Tag :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="group_edit.group_tags" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                label="กด tab เพื่อเพิ่มหลายค่า"
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
                                        <v-col cols="4 text-right">รายละเอียดเพิ่มเติม :</v-col>
                                        <v-col>
                                            <v-textarea
                                                v-model="group_edit.description"
                                                outlined                                                
                                                no-resize
                                                rows="2"
                                                
                                            ></v-textarea>
                                            
                                                                                    
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
                                                    mdi-cancel
                                                </v-icon>
                                                ยกเลิก
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
                    <template v-slot:item.group_name="{ item }">                        
                        <v-icon class="mr-1" small>mdi-home-city</v-icon>
                        {{ item.group_name }}
                        
                    </template>
                    <template v-slot:item.group_type="{ item }">                        
                        
                        {{ item.group_type == '1' ? 'หน่วยงานภายใน' : 'ผู้ให้บริการภายนอก' }}
                        
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
                    
                    <template v-slot:item.group_tags="{ item }">
                        <v-chip  
                            color="black"   
                            class="ma-1"
                            small

                            v-for="(tags,index) in getArray(item.group_tags)"               
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
                    <my-alert :AlertType="show_alert"></my-alert>
            </v-card>
        
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
        return {
            
            dialog: false,
            dialogDelete: false,
            status: 'new',
            search: '',
            headers: [
                {
                    text: 'ชื่อหน่วยงาน',
                    align: 'start',
                    // sortable: false,
                    value: 'group_name',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                {
                    text: 'ชื่อย่อ',
                    align: 'start',
                    // sortable: false,
                    value: 'group_name_short',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                { text: 'ประเภท', sortable: true, value: 'group_type', class: ['blue darken-3', 'white--text']},       
                { text: 'IP Group', value: 'ip_address', class: ['blue darken-3', 'white--text']},            
                { text: 'Tags', sortable: false, value: 'group_tags', class: ['blue darken-3', 'white--text']},
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text']}                            
            ],
            group_list: [],
            group_default: {
                id:'',
                group_name: '',
                group_name_short: '',
                group_type:1,
                ip_address: [],
                group_tags: [],
                description: ''                
            },
            group_edit: {
                id:'',
                group_name: '',
                group_name_short: '',
                group_type:1,
                ip_address: [],
                group_tags: [],
                description: ''
            },
            show_alert: '',
            loadTable: true
        }
    },
    mounted(){
        this.fetchData();
    },
    computed: {
        
    },
    methods:{
        invalid(){
            this.$validator.validateAll();
        },
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
        },
        async fetchData(){
            let path = await `/api/groups`;
            try {
                let response = await axios.get(path);
                this.group_list = await response.data.data;
                this.loadTable = false;
            } catch (error) {
                
            }
            
        },
        editItem(item){
            this.status = "edit";
            // this.group_edit = Object.assign({},item);
            this.group_edit.id = item.id;
            this.group_edit.group_name = item.group_name;
            this.group_edit.group_name_short = item.group_name_short;
            this.group_edit.group_type = item.group_type;
            this.group_edit.ip_address = JSON.parse(item.ip_address);
            this.group_edit.group_tags = JSON.parse(item.group_tags);
            this.group_edit.description = item.description;
            this.dialog = true;
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
                    let path = `/api/groups/${id}`;
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
            let path = await `/api/groups`;
            if (this.status == 'new'){
                let response = await axios.post(`${path}`,
                    {
                        "group_name" : this.group_edit.group_name,
                        "group_name_short" : this.group_edit.group_name_short,
                        "group_type" : this.group_edit.group_type,
                        "ip_address" : JSON.stringify(this.group_edit.ip_address),
                        "group_tags" : JSON.stringify(this.group_edit.group_tags),
                        "description" : this.group_edit.description,
                    }
                )
                this.show_alert = await 'success';
                
                await this.fetchData();
                await this.clear();
            }else if (this.status=='edit'){
                let response =  await axios.put(`${path}/${this.group_edit.id}`,
                    {
                        "group_name" : this.group_edit.group_name,
                        "group_name_short" : this.group_edit.group_name_short,
                        "group_type" : this.group_edit.group_type,
                        "ip_address" : JSON.stringify(this.group_edit.ip_address),
                        "group_tags" : JSON.stringify(this.group_edit.group_tags),
                        "description" : this.group_edit.description
                    }
                )
                this.show_alert = await 'success';
                
                await this.fetchData();
                await this.clear();
            }
        },
        clear(){
            this.group_edit = Object.assign({},this.group_default);
                // this.group_edit.id='',
                // this.group_edit.group_name= '',
                // this.group_edit.group_name_short= '',
                // this.group_edit.group_type=1,
                // this.group_edit.ip_address= [],
                // this.group_edit.group_tags= [],
                // this.group_edit.description= ''
            this.status = "new";
            this.dialog = false;
            this.show_alert = '';
            
            
        }
    }
}
</script>

<style scoped>
.v-input--selection-controls{
    margin-top: 0px!important;    
}
</style>>

</style>