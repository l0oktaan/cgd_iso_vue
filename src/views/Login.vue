<template>
  
        <v-card
          class="d-flex justify-center align-center mb-6"
          color="grey lighten-2"
          flat
          height="100%"
          width="100%"
          tile
          
        >
          <!-- <my-login></my-login>    -->
          <v-card
            class="mx-auto"
            elevation="4"
            width="650"
            height="450"
            transition="fade-transition"
          >
            <v-row>
              <v-col class="text-center" cols="6" sm="0">
                
                    <div class="logo d-flex flex-column align-center">
                      <v-img
                        
                        style="text-align:text-center"
                      contain
                      width="150"
                      height="150"
                        src="@/assets/cgd.png"
                    ></v-img>
                    
                    </div>
                  
                
                
              </v-col>
              <v-col xs="12" sm="6">
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12">
                      <h2 class="pt-10 text-center">Request for Change System</h2>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <validation-observer
                        ref="observer"
                        v-slot="{ invalid }"
                      >
                        <form @submit.prevent="submit">
                          <validation-provider
                            v-slot="{ errors }"
                            name="username"
                            rules="required|max:20"
                          >
                            <v-text-field
                              dense
                              label="Username"
                              outlined
                              v-model="username"
                              placeholder=" "
                              :error-messages="errors"
                              @keyup.enter=""
                              
                            ></v-text-field>
                            
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="password"
                            rules="required|max:20"
                          >
                            <v-text-field
                              ref="pws"
                              dense
                              label="Password"
                              outlined
                              v-model="password"
                              type="password"
                              placeholder=" "
                              :error-messages="errors"
                              @keyup.enter="submit"
                              
                            ></v-text-field>
                            
                          </validation-provider>                  
                          

                          <v-btn
                            class="mr-4"
                            type="submit"
                            rounded
                            block
                            color="primary"                    
                            :disabled="isSubmit"
                          >
                            Login
                          </v-btn>                  
                        </form>
                      </validation-observer>
                    </v-col>
                  </v-row>
                </v-container>
                
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      
      
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')

import MyLogin from "../components/Login.vue";

export default {
  components: {
      //MyLogin
      ValidationProvider,
      ValidationObserver,
  },
  data() {
    return {
      username: '',
      password: '',

      invalid: false,
      isSubmit: false
    };
  },
  methods:{
      async submit(){
        if (this.$refs.observer.validate()){
          try {
            this.isSubmit = true;
            await this.$store.dispatch('login',{
              username : this.username,
              password : this.password
            })
            
            if (this.$store.getters.user){
              this.$router.push({name:"ISO"});
            }
          } catch (error) {
            setTimeout(() => {
              this.isSubmit = false;
            }, 1000);
            
          }
          
          
        }
        
      }
    }
  
  
};
</script>
<style scoped>
  .logo{
    background-color: rgb(17, 113, 238);
    width: 100%;
    height: 450px;
  }
  .container{
    padding-left: 0!important;
  }
  </style>