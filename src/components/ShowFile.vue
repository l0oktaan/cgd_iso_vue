<template>
    <div class="show_file">    
        <v-tooltip top v-if="file_list.length > 0">
            <template v-slot:activator="{ on, attrs }">    
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="show_dialog"
                >
                <i class="fas fa-file-pdf fa-2x"                   
                   
                ></i>  
            </v-btn>  
            </template>
            <div class="file_name" v-for="(item,index) in file_list" :key="index">{{item.file_title}}</div>
        </v-tooltip>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">    
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="show_dialog"
                >
                <i class="fas fa-plus-circle fa-2x add"></i>
            </v-btn>  
            </template>
            <span>เพิ่มไฟล์</span>
        </v-tooltip>
        <v-dialog
            v-model="file_dialog"
            transition="dialog-bottom-transition"            
            max-width="1100"
        >
            <template v-slot:default="dialog">
                <div class="file_dialog">
                    <v-card-title>
                        <span>เอกสารแนบ</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <div class="flex items-center justify-center w-full h-screen text-center">
                            <div class="bg-gray-100" @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-radius: 5px; padding: 10px; cursor:pointer;">
                                <input type="file" style="display: none;" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                                class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
                            
                                <label for="assetsFieldHandle" class="block">
                                <div  style="cursor:pointer;">
                                    <v-icon left>mdi-paperclip</v-icon> วางไฟล์ที่ต้องการ หรือ คลิก เพื่อเลือกไฟล์<br>
                                    Action Plan, Test Plan, Rollback Plan หรือเอกสารอื่น ๆ                                             
                                </div>
                                </label>                                        
                            </div>
                        </div>

                        <TransitionGroup name="list" tag="span">
                        <v-chip                                     
                            small
                            v-for="(item,index) in file_list" 
                            :key="index"
                            class="ma-2"                                    
                            label
                            close
                            @click="downloadFile(item)"
                            :color="item.id == 0 ? 'green' : 'primary'"    
                            @click:close="deleteFile(item,index)"
                            >
                            {{ item.file_title }}
                        </v-chip>    
                    </TransitionGroup>                    
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn
                            text
                            @click="close_dialog"
                            color="error"
                        >
                            <v-icon left>
                                mdi-cancel
                            </v-icon>
                            ปิด
                        </v-btn>
                    </v-card-actions>                
                </div>
            </template>
        </v-dialog>
    </div>
</template>
<script>
    import Swal from 'sweetalert2';
    import axios from 'axios'
    export default{
        props:["request_id"],
        data:()=>({
            count: 0,
            file_list: [],
            file_dialog: false,
            files:[],
            show_alert: ''
        }),
        mounted(){
            if (this.request_id){
                this.getFile()
            }
        },
        methods:{
            async getFile(){
                // let path = await `/api/request_forms/${id}/request_files`;

                let response = await axios.get(`/api/request_forms/${this.request_id}/request_files`)             
                this.file_list = await JSON.parse(JSON.stringify(response.data.data));                
            },
            show_dialog(){
                this.file_dialog = true;
            },
            async onChange() {
                let files = await [...this.$refs.file.files];
                if (files){
                    for (let i=0;i<files.length;i++){
                        
                        if (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'application/pdf'){
                            // this.document_files.push(files[i]);
                            // this.form_edit.document_relate.push(files[i].name);
                            let file = await {
                                id:0,
                                file_title: files[i].name,
                                file_content: files[i]
                            }
                            await this.file_list.push(file);
                        }                        
                    }
                    await this.uploadFile();
                    
                }
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
            async uploadFile(){
                let path = `/api/request_forms/${this.request_id}/request_files`;
                try {
                    for (let i=0;i<this.file_list.length;i++){
                        let formData = new FormData();
                        if (this.file_list[i].id == 0){
                            
                            formData.append('file',this.file_list[i].file_content);
                            formData.append('file_title',this.file_list[i].file_title);
                            let response = await axios.post(`${path}`,formData,
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    },
                                    // onUploadProgress: function( progressEvent ) {
                                    //     this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
                                    // }.bind(this)
                                })                                
                        }
                    }
                    await console.log("Upload Completed")
                    await this.getFile();
                } catch (error) {
                    this.show_alert = "error";
                }
                
            },
            async deleteFile(item,index) {
                if (item.id == 0){
                    this.file_list.splice(index,1);
                }else{
                    Swal.fire({
                        title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",                
                        icon: "warning",
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: `ยืนยัน`,
                        cancelButtonText: `ยกเลิก`,
                        }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            this.delFile(item.id);
                        } else if (result.isDenied) {
                            // Swal.fire('Changes are not saved', '', 'info')
                        }
                    })                   
                }
            },
            downloadFile(item){
                if (item.id !=0 ){
                    let path = `/api/request_forms/${this.request_id}/request_files/${item.id}`;
                    axios({
                        url : `${path}`,
                        methods : 'GET',
                        responseType : 'blob'
                    })
                    .then(response=>{
                        var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                        
                        var fileLink = document.createElement('a');
                        fileLink.href = fileURL;
                        let filename = item.file_title;
                        console.log(filename)
                        fileLink.setAttribute('download', filename);
                        document.body.appendChild(fileLink);
                        window.open(fileLink, "_blank");
                        // fileLink.click();               
                    })
                    .catch(error=>{

                    })
                }
            },
            async delFile(id){
                
                let path = await `/api/request_forms/${this.request_id}/request_files/${id}`;
                try {
                    let response = await axios.delete(`${path}`);
                    await this.getFile();
                    this.show_alert = await "success";
                    
                } catch (error) {
                    this.show_alert = await "error";
                }
            },
            async close_dialog(){
                // this.file_list = await [];
                await this.getFile();
                this.file_dialog = await false;
            }
        }
    }
</script>
<style scoped>
    .show_file{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
    }
    i{
        cursor: pointer;
        color: red;
        margin-left: 5px;
    }
    i.add{
        color: rgb(25, 196, 10);
    }
    .file_name{
        margin: 0;
        padding: 0;
    }
    .file_dialog{
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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>