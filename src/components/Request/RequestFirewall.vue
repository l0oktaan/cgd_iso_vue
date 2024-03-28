<template>
    <v-card>
        <v-form @submit.prevent="submit">
            <v-row>
                <v-col>
                    <v-data-table
                        id="tbPolicyTemplate"
                        :headers="policy_headers"
                        :items="policy_list"
                        :items-per-page="10"
                        :search="search"
                        class="elevation-1"
                        :loading="loadTable"
                        :item-class= "row_classes"
                        
                    >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>
                                <v-icon>mdi-server</v-icon>
                                รายการ Policy Firewall
                            </v-toolbar-title>                
                            <v-spacer></v-spacer>        
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="ค้นหา"
                                single-line
                                hide-details
                            ></v-text-field>                
                    </v-toolbar>
                    </template >
                    
                    <template v-slot:item.detail="{ item,index }">
                        <div class="policy" v-for="(detail,i) in item.policy_detail" :key="i">
                            <v-row>
                                <v-col class="text-right">
                                    <div v-for="(source,j) in getArray(detail.source)" :key="j">
                                        <v-chip small label color="primary" class="mt-1 mb-1">{{source.asset}}</v-chip>
                                        <v-chip small label outlined color="primary" class="mt-1 mb-1"
                                            v-for="(ip,x) in source.ip_address" :key="x"
                                        >
                                            {{ip}}
                                        </v-chip>
                                        <v-chip small label color="primary" class="mt-1 mb-1">{{source.ldap}}</v-chip>
                                    </div>
                                </v-col>
                                <v-col cols="1" class="text-center"><v-icon>mdi-arrow-right-thick</v-icon></v-col>
                                <v-col class="text-left">
                                    <div v-for="(destination,j) in getArray(detail.destination)" :key="j">
                                        <v-chip small label dark color="grey darken-3" class="mt-1 mb-1">{{destination.asset}}</v-chip>
                                        <v-chip small label outlined color="grey darken-3" 
                                            v-for="(ip,x) in destination.ip_address" :key="x"
                                            class="mt-1 mb-1"

                                        >
                                            {{ip}}
                                        </v-chip>
                                    </div>
                                </v-col>
                                <v-col cols="2">
                                    <v-chip  
                                        color="deep-orange darken-3"   
                                        class="ma-1"
                                        small
                                        v-for="(port,y) in getArray(detail.service_port)"               
                                        :key="y"
                                        dark
                                    >
                                        {{ port }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            
                        </div>
                        
                    </template>
                    


                    <template v-slot:item.actions="{ item,index }">
                        <v-switch
                            v-model="policy_select"
                            
                            :value="item"
                            ></v-switch>                        
                    </template>
                    </v-data-table>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <v-btn
                                                        
                        color="primary"
                        rounded
                        dark                
                        dense
                        type="submit"
                        
                    >
                        <v-icon left>
                            mdi-content-save-outline
                        </v-icon>
                        บันทึก
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>

<script>
import axios from 'axios';
import AssetEdit from './AssetEdit.vue'
export default {
    props: ['request_id'],
    components:{
        'asset-edit':AssetEdit
    },
    data(){
        return {
            
            policy_headers: [
                {                    
                    text: 'Policy',
                    align: 'start',
                    // sortable: false,
                    value: 'policy_name',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '25%'
                },
                {                    
                    text: 'Detail',
                    align: 'start',
                    // sortable: false,
                    value: 'detail',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '60%'
                },
                // { text: 'Destination', sortable: false, value: 'destination', class: ['blue darken-3', 'white--text'],width: '30%'},       
                // { text: 'Service/Port', value: 'service_port', sortable: false, class: ['blue darken-3', 'white--text'],width: '20%'},                       
                // { text: 'Tags', value: 'tags', sortable: false, class: ['blue darken-3', 'white--text'],width: '15%'},                       
                { text: 'เลือก', value: 'actions', sortable: false,class: ['blue darken-3', 'white--text'],width: '5%'}                       
                            
            ],
            loadTable: true,
            search: '',
            policy_select: [],
            policy_list: [],
            policy_list_show: [],
            user: this.$store.getters.user,


        }
    },
    mounted() {
        // if (this.edit_policy){
        //     this.policy_list = this.policy_list = JSON.parse(JSON.stringify(this.edit_policy));
        // }
        this.fetchData();
    },
    watch: {
        
    },
    methods: {
        
        
        row_classes(item) {            
            return "row_selected";
        },
        async fetchData(){
            let path = await `/api/groups/${this.user.group_id}/policies`;
            let response = await axios.get(`${path}`);
            this.policy_list = await response.data.data;
            this.loadTable = false;
        },
        async submit(){
            let path = await `/api/request_forms/${this.request_id}/request_details`;
            console.log(path);
            if (this.policy_select.length > 0){
                for (let i=0; i<this.policy_select.length; i++){
                    let response = await axios.post(`${path}`,{
                        type: 2,
                        request_detail: this.policy_select[i].policy_name,
                        policy : this.policy_select[i].policy_detail
                    })
                }
                this.$emit('close_detail');
            }
        },
        createListShow(list){
            let arr = [];

            for (let i=0;i<list.length;i++){
                let detail = [];
                let source = [];
                let dest = [];
                let port = [];
                let tag = [];
                for(let j=0;j<list[i].policy_detail.length;j++) {
                    // detail.push({
                    //     id: list[i].policy_detail[j].id,
                    //     source: this.getArray(list[i].policy_detail[j].source),
                    //     destination: this.getArray(list[i].policy_detail[j].destination),
                    //     service_port: this.getArray(list[i].policy_detail[j].service_port),
                    //     tags: this.getArray(list[i].policy_detail[j].tags)
                    // })

                        source.push(this.getArray(list[i].policy_detail[j].source));
                        dest.push(this.getArray(list[i].policy_detail[j].destination));
                        port.push(this.getArray(list[i].policy_detail[j].service_port));
                        tag.push(this.getArray(list[i].policy_detail[j].tags));
                }
                

                arr.push({
                    id: list[i].id,
                    policy_name: list[i].policy_name,
                    // source: this.getArray(list.policy_detail.source),
                    // detination: this.getArray(list.policy_detail.detination),
                    // service_port: this.getArray(list.policy_detail.service_port),
                    // tags: this.getArray(list.policy_detail.tags)
                    source: source,
                    destination: dest,
                    service_port: port,
                    tags: tag
                })
            }
            return arr;
        },
        delPort(item,index){
            item.splice(index,1);
        },
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
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
.policy{
    margin: 2px;
    border: 1px solid rgb(219, 219, 219);
    background-color: rgb(224, 224, 224);
    padding: 5px;
    border-radius: 3px;
}
.row_selected{
    background-color: #801616!important;
}
</style>>

</style>