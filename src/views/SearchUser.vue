<template>    
<div class="container">
<Transition>
    <div class="search" v-if="!adv_toggle">        
        <input type="text" class="searchTerm" placeholder="ค้นหา" 
            id="search" v-model="keyword" @keydown.enter="search"
        data-search>                    
        <div class="clear">
            <i class="fa fa-times fa-1x" v-show="keyword!=''" @click="keyword=''"></i>
            <i class="fa fa-search" @click="search"></i>                        
        </div>  
    </div>
</Transition>
<Transition>
    <div class="advsearch">
        <div class="toggle_search">
            <v-switch            
                v-model="adv_toggle"
                :label="`Advance Search : [${getToggle()}]`"
            ></v-switch>
        </div>
        <!-- <div class="toggle_search" v-if="!adv_toggle">
            <v-btn
                elevation="2"
                @click="adv_toggle=!adv_toggle"
            >Advance Search</v-btn>
        </div> -->
        
        <div class="filter" v-if="adv_toggle">
            <v-row>
                <v-col cols="2"><div class="cname">Advance Search</div></v-col>
                <v-col cols="3">
                    <v-combobox
                        v-model="search_select"
                        :items="search_with"                        
                        outlined
                        dense
                    ></v-combobox>
                </v-col>
                <v-col cols="4">
                    <v-text-field                        
                        placeholder="Keyword"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-btn
                        elevation="2"                    
                    ><i class="fa fa-plus"></i></v-btn>
                </v-col>
            </v-row>
            <div class="toggle_search">
                <v-btn
                    elevation="2"
                    :disabled="arr_adv_search.length==0"
                >Search</v-btn>
                <!-- <v-btn
                    elevation="2"
                    @click="adv_toggle=!adv_toggle"
                >Cancle</v-btn> -->
            </div>
        </div>
    </div>
</Transition>
    <div class="wait" v-if="waiting">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
    </div>
    <div class="show" v-if="!waiting">
        <div>
            <v-btn
                v-if="results && results.length>0"
                elevation="2"  
                @click="clearSearch"              
            >Clear</v-btn>
        </div>
        
        <div class="detail" v-for="(item,index) in results" :key="index">
            
            <v-row>
                <v-col cols="3"><div class="cname">ชื่อ - นามสกุล :</div></v-col>
                <v-col>{{item.firstname + ' ' + item.surename}}</v-col>
            </v-row>
            <v-row>
                <v-col cols="3"><div class="cname">AccountName :</div></v-col>
                <v-col>{{item.SamAccountName}}</v-col>
            </v-row>
            <v-row>
                <v-col cols="3"><div class="cname">สังกัด :</div></v-col>
                <v-col>{{item.company}}</v-col>
            </v-row>
             <v-row>
                <v-col cols="3"><div class="cname">กลุ่มงาน :</div></v-col>
                <v-col>{{item.department}}</v-col>
            </v-row>
            <v-row>
                <v-col cols="3"><div class="cname">Account หมดอายุ :</div></v-col>
                <v-col>{{getThaiDateTime(item.accountexpires) + (item.remain == '' ? '' : ' (' + item.remain + ' วัน)')}}</v-col>
            </v-row>            
             <v-row>
                <v-col cols="3"><div class="cname">เปลี่ยนรหัสผ่านล่าสุด :</div></v-col>
                <v-col>{{getThaiDateTime(item.pwdlastset)}}</v-col>
            </v-row>
             <v-row>
                <v-col cols="3"><div class="cname">ใส่รหัสผ่านผิดพลาดล่าสุด :</div></v-col>
                <v-col>{{getThaiDateTime(item.badpasswordtime)}}</v-col>
            </v-row>
            
        </div>
    </div>
</div>
</template>
<script>
    import axios from 'axios';
export default {  
  data(){
    return  {
        results : null,
        keyword: '',
        search_with: [
            {id: 0,text: 'ค้นหาด้วย'},
            {id: 1,text: 'ชื่อ-สกุล'},
            {id: 2,text: 'Account'},
            {id: 3,text: 'ประเภทผู้ใช้'},
        ],
        search_select: {id: 0,text: 'ค้นหาด้วย'},
        adv_toggle: false,
        arr_adv_search: [],
        waiting: false
    }
  },
  mounted(){
    
  },
  methods: {
    async search(){
        
        if (this.keyword == ''){
            return;
        }
        this.waiting = await true;
        let path = await `/api/search_ad`;
        let res = await axios.post(`${path}`,{
            'field' : 'quick',
            'value' : this.keyword
        })
        this.waiting = await false;
        this.results = await res.data;
    },
    getThaiDateTime(item){
        if (item == "Never Expire"){
            return item;
        }
        if (item){
            var locale = window.navigator.userLanguage || window.navigator.language;
            var d = new Date(item);
        return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        }else{
            return "";
        }
    },
    getToggle(){
        return this.adv_toggle ? 'เปิด' : 'ปิด';
    },
    async clearSearch(){
        this.results = await [];
        this.keyword = await '';     
      
    }
  },
  
  components : {
    
  }
}
</script>
<style scoped>
.container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #f5f2f2;
    box-sizing: border-box;
}
.container .search{
    
    display: flex;
    width: 400px;
    height: 50px;		
    justify-content:flex-start;
    margin: 30px 0 10px;
    border: 1px solid #3d3d3d;
    border-radius: 60px;
    align-items: center;
    background: #fff;    
    padding: 0px!important;
    transition: opacity 0.2s ease;

}
.container .search .clear{
    width: 20px;
    height: 15px;
    margin-left: 10px;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .search .clear .fa{
    margin-left: 10px;
}
/* .container .search .clear::before{
    position: absolute;
    content: '';
    width: 1px;
    height: 15px;
    background: #000;
    transform: rotate(45deg);
}
.container .search .clear::after{
    position: absolute;
    content: '';
    width: 1px;
    height: 15px;
    background: #000;
    transform: rotate(-45deg);
}
.container .search i:nth-child(1){
    width: 40px;
    margin-left: 10px;
}
.container .search i:nth-last-child(1){
    width: 40px;
    cursor: pointer;
} */
.container .search .searchTerm {
    width: 320px;
    border: 0;
    border-right: none;
    padding: 5px;
    margin-left: 20px;
    height: 35px;
    background: rgb(255, 255, 255);
    outline: none;
    color: #000000;
    font-size: 1em;
}

.container .show{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.container .show .detail{
    width: 100%;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    background: #f5f2f2;
    box-shadow:  5px 5px 10px #d4d4d4,
            -5px -5px 10px #ffffff;
                
    
}
.cname{
    widows: 100%;
    text-align: right;
    font-weight: 500;
}
.container .advsearch{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    transition: opacity 0.5s ease;
}
.container .advsearch .toggle_search{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    
}
.container .advsearch button{
    margin: 5px;
    
}
</style>