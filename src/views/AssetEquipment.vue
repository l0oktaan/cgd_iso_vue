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
                            <v-form @submit.prevent="submit">                                   
                                <v-card class="pa-4">
                                    <v-row justify="center">
                                        <v-col cols="12 text-center"><p><v-icon class="mr-2">mdi-server</v-icon>ข้อมูลรายการอุปกรณ์</p></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4 text-right">ชื่ออุปกรณ์ :</v-col>
                                        <v-col>
                                            <v-text-field      
                                                v-model="equip_name"                                                     
                                                hide-details="auto" 
                                                outlined 
                                                dense
                                            ></v-text-field>
                                            
                                        </v-col>
                                    </v-row>                        
                                    <v-row>
                                        <v-col cols="4 text-right">IP Address :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="ip_address" 
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
                                        <v-col cols="4 text-right">Port/Service :</v-col>
                                        <v-col>
                                            <v-combobox multiple
                                                v-model="service_port" 
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
                                                        color="deep-orange darken-3"
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
                            v-for="(ip,index) in item.ip_address"               
                            :key="index"
                            dark
                        >
                        {{ ip }}
                        </v-chip>
                    </template>
                    <template v-slot:item.service_port="{ item }">
                        <v-chip  
                            color="deep-orange darken-3"   
                            class="ma-1"
                            small
                            v-for="(port,index) in item.service_port"               
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

                            v-for="(tags,index) in item.equip_tags"               
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
                    text: 'ชื่ออุปกรณ์',
                    align: 'start',
                    // sortable: false,
                    value: 'equip_name',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                { text: 'IP Address', value: 'ip_address', class: ['blue darken-3', 'white--text']},       
                { text: 'Port / Service', sortable: false, value: 'service_port', class: ['blue darken-3', 'white--text']},       
                { text: 'Tags', sortable: false, value: 'equip_tags', class: ['blue darken-3', 'white--text']},
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text']}                       
                            
            ],
            equip_list: [
                {id:1,equip_name: 'app server', ip_address : ['10.100.90.17','10.100.99.77'],service_port: ['22','443','smtp'],equip_tags:['egp','ewithdraw']},
                {id:2,equip_name: 'db server', ip_address : ['10.100.11.17','10.100.11.77'],service_port: ['3306','9292'],equip_tags:['egp','db']},
            ],
            status: 'new',
            equip_id: 0,
            equip_name: '',
            ip_address: [],
            service_port: [],
            equip_tags: [],
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
            this.equip_id = item.id;
            this.equip_name = item.equip_name;
            this.ip_address = item.ip_address;
            this.service_port = item.service_port;
            this.equip_tags = item.equip_tags;
            this.dialog = true;
        },
        deleteItem(id){
            this.equip_id = id;
            this.dialogDelete = true;
        },
        deleteItemConfirm(id){

        },
        closeDelete() {
            this.dialogDelete = false
        },
        submit(){

        },
        clear(){
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

