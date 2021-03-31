<template>
    <v-menu        
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn                                        
                    color="secondary"
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
            {{selected}}
        </template>
        <v-card>
            <v-row>
                <v-col cols="12">
                    <v-data-table
                    v-model="selected"
                    :headers="header"
                    :items="items"                                                        
                    item-key="id"
                    show-select
                    class="elevation-1"
                    hide-default-footer
                    hide-default-header
                    :search="search"
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
        </v-card>    
    </v-menu>
                
            
</template>

<script>
export default {
    props: ['header','items','select'],

    data(){
        return {
            search: '',
            selected:[]            
        }
    },
    watch: {
        select(){
            this.selected = this.select;
        }
    }
}
</script>

<style>

</style>