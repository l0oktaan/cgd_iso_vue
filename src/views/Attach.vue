<template>
    <div> 
        <v-data-table
            :headers="headers"
            :items="request_list"
            :items-per-page="15"
            :loading="loadTable"
            loading-text="Loading... Please wait"
            class="elevation-1"
            :search="search"
            >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                  <v-toolbar-title>
                    <v-icon large>mdi-stack-exchange</v-icon>
                    รายการเปลี่ยนแปลงข้อมูล</v-toolbar-title> 
                  
                  
                  <v-spacer></v-spacer>        
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="ค้นหา"
                        single-line
                        hide-details
                  ></v-text-field>          
                </v-toolbar>

            </template>
            <template v-slot:item.request_no="{ item }">
                
                    {{ getRequestNumber(item) }}
                
            </template>
            <template v-slot:item.fullname="{ item }">
                
                    {{ item.fullname }}
                
            </template>
            <template v-slot:item.status="{ item }">
                <v-progress-circular
                  size=20
                  :value="(item.status/8)*100"
                  :color="getProgress(item.status)"
                ></v-progress-circular>
                    {{ getStatus(item.status) }}
                
            </template>
            
            <template v-slot:item.created_date="{ item }">
                
                    {{ getThaiDate(item.created_date) }}
                
            </template>
            
            <template v-slot:item.files="{ item }">
                <show-file :request_id="item.id"></show-file>
                
                
            </template>
           
                            
            
        
        </v-data-table>
        <v-dialog
            v-model="file_dialog"        
        >
            <div class="showFile">
                {{file_list}}
            </div>
        </v-dialog>
    </div>
</template>
<script>
    import ShowFile from '@/components/ShowFile'
    
    // import VuePdfApp from "vue-pdf-app";
    import axios from 'axios';
    export default{
        components: {
            // VuePdfApp,
            ShowFile,
            
        },
        data:()=>({           
            file_dialog: false,
            source2: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
            request_list: [],
            file_list:[],
            search: '',
            headers: [
                { text: 'วันที่จัดทำ', value: 'created_date', class: ['blue darken-3', 'white--text'],width: '10%'},
                
                {
                    text: 'เลขที่เอกสาร',
                    align: 'start',
                    // sortable: false,
                    value: 'request_no',
                    class: ['blue darken-3', 'white--text', 'head-text'],
                    width: '13%'
                },
                { text: 'เรื่อง', sortable: false, value: 'request_title', class: ['blue darken-3', 'white--text'],width: '35%'},
                    
                    
                { text: 'ผู้ร้องขอ', sortable: true, value: 'fullname', class: ['blue darken-3', 'white--text'],width: '15%'},       
                { text: 'สถานะ', sortable: true, value: 'status', class: ['blue darken-3', 'white--text'],width: '13%'},      
                { text: 'ไฟล์แนบ', value: 'files',class: ['blue darken-3', 'white--text'],width: '10%'},
                
                            
            ],
            loadTable: true,
            // request_id: 0
        }),
        async mounted(){
            await this.fetchData();
            this.loadTable = await false
        },
        methods:{
            showPdf(){
                window.open("650706-SDG3-064t.pdf", '_blank');
            },  
            afterCreated(pdfjs) {
                // non-reactive
                this.pdfjs = pdfjs;
                window._pdf = pdfjs;
            },
            openHandler(pdfApp) {+
                console.log('PDF')
                window._pdfApp = pdfApp;
            },
            async fetchData(){
                await this.$store.dispatch('get_request_list');      
                this.request_list = await this.$store.getters.request_list;
            },
            getThaiDate(item){
                if (item){
                    var d = new Date(item);
                return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
                }else{
                    return "";
                }            
            },
            
            getRequestNumber(item){
                return !item.request_no||item.request_no == '' ? item.group_code + "-" + item.year.toString() + "/---" : item.request_no;
            },
            getStatus(status){
                let val = '';
                switch (status) {
                    case 0:
                    val = 'สร้างใหม่'          
                    break;
                    case 1:
                    val = 'รอการส่ง'          
                    break;
                    case 2:
                    val = 'รอการรับรอง'          
                    break;
                    case 3:
                        val = 'รอการพิจารณา'          
                        break;
                    case 4:
                        val = 'รอการอนุมัติ'          
                        break;
                    case 5:
                        val = 'รอดำเนินการ'          
                        break;
                    case 6:
                        val = 'รอติดตามผล'          
                        break;
                    case 7:
                        val = 'รอตรวจสอบผล'          
                        break;
                    case 8:
                        val = 'เสร็จสิ้น'          
                        break;
                    default:
                    val = '';
                    break;
                    
                }
                return val;
            },
            getProgress(status){
                let progress = status/8*100
                let color = "gray";
                switch (progress) {
                    case 12.5:
                    color = "grey"
                    break;
                    case 25:
                    color = "brown darken-2"
                    break;
                    case 37.5:
                    color = "yellow darken-1"
                    break;
                    case 50:
                    color = "amber darken-4"
                    break;
                    case 62.5:
                    color = "light-blue accent-4"
                    break;
                    case 75:
                    color = "light-blue darken-4"
                    break;
                    case 87.5:
                    color = "green accent-3"
                    break;
                    case 100:
                    color = "success"
                    break;
                
                    default:
                    color = "blue-grey"
                    break;
                }
                return color;
            },
            dragover(event) {
                event.preventDefault();
                    // Add some visual fluff to show the user can drop its files
                    if (!event.currentTarget.classList.contains('bg-green-300')) {
                        event.currentTarget.classList.remove('bg-gray-100');
                        event.currentTarget.classList.add('bg-green-300');
                    }
                },
            dragleave(event) {
                // Clean up
                event.currentTarget.classList.add('bg-gray-100');
                event.currentTarget.classList.remove('bg-green-300');
            },
            drop(event) {
                event.preventDefault();
                this.$refs.file.files = event.dataTransfer.files;
                this.onChange(); // Trigger the onChange event manually
                // Clean up
                document.getElementById('assetsFieldHandle').value= null;
                
                
                
                event.currentTarget.classList.add('bg-gray-100');
                event.currentTarget.classList.remove('bg-green-300');
            },
            
        }
    }
</script>
<style scoped>
.showFile{
    background: #fff;
}
.bg-gray-100{
    background-color: #c5c5c5;
    border: 1px solid #c5c5c5;
}
.bg-green-300{
    background-color: #7ace79; 
    border: 1px solid #c5c5c5;  
    
}
</style>