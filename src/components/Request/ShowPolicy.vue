<template>
<v-dialog
    persistent
    width="1100"
    v-model="policy_dialog"
    >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="mr-2"                                            
            outlined
            x-small
            fab
            color="indigo"            
            v-bind="attrs"
            v-on="on"
        >
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </template>

    <v-card>
        <v-card-title class="h4 grey lighten-2">
            {{detail.request_detail}}
        </v-card-title>

        <v-card-text>
        <div class="policy" v-for="(policy,i) in detail.request_policy_detail" :key="i">
            <v-row>
                <v-col class="text-right">
                    <div v-for="(source,j) in getArray(policy.source)" :key="j">
                        <v-chip small label color="primary" class="mt-1 mb-1">{{source.asset}}</v-chip>
                        <v-chip small label outlined color="primary" class="mt-1 mb-1"
                            v-for="(ip,x) in source.ip_address" :key="x"
                        >
                            {{ip}}
                        </v-chip>
                    </div>
                </v-col>
                <v-col cols="1" class="text-center"><v-icon>mdi-arrow-right-thick</v-icon></v-col>
                <v-col class="text-left">
                    <div v-for="(destination,j) in getArray(policy.destination)" :key="j">
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
                        v-for="(port,y) in getArray(policy.service_port)"               
                        :key="y"
                        dark
                    >
                        {{ port }}
                    </v-chip>
                </v-col>
            </v-row>
            
        </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="policy_dialog = false"
            color="error"
        >
            <v-icon left>
                mdi-cancel
            </v-icon>
            ยกเลิก
        </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['detail'],
    data(){
        return {
            policy_dialog: false,
        }
    },
    methods: {
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
        },
    }
}
</script>

<style>

</style>