<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <org></org>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Organization from '../components/Organization.vue'
export default {
    components:{
        'org':Organization
    },
}
</script>

<style>

</style>