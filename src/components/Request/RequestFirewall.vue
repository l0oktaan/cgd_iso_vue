<template>
    <v-card>
        <v-form>
            <v-row>
                <v-col cols="3" class="text-right">เรื่อง :</v-col>
                <v-col class="text-left">
                    <v-text-field
                        
                        placeholder="ใส่ชื่อเรื่อง"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <div class="v-toolbar__title">
                        <v-icon>
                            mdi-format-list-bulleted-square
                        </v-icon>
                        รายการ Policy Firewall
                    </div>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import AssetEdit from './AssetEdit.vue'
export default {
    props: ['edit_policy'],
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
            status: 'new',
            select_index: null,
            col_l: 3,
            col_r: 9,
            
            headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-1', 'white--text', 'head-text'],
                    width: '30%'
                },
                { text: 'Destination',align: 'start', sortable: false, sortable: false, value: 'destination', class: ['blue darken-1', 'white--text'],width: '30%'},       
                { text: 'Service/Port',align: 'start', sortable: false, value: 'service_port', class: ['blue darken-1', 'white--text'],width: '25%'},                       
                { text: 'Action',align: 'center', sortable: false, value: 'actions',class: ['blue darken-1', 'white--text'],width: '15%'}                       
                            
            ],
            policy_headers: [
                {                    
                    text: 'Source',
                    align: 'start',
                    // sortable: false,
                    value: 'source',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '25%'
                },
                { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text'],width: '30%'},       
                { text: 'Service/Port', value: 'service_port', sortable: false, class: ['blue darken-3', 'white--text'],width: '20%'},                       
                { text: 'Tags', value: 'tags', sortable: false, class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'Action', value: 'actions', sortable: false,class: ['blue darken-3', 'white--text'],width: '10%'}                       
                            
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
                
            },
            policy_edit:{
                source: [],
                destination: [],
                service_port:[],
                
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
                {code: 'eqip_1',id: 1, asset: 'app_server', ip_address: ['10.100.90.17'],service_port:['22','443','80'],tags:['egp']},
                {code: 'eqip_2',id: 2, asset: 'db_server', ip_address: ['10.100.90.17'],service_port:['22','443'],tags:['admin']}
            ],
            service_port_list:[]
        }
    },
    mounted() {
        if (this.edit_policy){
            this.policy_list = this.policy_list = JSON.parse(JSON.stringify(this.edit_policy));
        }
    },
    watch: {
        
    },
    methods: {
        delPort(item,index){
            item.splice(index,1);
        },
        clear(){
            this.status = 'new';
            this.source_select = [];
            this.destination_select = [];
            this.service_port_select = [];
            this.policy = JSON.parse(JSON.stringify(this.policy_edit));
            
            this.policy_list_edit = [];
            this.select_index = null;            
        },
        clearAll(){
            this.status = 'new';
            this.source_select = [];
            this.destination_select = [];
            this.service_port_select = [];
            this.policy = JSON.parse(JSON.stringify(this.policy_edit));
            this.policy_list = [];
            this.policy_list_edit = [];
            this.select_index = null;            
        },
        create_new(){
            if (this.policy_list_edit.length>0)      {
                this.policy_list_edit = [];
            }
            let policy = JSON.parse(JSON.stringify(this.policy));
            this.policy_list_edit.push(policy);                      
        },
        add_source(item){
            this.dialog_source = true;
        },
        create_list(){
            
        },
        test(item){
            //console.log(item);
        },
        editPolicy(item,index){
            this.clear();
            this.status = 'edit';
            this.select_index = index;
            let policy = JSON.parse(JSON.stringify(item));
            this.policy_list_edit.push(policy);
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
                this.service_port_select = [];                
                this.service_port_list = [];
                //this.policy_list_edit[0].service_port = [];
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
                // if (this.policy_list_edit && this.policy_list_edit[0].service_port.length>0){
                //     let port = this.policy_list_edit[0].service_port;
                //     let count = 0;
                //     for (let i=0;i<port;i++){
                //         count = this.service_port_list.filter(x=>x == port[i]).length;
                //         if (count == 0){
                //             this.$delete(this.policy_list_edit[0].service_port,this.policy_list_edit[0].service_port.indexOf(x=>x == port[i]));
                //         }

                //     }
                // }
            }
            
            
            //this.service_port_list = tmp;

        },
        savePolicy(){
            if (this.policy_list_edit.length > 0){

                let policy = [];
                policy = JSON.parse(JSON.stringify(this.policy_list_edit[0]));
                let source = this.policy_list_edit[0].source;
                let dest = this.policy_list_edit[0].destination;
                let port = this.policy_list_edit[0].service_port;
                
                if (source.length > 0 && dest.length > 0 && port.length > 0){
                    
                    if (this.status == 'new'){
                        // this.$nextTick(()=>{
                        this.policy_list.push(policy);
                        this.clear();
                        // })
                        
                    }else if (this.status == 'edit'){
                        this.$nextTick(()=>{
                            console.log('status ' + this.status);
                            console.log('select_index ' + this.select_index);
                            //this.policy_list[this.select_index] = policy;
                            this.$set(this.policy_list,this.select_index,policy);
                            this.clear();
                        })
                        
                    }
                }else{
                    console.log('no');
                }
            }
        },
        deletePolicy(item,index){

        },
        submit(){

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