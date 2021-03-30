<template>
    
            <v-card elevation="4">
                <v-data-table
                    :headers="headers"
                    :items="org_list"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1"                               
                    
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
                            <v-form @submit.prevent="submit">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-home-city</v-icon>ข้อมูลหน่วยงาน</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อหน่วยงาน :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="org_edit.org_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>
                                            
                                        </v-col>
                                    </v-row>  
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อย่อ :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="org_edit.org_name_short"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>                                            
                                        </v-col>
                                    </v-row>    
                                    <v-row>
                                        <v-col cols="4 text-right">ประเภทหน่วยงาน :</v-col>
                                        <v-col>
                                            <v-radio-group
                                                v-model="org_edit.org_type"
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
                                                v-model="org_edit.ip_address" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                
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
                                                v-model="org_edit.org_tags" 
                                                dense
                                                append-icon
                                                chips
                                                deletable-chips
                                                class="tag-input"
                                                outlined
                                                hide-details="auto" 
                                                
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
                                                    dark
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
                    <template v-slot:item.org_name="{ item }">                        
                        <v-icon class="mr-1" small>mdi-home-city</v-icon>
                        {{ item.org_name }}
                        
                    </template>
                    <template v-slot:item.ip_address="{ item }">
                        <v-chip                              
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small
                            v-for="(ip,index) in item.ip_address"               
                            :key="index"
                            dark
                        >
                        {{ ip }}
                        </v-chip>
                    </template>
                    
                    <template v-slot:item.org_tags="{ item }">
                        <v-chip  
                            color="black"   
                            class="ma-1"
                            small

                            v-for="(tags,index) in item.org_tags"               
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
                        <v-icon                    
                            class="mr-2"
                            large
                            color="primary"
                            @click="editItem(item)"
                        >
                            mdi-pencil-circle
                        </v-icon>
                        <v-icon  
                            
                            color="error"        
                            @click="deleteItem(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>            
                    </v-data-table>
            </v-card>
        
</template>

<script>
export default {
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
                    value: 'org_name',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                {
                    text: 'ชื่อย่อ',
                    align: 'start',
                    // sortable: false,
                    value: 'org_name_short',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                { text: 'ประเภท', sortable: false, value: 'org_type', class: ['blue darken-3', 'white--text']},       
                { text: 'IP Group', value: 'ip_address', class: ['blue darken-3', 'white--text']},            
                { text: 'Tags', sortable: false, value: 'org_tags', class: ['blue darken-3', 'white--text']},
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text']}                            
            ],
            org_list: [
                { id:1, org_name: 'กลุ่มงานรักษาความปลอดภัยสารสนเทศ', org_name_short: 'SECD', org_type: 1, ip_address: ['10.10.31.85','10.10.31.121'], org_tags: ['securit','SECD']},
                { id:2, org_name: 'บริษัท i-Secure จำกัด', org_name_short: 'i-secure', org_type: 2, ip_address: [], org_tags: ['security','i-secure']},
            ],
            org_default: {
                org_name: '',
                org_name_short: '',
                org_type:0,
                ip_address: [],
                org_tags: []                
            },
            org_edit: {
                org_name: '',
                org_name_short: '',
                org_type:0,
                ip_address: [],
                org_tags: []                
            }
        }
    },
    methods:{
        editItem(item){
            this.status = "edit";
            this.org_edit = Object.assign({},item);
            this.dialog = true;
        },
        deleteItem(id){
            this.equip_id = id;
            this.dialogDelete = true;
        },
        deleteItemConfirm(id){

        },
        closeDelete() {
            // this.dialogDelete = false
            this.clear();
        },
        submit(){

        },
        clear(){
            this.org_edit = Object.assign({},this.org_default);
            this.status = "new";
            this.dialog = false;
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