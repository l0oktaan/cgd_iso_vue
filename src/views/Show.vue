<template>
    <div>   
        <my-date ref="date1" :show_date="show_date" @change_date="change_date"></my-date>     
        <v-btn @click="setDate">Set Date</v-btn>  
        {{get_date}} 
    </div>
    
</template>

<script>
import MyDate from '@/components/MyDate'
export default {
    components:{
        'my-date':MyDate
    },
    data:()=>({
        show_date: null,
        get_date: null
    }),
    methods:{
        async setDate(){
            this.show_date = await "2022-10-20"
            this.show_date = await null
        },
        getDate(){
            return this.$refs.menu.date
        },
        change_date(date){
            this.get_date = date
        }
    }

}
</script>

<style scoped>
div{
    max-width: 400px;
    padding: 10px;
}
</style>>

</style>