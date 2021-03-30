<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <h4 class="text-center">แบบบันทึกการร้องขอการเปลี่ยนแปลงหรือแก้ไขระบบ (Request for Change)</h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                >
                <form @submit.prevent="submit">
                    <v-card
                        elevation="4"
                        class="mycard"
                    >             
                        <v-row>
                            <v-col cols="12" >ส่วนที่ 1 รายละเอียดของการเปลี่ยนแปลงหรือแก้ไขระบบ</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">เรื่อง :</p>
                            </v-col>
                            <v-col cols="9" >
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="title"
                                    rules="required"
                                >
                                    <v-text-field
                                        dense
                                        v-model="title"
                                        :rules="rules"
                                        :error-messages="errors"
                                        hide-details="auto"     
                                        
                                        outlined
                                        data-vv-name="title"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">รายละเอียด :</p>
                            </v-col>
                            <v-col cols="9" >
                                
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                color="success"
                                                rounded
                                                dark
                                                v-bind="attrs"
                                                v-on="on"
                                                
                                                dense
                                            >
                                                <v-icon left>
                                                    mdi-plus
                                                </v-icon>
                                                เพิ่มรายละเอียด
                                            </v-btn>                               
                                        
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="(item, index) in detail_type"
                                            :key="index"
                                            link
                                        >
                                            <v-list-item-title @click="call_detail_type(item.value)" class="mymenu">
                                                {{ item.text }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-dialog
                                    transition="dialog-bottom-transition"
                                    persistent
                                    max-width="600"
                                    v-model="detail_dialog"
                                >
                                    
                                    <template v-slot:default="dialog">
                                    <v-card>      
                                        <v-card-title>
                                            <span> รายละเอียดของการร้องขอ</span>
                                        </v-card-title>                      
                                        <v-card-text class="mt-4">
                                            <v-row justify="center">         
                                                <v-col cols="12">            
                                                    <v-textarea
                                                        v-model="detail"
                                                        outlined
                                                        label="รายละเอียด"
                                                        no-resize
                                                        rows="2"
                                                        
                                                    ></v-textarea>
                                                </v-col>                                    
                                            </v-row>
                                            <v-row  justify="center">
                                                <v-col cols="3">
                                                    <v-btn
                                                        
                                                        color="primary"
                                                        rounded
                                                        dark                
                                                        dense
                                                        @click="save_detail"
                                                    >
                                                        <v-icon left>
                                                            mdi-content-save-outline
                                                        </v-icon>
                                                        บันทึกรายละเอียด
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions class="justify-end">
                                        <v-btn
                                            text
                                            @click="dialog.value = false"
                                            color="error"
                                        >
                                            <v-icon left>
                                                mdi-cancel
                                            </v-icon>
                                            ยกเลิก</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </template>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="9">
                                <div v-for="(detail,index) in detail_list" :key="index">
                                    
                                    <v-alert             
                                        
                                        
                                        color="primary"
                                        border="left"
                                        elevation="2"
                                        colored-border
                                        :icon="'mdi-numeric-' + (index+1) + '-circle-outline'"
                                        >
                                        <v-row>
                                            <v-col cols="10">{{detail.text}}</v-col>
                                            <v-col> 
                                                <div class=text-right>
                                                    <v-btn
                                                        class="mr-2"                                            
                                                        outlined
                                                        x-small
                                                        fab
                                                        color="indigo"
                                                        @click="call_detail_type(1)"
                                                        >
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn     
                                                                                            
                                                        fab
                                                        dark
                                                        x-small
                                                        color="error"
                                                        @click="detail_list.splice(index,1)"
                                                        >
                                                        <v-icon>
                                                            mdi-close
                                                        </v-icon>
                                                    </v-btn>
                                                </div>                                       
                                                
                                            </v-col>
                                        </v-row>
                                        
                                    </v-alert>
                                    
                                </div>            
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">เหตุผล :</p>
                            </v-col>     
                            <v-col cols="9">
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="เหตุผล"
                                    rules="required"
                                >
                                <v-text-field
                                    dense
                                    v-model="reason"
                                    :rules="rules"
                                    hide-details="auto"          
                                    :error-messages="errors"
                                    outlined
                                ></v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row> 
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">เอกสารประกอบ (ถ้ามี) :</p>
                            </v-col>     
                            <v-col cols="9 mb-2">
                                
                                <div class="flex items-center justify-center w-full h-screen text-center">
                                    <div class="bg-gray-100" @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-radius: 5px; padding: 10px; cursor:pointer;">
                                        <input type="file" style="display: none;" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                                        class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
                                    
                                        <label for="assetsFieldHandle" class="block">
                                        <div  style="cursor:pointer;">
                                            Action Plan, Test Plan, Rollback Plan หรือเอกสารอื่น ๆ <br>
                                            <v-icon left>mdi-paperclip</v-icon> วางไฟล์ที่ต้องการ หรือ คลิก เพื่อเลือกไฟล์
                                        </div>
                                        </label>
                                        
                                    </div>
                                </div>
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">                                
                            </v-col>     
                            <v-col cols="9 pt-0 pl-0 mb-2">
                                
                                <v-chip                                     
                                    small
                                    v-for="(item,index) in document_files" 
                                    :key="index"
                                    class="ma-2"
                                    close
                                    color="primary"                                 
                                    @click:close="deleteFile(index)"
                                    >
                                    {{ item.name}}
                                </v-chip>
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <!-- <v-col cols="3">
                                <p class="topic">เอกสารประกอบ (ถ้ามี) :</p>
                            </v-col>     
                            <v-col cols="9"> -->
                                                                       
                                        <!-- <upload-btn
                                            title="แนบเอกสาร"
                                            @file-update="check_files"
                                            color="success"
                                            multiple
                                           
                                            outline
                                            
                                            large
                                            noTitleUpdate
                                            labelClass="upload"
                                            accept="image/jpeg,image/png,application/pdf"
                                        >
                                            <template slot="icon-left">
                                                <v-icon left>mdi-paperclip</v-icon>
                                            </template>
                                        </upload-btn> -->
                                    
                                        
                                        <!-- <v-file-input
                                            ref="doc_files"
                                            v-model="files"
                                            accept="image/jpeg,image/png,application/pdf"
                                            label="เลือกไฟล์เอกสาร"
                                            multiple
                                            outlined
                                            dense
                                            :clearable="false"
                                            @change="check_files"
                                            
                                            prepend-icon="mdi-camera"                          
                                        >
                                            template v-slot:selection="{ index,text }">
                                                <v-chip
                                                    small                                            
                                                    color="primary"
                                                    close         
                                                    @click:close="deleteChip(index)"                                   
                                                >
                                                    {{ text }}
                                                </v-chip>
                                            </template> 
                                        </v-file-input> -->
                                        
                                
                                
                                
                                
                                
                                <!-- <v-combobox multiple
                                    v-model="document_relate" 
                                    :items="document_list"
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    hide-details="auto"   
                                    label="เลือกเอกสารประกอบ หรืออื่นๆ โปรดระบุ"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            close
                                            color="primary"                                        
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"                                        
                                            @click:close="data.parent.selectItem(data.item)"
                                            >
                                            {{ data.item.text || data.item}}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-col> -->
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">ผู้เกี่ยวข้อง :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="person_relate" 
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    label="รายชื่อผู้เกี่ยวข้อง กด tab เพื่อเพิ่มหลายรายชื่อ"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            close
                                            color="primary"
                                            small
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"                                        
                                            @click:close="data.parent.selectItem(data.item)"
                                            >                                        
                                            {{ data.item }}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-col>
                        </v-row>

                    </v-card> 
            
                    <v-card class="mycard mb-5 mt-5">
                        <v-row>
                            <v-col cols="12" >ส่วนที่ 2 สำหรับประเมินผลกระทบ</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">ประเภท :</p>
                            </v-col>     
                            <v-col cols="9">
                               
                                <!-- <v-chip-group
                                    v-model="change_type"
                                    column                                        
                                                                           
                                >
                                    <v-chip
                                        filter
                                        outlined                                            
                                    >
                                        Normal Change
                                    </v-chip>
                                    <v-chip
                                        filter
                                        outlined
                                    >
                                        Emergency Change
                                    </v-chip>                                        
                                </v-chip-group> -->
                                <v-radio-group 
                                    v-model="change_type"
                                    row
                                    dense
                                    mandatory
                                >
                                    <v-row>
                                        <v-col cols="4">
                                            <v-radio
                                                label="Normal Change"
                                                :value="1"
                                            ></v-radio>
                                        </v-col>
                                        <v-col  cols="4">
                                            <v-radio
                                                label="Emergency Change"
                                                :value="2"
                                            ></v-radio>
                                        </v-col>
                                        <v-col  cols="4">

                                        </v-col>
                                       
                                    </v-row>
                                    
                                    
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">ระบบที่เกี่ยวข้อง :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="system_relate" 
                                    :items="system_list"
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    
                                    hide-details="auto"
                                    label="เลือกระบบที่เกี่ยวข้อง ระบบอื่นๆ โปรดระบุ"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            close
                                            small
                                            color="primary"                                        
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"                                        
                                            @click:close="data.parent.selectItem(data.item)"
                                            >
                                            {{ data.item.text || data.item}}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">สภาพแวดล้อมที่มีผลกระทบ :</p>
                            </v-col>     
                            <v-col cols="9">
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="env_impact"
                                    rules="required"
                                >                                  
                                    <!-- <v-chip-group
                                        v-model="env_impact"
                                        column
                                        multiple
                                        :error-messages="errors"
                                        
                                    >
                                        <v-chip
                                            filter
                                            outlined
                                            
                                        >
                                            Production
                                        </v-chip>
                                        <v-chip
                                            filter
                                            outlined
                                            
                                        >
                                            Development
                                        </v-chip>
                                        <v-chip
                                            filter
                                            outlined
                                            
                                        >
                                            Test/QA
                                        </v-chip>
                                        
                                    </v-chip-group> -->
                                    <v-row>
                                        <v-col cols="4">
                                            <v-checkbox
                                                v-model="env_impact"
                                                label="Production"
                                                value="1"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-checkbox
                                                v-model="env_impact"
                                                label="Development"
                                                value="2"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-checkbox
                                                v-model="env_impact"
                                                label="Test/QA"
                                                value="3"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    
                                    
                                    
                                </validation-provider>                          
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">ส่งผลกระทบต่อระบบ :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="system_impact" 
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    hide-details="auto"
                                    label="ระบบที่กระทบ กด tab เพื่อเพิ่มหลายระบบ"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            close
                                            color="primary"
                                            small
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"                                        
                                            @click:close="data.parent.selectItem(data.item)"
                                            >                                        
                                            {{ data.item }}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">ระดับผลกระทบ :</p>
                            </v-col>     
                            <v-col cols="9"> 
                                <!-- <v-chip-group
                                    v-model="impact_level"
                                    column                                       
                                                                           
                                >
                                    <v-chip
                                        
                                        filter
                                        outlined  
                                        class="high"                                          
                                    >
                                        สูง (High)
                                    </v-chip>
                                    <v-chip
                                        filter
                                        outlined
                                        
                                    >
                                        ปานกลาง (Medium)
                                    </v-chip> 
                                    <v-chip
                                        filter
                                        outlined
                                        
                                        class="low" 
                                    >
                                        ต่ำ (Low)
                                    </v-chip>                                        
                                </v-chip-group>                                -->
                                <v-radio-group 
                                    v-model="impact_level"
                                    row
                                    dense
                                    mandatory
                                >
                                    <v-row>
                                        <v-col cols="4">
                                            <v-radio
                                                label="สูง (High)"
                                                :value="3"
                                            ></v-radio>
                                        </v-col>
                                        <v-col  cols="4">
                                            <v-radio
                                                label="ปานกลาง (Medium)"
                                                :value="2"
                                            ></v-radio>
                                        </v-col>
                                        <v-col  cols="4">
                                            <v-radio
                                                label="ต่ำ (Low)"
                                                :value="1"
                                            ></v-radio>
                                        </v-col>
                                       
                                    </v-row>
                                    
                                    
                                </v-radio-group>
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">ช่วงวันทีดำเนินการ :</p>
                            </v-col>
                            <v-col>
                                <v-menu
                                    ref="begin_date_menu"
                                    v-model="begin_date_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="begin_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field                                                        
                                            v-model="getBeginThaiDate"
                                            label="ตั้งแต่วันที่"                                    
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            prepend-icon="mdi-calendar"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="begin_date"
                                        no-title
                                        scrollable
                                        locale="th-TH"
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="begin_date_menu = false"
                                        >
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.begin_date_menu.save(begin_date)"
                                        >
                                            ตกลง
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>                        
                            <v-col>                           
                                <v-menu
                                    ref="end_date_menu"
                                    v-model="end_date_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="end_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field                                                        
                                            :value="getEndThaiDate"
                                            label="สิ้นสุด"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            outlined
                                            dense
                                            clearable
                                            prepend-icon="mdi-calendar"
                                            @click:clear="end_date=null"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="end_date"
                                        no-title
                                        scrollable
                                        locale="th-TH"
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="end_date_menu = false"
                                        >
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.end_date_menu.save(end_date)"
                                        >
                                            ตกลง
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="9">
                                <v-row>
                                    <v-col>
                                        <v-menu
                                            ref="begin_time_menu"
                                            v-model="begin_time_menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="begin_time"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="begin_time"
                                                label="ตั้งแต่เวลา"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                outlined
                                                dense
                                                clearable
                                                @click:clear="begin_time=null"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                v-if="begin_time_menu"
                                                v-model="begin_time"
                                                full-width
                                                
                                                @click:minute="$refs.begin_time_menu.save(begin_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>                        
                                    <v-col>  
                                        <v-menu
                                            ref="end_time_menu"
                                            v-model="end_time_menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="end_time"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="end_time"
                                                label="ถึงเวลา"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                outlined
                                                dense
                                                clearable
                                                @click:clear="end_time=null"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                format="24hr"
                                                v-if="end_time_menu"
                                                v-model="end_time"
                                                full-width
                                                
                                                @click:minute="$refs.end_time_menu.save(end_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card class="mycard mb-5 mt-5"> 
                        <v-row justify="center">                            
                            <v-col cols="4">
                                <div class="text-center">
                                    <v-btn
                                        class="ma-3"
                                        rounded
                                        color="primary"
                                        
                                        type="submit"
                                        :disabled="invalid"
                                    >
                                        <v-icon left>
                                            mdi-content-save-outline
                                        </v-icon>
                                        บันทึก
                                    </v-btn>
                                    <v-btn
                                        text
                                        @click="reset"
                                        color="error"
                                    >
                                        <v-icon left>
                                            mdi-cancel
                                        </v-icon>
                                        ยกเลิก</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>
                </form>
                </validation-observer>
            </v-col>
        </v-row>
        
  </v-container>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
...required,
message: 'กรุณาใส่ข้อมูล',
})
extend('max', {
...max,
message: 'ความยาวไม่เกิน {length} ตัวอักษร',
})
extend('digits', {
    ...digits,
    message: 'ใส่ได้เฉพาะตัวเลข และจำนวน {length} หลัก',
})
extend('regex', {
    ...regex,
    message: 'รูปแบบข้อมูลไม่ถูกต้อง',
})
export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      'upload-btn':UploadButton
    },
    delimiters: ['${', '}'], // Avoid Twig conflicts
    created(){
        
    },
    
    data(){
        return {
            invalid: false,

            detail_dialog: false,
            alert: true,
            rules: [v => v.length <= 250 || 'เกิน 250 ตัวอักษร'],
            title: '',
            detail: '',
            reason: '',
            document_relate: [],
            files: [],
            document_files: [],

            document_list: [
                {value : 1, text: 'Action Plan'},
                {value : 2, text: 'Testing Plan'},
                {value : 3, text: 'Rollback Plan'},                             
            ],
            person_relate: [],
            change_type: 1,   
            system_relate: [],
            system_list: [
                {value : 1, text: 'Data Center'},
                {value : 2, text: 'Backup System'},
                {value : 3, text: 'Security System'},
                {value : 4, text: 'Hardware'},
                {value : 5, text: 'Network'},
                {value : 6, text: 'Operation System'}                
            ],   
            env_impact: [],
            system_impact: [],
            impact_level: 1,
            
            
            begin_date: new Date().toISOString().substr(0, 10),
            begin_date_menu: false,
            end_date: null, //new Date().toISOString().substr(0, 10),
            end_date_menu: false,
            begin_time: null,
            end_time: null, 
            begin_time_menu: false,           
            end_time_menu: false,


            detail_list: [],
            detail_type: [                
                {text: 'เรื่องทั่วไป',value: 1},
                {text: 'เกี่ยวกับ Policy Firewall',value: 2},
            ],
            form_default:{
                title:'',
                detail:[],
                reason: '',
                document_relate: [],
                document_files: [],
                person_relate: [],
                change_type:0,
                system_relate:[],
                env_impact:[],
                system_impact:[],
                impact_level:1,
                begin_date: new Date().toISOString().substr(0, 10),                
                end_date: null,                
                begin_time: null,
                end_time: null,                
            },
            form_edit:{
                title:'',
                detail:[],
                reason: '',
                document_relate: [],
                document_files: [],
                person_relate: [],
                change_type:0,
                system_relate:[],
                env_impact:[],
                system_impact:[],
                impact_level:1,
                begin_date: new Date().toISOString().substr(0, 10),                
                end_date: null,                
                begin_time: null,
                end_time: null,
            }
        }
    },
    watch: {
        document_files(){
            console.log('files : ' + this.document_files.length);
        }
    },
    computed: {
        getBeginThaiDate(){
            var d = new Date(this.begin_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
        getEndThaiDate(){
            if (this.end_date){
                var d = new Date(this.end_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            }else{
                return '';
            }
            
            //return moment(String(value)).format('LL')
        },
    },
    methods: {
        save_detail(){
            this.detail_list.push({
                'text': this.detail,
                'value': this.detail_list.length + 1
            });
            this.detail = '';
            this.detail_dialog = false;
        },
        call_detail_type(type){
            if (type==1){
                this.detail_dialog = true;
            }
            
        },
        check_files(files){
            if (files){
                for (let i=0;i<files.length;i++){
                    this.document_files.push(files[i]);
                }
            }
            

            //this.document_files = this.files;
        },
        deleteFile(index) {
      // Prompt here with text if required
            this.document_files.splice(index, 1)
        },
        
        onChange() {
            let files = [...this.$refs.file.files];
            if (files){
                for (let i=0;i<files.length;i++){
                    console.log(files[i].type);
                    if (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'application/pdf'){
                        this.document_files.push(files[i]);
                    }                    
                }
                
                
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
        reset(){
            // this.$router.go(-1);
            this.$router.push('/request_change');
        }
    
        
        
        
    }
}
</script>

<style scoped>
.mycard{
    padding: 20px !important;
    
}
.mymenu{
    cursor: pointer;
}
.col{
    padding: 8px!important;
}
.topic{
    width: 100%!important;
    text-align: right!important;
    vertical-align: top!important;
    padding-top: 8px;
    
}
.v-select__selections{
    padding-top: 5px!important;
    
}
.v-input--radio-group--row, .v-input--checkbox{
    margin-top: 5px!important;
}

.v-chip.v-chip--outlined.v-chip{
    background-color: #797373!important;    
}
.v-chip.v-chip--outlined.v-chip.v-chip--active{
    background-color: #1976d2!important;
    color:#ffffff!important;
}
.v-chip.v-chip--outlined.v-chip.v-chip--active.high{
    background-color: #d81a1a!important;
    color:#ffffff!important;
}
.v-chip.v-chip--outlined.v-chip.v-chip--active.low{
    background-color: #0cbd05!important;
    color:#ffffff!important;
}
.v-chip.v-chip--outlined{
    border-color: #1976d2!important;
    
}
.v-chip.v-chip--outlined.high{
    border-color: #d81a1a!important;
    
}
.v-chip.v-chip--outlined.low{
    border-color: #0cbd05!important;
}
.v-chip.v-chip--outlined.v-chip.v-chip{
    
}

.upload-btn{
    margin-top: 10px!important;
    font-size: 0.9em!important;
    padding-left: 5px!important;
}
.upload-btn > .v-btn__content{
    padding-top: 10px!important
}
.bg-gray-100{
    background-color: #c5c5c5;
    border: 1px solid #c5c5c5;
}
.bg-green-300{
    background-color: #7ace79; 
    border: 1px solid #c5c5c5;  
    
}

</style>>

</style>