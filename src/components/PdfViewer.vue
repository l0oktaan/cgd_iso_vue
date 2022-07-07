<template>
    <div class="viewer">
        <h2>{{pathFile}}</h2>
        <vue-pdf-app 
            :pdf="pathFile" 
            @open="openHandler"
        ></vue-pdf-app>
    </div>
</template>
<script>
    import VuePdfApp from "vue-pdf-app";
    import "vue-pdf-app/dist/icons/main.css";
    export default{
        props:["pathFile"],
        components:{
            VuePdfApp
        },
        data:()=>({
            page: 1
        }),
        methods:{
            openHandler(pdfApp) {
              window._pdfApp = pdfApp;
            },
        }
    }
</script>
<style scoped>
    .viewer{
        background: #fff
    }
</style>