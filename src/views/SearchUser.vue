<template>    
<div class="container">
    <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" class="searchTerm" placeholder="ค้นหา" 
            id="search" v-model="keyword"@keydown.enter="search"
        data-search>                    
        <div class="clear" data-clear @click="keyword=''"></div>              
        
    </div>
    <div class="show">
        <div class="detail" v-for="(item,index) in results" :key="index">

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
        keyword: ''
    }
  },
  mounted(){
    
  },
  methods: {
    async search(){
        console.log(this.keyword);
        if (this.keyword == ''){
            return;
        }
        let path = await `/api/search_ad`;
        let res = await axios.post(`${path}`,{
            'field' : '',
            'value' : this.keyword
        })
        this.results = await res.data;
    },
    getThaiDateTime(item){
        if (item){
            var locale = window.navigator.userLanguage || window.navigator.language;
            var d = new Date(item);
        return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'});
        }else{
            return "";
        }
    },
  },
  
  components : {
    
  }
}
</script>
<style scoped>
.container{
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.container .search{
    
    display: flex;
    width: 400px;
    height: 60px;		
    justify-content:flex-start;
    margin: 30px 0 10px;
    border: 1px solid #3d3d3d;
    border-radius: 60px;
    align-items: center;
    background: #fff;    

}
.container .search .clear{
    width: 15px;
    height: 15px;
    margin-left: 10px;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container .search .clear::before{
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
}
.container .search .searchTerm {
    width: 305px;
    border: 0;
    border-right: none;
    padding: 5px;
    height: 50px;
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
    width: 500px;
    border-radius: 5px;
}
</style>