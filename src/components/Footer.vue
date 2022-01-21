<template>
<v-footer
    dark
    padless
    app
    absolute
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <!-- <v-card-title class="teal">
        

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-title> -->

      <v-card-text class="py-2 white--text text-center">
        <p>ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กรมบัญชีกลาง</p>
        <!-- <a href="https://lin.ee/hZUSyWs"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/th.png" alt="เพิ่มเพื่อน" height="36" border="0"></a> -->
      </v-card-text>
    </v-card>
  </v-footer>  
</template>

<script>
export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
}
</script>

<style>

</style>