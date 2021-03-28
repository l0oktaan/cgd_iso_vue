<template>
    <v-row justify="center" class="mt-4">
        <v-col cols="8">
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        dense
                        v-model="title"
                        :rules="rules"
                        counter="25"
                        hint="This field uses counter prop"
                        label="Regular"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        dense
                        v-model="name"
                        label="คำค้น"
                        
                        outlined                        
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="6">
                    <div class="text-center">
                        <v-btn
                            class="ma-3"
                            rounded
                            color="primary"
                            dark
                        >
                            Search
                        </v-btn>
                        <v-btn
                            class="ma-3"
                            outlined
                            rounded
                            color="error"
                            dark
                        >
                            Clear
                        </v-btn>
                    </div>
                    
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
      return {
        name: "หาชื่อ",
        
        

        title: 'Preliminary report',
        description: 'California is a state in the western United States',
        rules: [v => v.length <= 25 || 'Max 25 characters'],
        wordsRules: [v => v.trim().split(' ').length <= 5 || 'Max 5 words'],
      }
    },
}
</script>

<style>

</style>