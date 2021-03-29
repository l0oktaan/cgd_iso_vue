<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-form @submit.prevent="submit" v-if="false">                
                    <v-card class="pa-4">
                        <v-row justify="center">
                            <v-col cols="12 text-center"><p>ข้อมูลรายการอุปกรณ์</p></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4 text-right">ชื่ออุปกรณ์ :</v-col>
                            <v-col>
                                <v-text-field                                                           
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
                                    v-model="services" 
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
                                    v-model="tags" 
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
                                            color="primary"
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
            </v-col>
        </v-row>
        <v-row>
      <v-col>
        <v-card
          elevation="4"
        >
          <v-data-table
            :headers="headers"
            :items="equip_list"
            :items-per-page="15"
            
            class="elevation-1"
            
            v-if="equip_list">
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>รายการอุปกรณ์</v-toolbar-title> 
                  <v-btn
                    class="ma-2"
                    rounded
                    color="success"
                    @click="add_equip"
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
                    เพิ่มรายการใหม่
                  </v-btn>            
                </v-toolbar>
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
                       
                            
            ],
            equip_list: [
                {id:1,equip_name: 'app server', ip_address : ['10.100.90.17','10.100.99.77'],service_port: ['22','443','smtp'],equip_tags:['egp','ewithdraw']},
                {id:2,equip_name: 'db server', ip_address : ['10.100.11.17','10.100.11.77'],service_port: ['3306','9292'],equip_tags:['egp','db']},
            ],
            equip_term: 1,
            ip_address: [],
            services: [],
            tags: []
        }
    },
    methods: {
        processTags($event){ 
            console.log($event.target.value);
            if ($event.target.value == '0'){
                $event.preventDefault();
            }
            
        },
        add_equip(){

        },
        submit(){

        },
        clear(){

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

