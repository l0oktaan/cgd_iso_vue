<template>
  <v-card
    class="mx-auto"
    elevation="4"
    width="650"
    height="450"
    transition="fade-transition"
  >
    <v-row>
      <v-col class="text-center" xs="0" sm="6">
        
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
                    rules="required|max:10"
                  >
                    <v-text-field
                      dense
                      label="Username"
                      outlined
                      v-model="username"
                      placeholder=" "
                      :error-messages="errors"
                      
                      
                    ></v-text-field>
                    
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required|max:10"
                  >
                    <v-text-field
                      dense
                      label="Password"
                      outlined
                      v-model="password"
                      type="password"
                      placeholder=" "
                      :error-messages="errors"
                      
                      
                    ></v-text-field>
                    
                  </validation-provider>                  
                  

                  <v-btn
                    class="mr-4"
                    type="submit"
                    rounded
                    block
                    color="primary"
                    dark
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
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: 'กรุณาใส่ {_field_}',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })
export default {
  components: {
      ValidationProvider,
      ValidationObserver,
    },
    data() {
      return {
        username: '',
        password: '',

        invalid: false
      }
    }
}
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
</style>>

</style>