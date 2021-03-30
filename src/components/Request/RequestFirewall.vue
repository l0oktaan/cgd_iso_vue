<template>
    <v-row justify="center">
        <v-col cols="10">
            <v-card class="pa-2">
                <v-form>
                    <v-row>
                        <v-col :cols="col_l" class="text-right">ชื่อเรื่อง :</v-col>
                        <v-col :cols="col_r">
                            <v-text-field
                                outlined                                
                                dense
                                label=""
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-data-table
                                :headers="headers"
                                :items="policy_list"
                                :items-per-page="10"
                                
                                class="elevation-1"                                                               
                            >
                                <template v-slot:top>
                                    <v-toolbar
                                        flat
                                    >
                                        <v-toolbar-title>
                                            <v-icon large>mdi-account-multiple</v-icon>
                                            Policy Firewall
                                        </v-toolbar-title>
                                            <v-btn
                                                class="ma-2"
                                                rounded
                                                color="red" 
                                                @click="add_row"                                               
                                            >
                                            <v-icon left>
                                            mdi-plus
                                            </v-icon>
                                            เพิ่มรายการใหม่
                                            </v-btn>
                                        
                                    </v-toolbar>
                                </template>
                                <template v-slot:item.source="{ item }">
                                    
                                    <v-combobox
                                        v-model="item.source"
                                        :items="people_list"
                                        :item-text="'equip_name'"
                                        :item-value="'id'"
                                        label="Select a favorite activity or create a new one"
                                        multiple
                                    ></v-combobox>
                                    
                                    
                                </template>
                                <template v-slot:item.destination="{ item }">
                                    
                                    <v-btn
                                        v-if="item.destination.length==0"
                                            class="ma-2"
                                            rounded
                                            color="red" 
                                            @click="add_source(item)"                                               
                                        >
                                        <v-icon left>
                                        mdi-plus
                                        </v-icon>                                        
                                    </v-btn>
                                    <span v-else>
                                        <v-chip  
                                            v-for="(d,index) in item.destination"
                                            :key="index"
                                            color="primary"   
                                            class="ma-1"
                                            label
                                            outlined
                                            small                            
                                            dark
                                        >
                                            {{d}}
                                        </v-chip>
                                    </span>                                    
                                </template>

                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <v-dialog
                v-model="dialog_source"
                width="650"
                persistent
            >
                <v-card>
                    source
                </v-card>    
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return {
            dialog:false,
            dialog_source:false,
            col_l: 3,
            col_r: 9,
            headers: [
                {
                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-3', 'white--text', 'head-text']
                },
                { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text']},       
                { text: 'Service/Port', value: 'service_port', class: ['blue darken-3', 'white--text']},                       
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text']}                       
                            
            ],
            policy_list:[],
            policy:{
                source: [],
                destination: [],
                service_port:[]
            },
            policy_edit:{
                source: [],
                destination: [],
                service:[]
            },
            equip_list: [
                {id:1,equip_name: 'app server', ip_address : ['10.100.90.17','10.100.99.77'],service_port: ['22','443','smtp'],equip_tags:['egp','ewithdraw']},
                {id:2,equip_name: 'db server', ip_address : ['10.100.11.17','10.100.11.77'],service_port: ['3306','9292'],equip_tags:['egp','db']},
            ],
            people_list: [
                {id:1, people_name: 'ทรงวุฒิ สัจจบุตร', ip_address : '10.10.31.85',people_type: 1, organiz_id: 1,people_tags:['security','itc']},
                {id:2, people_name: 'สัจจบุตร ทรงวุฒิ', ip_address : '10.10.31.86',people_type: 2, organiz_id: 12,people_tags:['pcc','vender']},
            ],
        }
    },
    methods: {
        clear(){
            this.dialog = false;
        },
        add_row(){
            this.policy_list.push(this.policy);
        },
        add_source(item){
            this.dialog_source = true;
        }
    }
}
</script>

<style scoped>
td.text-start {
  border: 3px solid black!important;
}
</style>>

</style>