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
                    <template v-slot:item.username="{ item }">                       
                        
                        {{ item.username }}
                        
                    </template>

                    <template v-slot:item.roles="{ item }">
                        <v-chip  
                            color="primary"   
                            class="ma-1"
                            label
                            outlined
                            small
                            v-for="(role,index) in item.roles"               
                            :key="index"
                            dark
                        >
                        {{ role }}
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
            search: '',
            headers: [
                { text: 'ชื่อผู้ใช้', sortable: true, value: 'username', class: ['blue darken-3', 'white--text'],width: '15%'},
                {
                    text: 'กลุ่มงาน',
                    align: 'start',
                    // sortable: false,
                    value: 'group_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '15%'
                },

                { text: 'ประเภท', sortable: false, value: 'user_type', class: ['blue darken-3', 'white--text'],width: '15%'},           
                { text: 'สิทธิ์', sortable: false, value: 'roles', class: ['blue darken-3', 'white--text'],width: '25%'},       
                { text: 'สถานะ', sortable: false, value: 'status', class: ['blue darken-3', 'white--text'],width: '15%'},      
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                        
                            
            ],
            user_list: [
                { username : 'sudjit.lab', group_name: 'ITCD',user_type:'user', roles: ['ผู้อนุมัติ'],status:'ปกติ'},
                { username : 'siriluk.sir', group_name: 'SECD',user_type:'admin', roles: ['ผู้รับรอง','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                { username : 'chanathip.kea', group_name: 'SECD',user_type:'admin', roles: ['ผู้ร้องขอ','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                { username : 'songwut.saj', group_name: 'SECD',user_type:'admin', roles: ['ผู้ร้องขอ','ผู้พิจารณา','ผู้ติดตาม','ผู้ตรวจสอบ'],status:'ปกติ'},
                { username : 'juntharut.ink', group_name: 'NETD',user_type:'user', roles: ['ผู้ร้องขอ','ผู้ดำเนินการ','ผู้ติดตาม'],status:'ปกติ'},
            ],
            user:{},
        }
    }
}
</script>

<style>

</style>