<template>
  <div class="text-center">    

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
    props: ['alert','message'],
    data(){
        return {
            timeout: 1500,
            snackbar: false,
            text: ''
        }
    },
    watch: {
        alert(){
            if (this.alert){
                this.text = this.message;
                this.snackbar = true;                
            }
        },
        
    }
}
</script>

<style>

</style>