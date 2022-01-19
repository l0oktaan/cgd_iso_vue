<template>
    <v-menu        
        :close-on-content-click="closeMenu"        
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
        <v-card>
            <v-row>
                <v-col cols="12">
                    <v-data-table
                    v-model="selected"
                    :headers="header"
                    :items="items"    
                    :items-per-page="8"                                                    
                    item-key="code"
                    show-select
                    class="elevation-1"                    
                    hide-default-header
                    :search="search"
                    :footer-props="{
                        disableItemsPerPage: true
                    }"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>
                                <v-icon>mdi-server</v-icon>
                                รายการอุปกรณ์
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
                    </template>
                </v-data-table>                
                </v-col>
            </v-row>
            <v-card-actions class="justify-end">
            <v-btn
                text
                @click="closeMenu=true"
                color="error"
            >
                <v-icon left>
                    mdi-cancel
                </v-icon>
                ปิด</v-btn>
            </v-card-actions>
        </v-card>    
    </v-menu>              
            
</template>

<script>
export default {
    props: ['header','items','select','index'],

    data(){
        return {
            
            search: '',
            selected:[],
            closeMenu:false
        }
    },
    mounted(){        
            this.$nextTick(()=>{
                this.selected = this.select;
            })
    },
    watch: {
        select(){
            this.$nextTick(()=>{
                this.selected = this.select;
                
            });            
        },
        selected(){
            this.$nextTick(()=>{                
                this.$emit('updateItem',{index:this.index,value:this.selected});
            });  
        }
    }
}
</script>

<style scoped>
.v-btn--fab.v-size--x-small{
    height: 25px!important;
    width: 25px!important;
}
</style>>

</style>