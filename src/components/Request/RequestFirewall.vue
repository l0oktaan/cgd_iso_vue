<template>
    <v-row>
        <v-col cols="12">
            <v-card class="pa-2">
                <v-form>
                    <v-row>
                        <v-col :cols="col_l" class="text-right">ชื่อเรื่อง :</v-col>
                        <v-col :cols="col_r">
                            <v-text-field
                                solo
                                dense
                                label=""
                            >

                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return {
            col_l: 3,
            col_r: 9
        }
    }
}
</script>

<style>

</style>