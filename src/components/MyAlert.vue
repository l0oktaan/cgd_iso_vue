<template>

</template>
<script>
import VueSweetalert2 from 'vue-sweetalert2';
//import '@sweetalert2/theme-material-ui/material-ui.css';
export default {
  props: ['AlertType'],
  data(){
    return{
      alert: ''
    }
  },
  watch: {
    AlertType(){
      if (this.AlertType != ""){
        switch (this.AlertType){
          case "success":
            this.$swal({
              title: "ทำรายการสำเร็จ",
              icon: "success",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;
          case "error":
            this.$swal({
              title: "เกิดข้อผิดพลาด",
              icon: "error",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;
          case "require":
            this.$swal({
              title: "กรุณาตรวจสอบข้อมูล",
              icon: "error",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;
          case "pass":
            this.$swal({
              title: "เงื่อนไขถูกต้อง",
              icon: "success",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;
          case "notpass":
            this.$swal({
              title: "เงื่อนไขไม่ถูกต้อง",
              icon: "error",
              timer: 1200,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;
            case "no_detail":
            this.$swal({
              title: "กรุณาเพิ่มรายละเอียด",
              icon: "error",
              timer: 2000,
              showCancelButton: false,
              showConfirmButton: false
            });
            break;

          default:
        }
        

        // if (this.AlertType == "success"){
        //   this.$swal({
        //       title: "ทำรายการสำเร็จ",
        //       icon: "success",
        //       timer: 1200,
        //       button: false,
        //   });
        // }else if (this.AlertType == "error"){
        //   this.$swal({
        //       title: "เกิดข้อผิดพลาด",
        //       icon: "error",
        //       timer: 1200,
        //       button: false,
        //   });
        // }else if (this.AlertType == "require"){
        //   this.$swal({
        //       title: "กรุณาตรวจสอบข้อมูล",
        //       icon: "error",
        //       timer: 1200,
        //       button: false,
        //   });
        // }else if (this.AlertType == "pass"){
        //   this.$swal({
        //       title: "เงื่อนไขถูกต้อง",
        //       icon: "success",
        //       timer: 1200,
        //       button: false,
        //   });
        // }else if (this.AlertType == "notpass"){
        //   this.$swal({
        //       title: "เงื่อนไขไม่ถูกต้อง",
        //       icon: "error",
        //       timer: 1200,
        //       button: false,
        //   });
        // }

        this.$parent.show_alert = "";
      }
    }
  }
}
</script>

<style scoped>
.swal-title{
  font-size: 0.8em!important;
}
</style>
