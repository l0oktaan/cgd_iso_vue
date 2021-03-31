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
                            <v-form @submit.prevent="submit">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-account-multiple</v-icon>ข้อมูลรายการบุคลากร</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่อ-นามสกุล :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="people_edit.people_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>
                                            
                                        </v-col>
                                    </v-row>                        
                                    <v-row>
                                        <v-col cols="4 text-right">IP Address :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="people_edit.ip_address"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>
                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ประเภทบุคลากร :</v-col>
                                        <v-col>
                                            <v-radio-group
                                                v-model="people_edit.people_type"
                                                row
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
                                            <v-text-field      
                                                v-model="people_edit.organiz_id"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>
                                            
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
                    <template v-slot:item.people_name="{ item }">                        
                        <v-icon class="mr-1" small>mdi-account</v-icon>
                        {{ item.people_name }}
                        
                    </template>
                    <template v-slot:item.ip_address="{ item }">
                        <v-chip  
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small                            
                            dark
                        >
                        {{ item.ip_address }}
                        </v-chip>
                    </template>
                    
                    <template v-slot:item.people_tags="{ item }">
                        <v-chip  
                            color="black"   
                            class="ma-1"
                            small

                            v-for="(tags,index) in item.people_tags"               
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
            </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {
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
                { text: 'ประเภท', sortable: false, value: 'people_type', class: ['blue darken-3', 'white--text'],width: '10%'},       
                { text: 'IP Address', value: 'ip_address', class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'หน่วยงาน', sortable: false, value: 'organiz_id', class: ['blue darken-3', 'white--text'],width: '15%'},
                { text: 'Tags', sortable: false, value: 'people_tags', class: ['blue darken-3', 'white--text']},
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                       
                            
            ],
            people_list: [
                {id:1, people_name: 'ทรงวุฒิ สัจจบุตร', ip_address : '10.10.31.85',people_type: 1, organiz_id: 1,people_tags:['security','itc','dsdasdasdasd','sdasdasd']},
                {id:2, people_name: 'สัจจบุตร ทรงวุฒิ', ip_address : '10.10.31.86',people_type: 2, organiz_id: 12,people_tags:['pcc','vender']},
            ],
            status: 'new',
            people_default: {
                people_id: 0,
                people_name: '',
                people_type: 0,
                ip_address: '',
                organiz_id: 0,
                people_tags: []
            },
            people_edit: {
                people_id: 0,
                people_name: '',
                people_type: 0,
                ip_address: '',
                organiz_id: 0,
                people_tags: []
            },
            search: ''
        }
    },
    methods: {
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
            this.status = "edit";
            this.people_edit = Object.assign({},item);
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
            this.people_edit = Object.assign({},this.people_default);
            this.status = "new";
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

