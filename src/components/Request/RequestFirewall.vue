<template>
    <v-row justify="center">
        <v-col cols="12">
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
                                id="tbPolicy"
                                :headers="headers"
                                :items="policy_list_edit"
                                :items-per-page="10"
                                @current-items="test"
                                class="elevation-1"    
                                hide-default-footer                                                           
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
                                                @click="create_new"                                               
                                            >
                                            <v-icon left>
                                            mdi-plus
                                            </v-icon>
                                            เพิ่มรายการใหม่
                                            </v-btn>
                                        
                                    </v-toolbar>
                                </template>
                                
                                <template v-slot:item.source="{ item,index }">
                                    
                                            <asset-edit 
                                                :items="source_list" 
                                                :header="source_headers" 
                                                :select="item.source"
                                                :index="index"
                                                @updateItem="updateSource"
                                            ></asset-edit>
                                            <v-row v-for="(s,i) in item.source" :key="i">
                                                <v-col>{{s.asset}}</v-col>
                                                <v-col>
                                                    <p v-for="(ip,x) in s.ip_address" 
                                                        :key="x"
                                                    >
                                                        {{ip}}
                                                    </p>
                                                </v-col>
                                            </v-row>
                                        
                                    
                                </template>
                                <template v-slot:item.destination="{ item,index }">                                    
                                    <asset-edit 
                                        :items="destination_list" 
                                        :header="destination_headers" 
                                        :select="item.destination"
                                        :index="index"
                                        @updateItem="updateDestination"
                                    ></asset-edit>
                                    <v-row v-for="(s,i) in item.destination" :key="i">
                                        <v-col>{{s.asset}}</v-col>
                                        <v-col>
                                            <p v-for="(ip,x) in s.ip_address" 
                                                :key="x"
                                                >
                                                    {{ip}}
                                                </p>
                                            </v-col>
                                    </v-row>
                                </template>
                                <template v-slot:item.service_port="{ item,index }">
                                    
                                        <v-menu        
                                            :close-on-content-click="false"
                                            :nudge-width="200"
                                            offset-x
                                            >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn                                        
                                                        color="success"
                                                        fab
                                                        x-small
                                                        dark    
                                                        v-bind="attrs"
                                                        v-on="on"                                           
                                                    >
                                                    <v-icon>
                                                    mdi-plus
                                                    </v-icon>                                        
                                                </v-btn> 
                                                
                                            </template>
                                            
                                                <v-checkbox 
                                                    v-for="(port,index) in service_port_list"
                                                    :key="index"
                                                    v-model="service_port_select"                                                
                                                    :value="port"
                                                    :label="port"
                                                    dense
                                                >
                                                    
                                                </v-checkbox>
                                            
                                            <!-- <v-combobox
                                                v-model="service_port_select"
                                                :items="service_port_list"
                                                :search-input.sync="search"
                                                    hide-details="true"
                                                dense
                                                multiple
                                                persistent-hint
                                                                                            
                                                >                                            
                                            </v-combobox> -->
                                            
                                        </v-menu>
                                        
                                        <div>
                                            <v-chip                                                       
                                            
                                                color="black"
                                                small
                                                outlined
                                                v-for="(port,index) in service_port_select"
                                                :key="index"
                                                >     
                                                <v-icon left>
                                                    mdi-label
                                                </v-icon>                                   
                                                {{ port }}
                                            </v-chip>
                                        </div>
                                    
                                    
                                                
                                    
                                </template>
                            </v-data-table>
                            {{policy_list}}
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>      
                   
            
        </v-col>
    </v-row>
</template>

<script>
import AssetEdit from './AssetEdit.vue'
export default {
    components:{
        'asset-edit':AssetEdit
    },
    data(){
        return {
            menu_test: false,
            menu_source: false,
            menu_destination: false,
            dialog:false,
            dialog_source:false,
            singleSelect: false,
            selected: [],
            source_select:[],
            destination_select:[],
            service_port_select:[],
            search: '',
            col_l: 3,
            col_r: 9,
            headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '30%'
                },
                { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text'],width: '30%'},       
                { text: 'Service/Port', value: 'service_port', class: ['blue darken-3', 'white--text'],width: '30%'},                       
                { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '10%'}                       
                            
            ],
            source_headers:[
                { text: 'Asset', sortable: false, value: 'asset', class: ['blue darken-3', 'white--text']},
                { text: 'IP', sortable: false, value: 'ip_address', class: ['blue darken-3', 'white--text']},
                { text: 'Tags', sortable: false, value: 'tags', class: ['blue darken-3', 'white--text']},

            ],
            destination_headers:[
                { text: 'Asset', sortable: false, value: 'asset', class: ['blue darken-3', 'white--text']},
                { text: 'IP', sortable: false, value: 'ip_address', class: ['blue darken-3', 'white--text']},
                { text: 'Port', sortable: false, value: 'service_port', class: ['blue darken-3', 'white--text']},
                { text: 'Tags', sortable: false, value: 'tags', class: ['blue darken-3', 'white--text']},
            ],
            policy_list_edit:[],
            policy_list:[],
            policy:{
                source: [],
                destination: [],
                service_port:[],
                status:'new'
            },
            policy_edit:{
                source: [],
                destination: [],
                service:[],
                status:''
            },
            equip_list: [
                {id:1,equip_name: 'app server', ip_address : ['10.100.90.17','10.100.99.77'],service_port: ['22','443','smtp'],equip_tags:['egp','ewithdraw']},
                {id:2,equip_name: 'db server', ip_address : ['10.100.11.17','10.100.11.77'],service_port: ['3306','9292'],equip_tags:['egp','db']},
            ],
            people_list: [
                {id:1, people_name: 'ทรงวุฒิ สัจจบุตร', ip_address : '10.10.31.85',people_type: 1, organiz_id: 1,people_tags:['security','itc']},
                {id:2, people_name: 'สัจจบุตร ทรงวุฒิ', ip_address : '10.10.31.86',people_type: 2, organiz_id: 12,people_tags:['pcc','vender']},
            ],
            source_list:[
                {code: 'eqip_1',id: 1, asset: 'app_server', ip_address: ['10.100.90.17','10.100.90.27'],tags:['app']},
                {code: 'eqip_2',id: 2, asset: 'db_server', ip_address: ['10.100.90.17'],tags:['db']},
                {code: 'people_1',id: 1, asset: 'ทรงวุฒิ สัจจบุตร', ip_address : ['10.10.31.85'],people_type: 1, organiz_id: 1,people_tags:['security','itc']},
                {code: 'people_2',id: 2, asset: 'สัจจบุตร ทรงวุฒิ', ip_address : ['10.10.31.86'],people_type: 2, organiz_id: 12,people_tags:['pcc','vender']},
            ],
            destination_list:[
                {code: 'eqip_1',id: 1, asset: 'app_server', ip_address: ['10.100.90.17'],service_port:['22','443','444','445','446','447','448','449','5410','548','549','5410'],tags:['egp']},
                {code: 'eqip_2',id: 2, asset: 'db_server', ip_address: ['10.100.90.17'],service_port:['22','443'],tags:['admin']}
            ],
            service_port_list:[]
        }
    },
    methods: {
        clear(){
            this.dialog = false;
        },
        create_new(){
            if (this.policy_list_edit.length>0)      {
                this.policy_list_edit = [];
            }
            this.policy_list_edit.push(this.policy);                      
        },
        add_source(item){
            this.dialog_source = true;
        },
        create_list(){
            
        },
        test(item){
            //console.log(item);
        },
        updateSource(obj){
            
            let index = obj.index;
            
            let selected = obj.value;
            this.policy_list_edit[index].source = selected;
        },
        updateDestination(obj){
            let index = obj.index;            
            let selected = obj.value;
            if (selected){
                this.policy_list_edit[index].destination = selected;
                this.updatePort(selected);
            }
            
        },
        updatePort(dest){
            if (dest.length>0){
                this.service_port_list = [];
            
                let port = [];
                if (dest.length > 1){
                    for (let i=0;i<dest.length;i++){
                        for (let j=0;j<dest[i].service_port.length;j++){
                            port.push(dest[i].service_port[j]);
                        }
                    }
                    let tmp = [];
                    tmp = Array.from(new Set(port));
                    let count = 0;
                    for (let i=0;i<tmp.length;i++){
                        count = port.filter(x=>x==tmp[i]).length;
                        if (count > 1){
                            this.service_port_list.push(tmp[i]);
                        }
                    }
                }else{
                    this.service_port_list = dest[0].service_port;
                }
            }
            
            
            //this.service_port_list = tmp;

        }
    }
}
</script>

<style scoped>
.text-start {
  border: 3px solid black!important;
  vertical-align: top!important;
}
.v-btn--fab.v-size--x-small{
    height: 25px!important;
    width: 25px!important;
}
.v-select__selections{
    max-width: 250px!important;
}
thead>tr>th{
    font-size: 2em!important;
}
.menuable__content__active{
    
    background-color: #ffffff;
   max-height: 350px!important;
}
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>td{
    vertical-align: top!important;
}
.v-data-table__wrapper>table>tbody>tr>td{
    vertical-align: top!important;

}
#tbPolicy.col{
    padding: 2px!important;
}

</style>>

</style>