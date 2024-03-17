<template>
<div>
<v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"    
>
    <template v-slot:activator="{ on, attrs }">
        <v-text-field                                                        
            :value="getEndThaiDate"
            :label="label ? label : 'วันที่'"
            readonly
            v-bind="attrs"
            v-on="on"
            outlined
            dense
            clearable
            prepend-icon="mdi-calendar"
            @click:clear="date=null"
        ></v-text-field>
    </template>
    <v-date-picker
        
        v-model="date"
        no-title
        scrollable
        locale="th-TH"
        >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="menu = false"
        >
            ยกเลิก
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
        >
            ตกลง
        </v-btn>
    </v-date-picker>
</v-menu>
</div>
</template>

<script>
export default {
    props: ['label','show_date'],
    data(){
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false
        }
    },
    watch:{
        show_date(){            
            if(this.show_date){
                this.date = this.show_date
            }
        },
        date(){
            this.$emit("change_date",this.date)
        }
    },  
    computed: {        
        getEndThaiDate(){
            console.log('get thai date')
            if (this.date){
                var d = new Date(this.date);
                return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            }
            
            
            //return moment(String(value)).format('LL')
        },
    },
}
</script>

<style>

</style>