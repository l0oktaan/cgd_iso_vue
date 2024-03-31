<template>
 <div>
        <v-row justify="center">
            <v-col  cols="9">
                <h4 class="text-center">แบบฟอร์มขอตั้งค่า Policy Firewall / VPN</h4>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
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
                            <v-col cols="12" >ส่วนที่ 1 รายละเอียดของการร้องขอตั้งค่า Policy Firewall / VPN</v-col>
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
                                        v-model="form_edit.request_title"
                                        :rules="rules"
                                        :error-messages="errors"
                                        hide-details="auto"     
                                        
                                        outlined
                                        data-vv-name="title"
                                    ></v-text-field>
                                </validation-provider>
                            </v-col>
                        </v-row>
                        <!-- <v-row>    
                            <v-col cols="3">
                                <p class="topic">รายละเอียด :</p>
                            </v-col>     
                            <v-col cols="9">
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="รายละเอียด"
                                    rules="required"
                                    
                                >
                                <v-textarea
                                    dense
                                    rows="4"
                                    v-model="form_edit.request_detail"
                                    :rules="rules"
                                    hide-details="auto"          
                                    :error-messages="errors"
                                    outlined
                                ></v-textarea>
                                </validation-provider>
                            </v-col>
                        </v-row>  -->
                        <v-row>
                            <v-col cols="3">
                                <p class="topic">รายละเอียด :</p>
                            </v-col>
                            <v-col cols="9" >                                
                                
                                <v-btn
                                    color="success"
                                    rounded
                                    dark                                    
                                    class="mb-2"
                                    dense
                                    @click="create_detail(2)"
                                >
                                    <v-icon left>
                                        mdi-plus
                                    </v-icon>
                                    เพิ่มรายละเอียด
                                </v-btn>                               
                                <div class="request_detail" v-for="(detail,index) in detail_list" :key="index">
                                    <div class="detail_top">
                                        <div>
                                            <v-chip
                                            class="ma-2"
                                            color="primary"
                                            >
                                        {{index+1}}
                                            </v-chip>
                                        </div>
                                        <div class="detail_menu">
                                            <show-policy :detail="detail" v-if="detail.type == 2"></show-policy>                                        
                                            <v-btn   
                                                fab
                                                dark
                                                x-small
                                                color="error"
                                                v-if="form_edit.status <= 1"
                                                @click="delete_detail(detail,index)"
                                                >
                                                <v-icon>
                                                    mdi-close
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div class="detail">{{detail.request_detail}}</div>
                                </div>        
                                    
                                
                                <v-dialog
                                    transition="dialog-bottom-transition"
                                    persistent
                                    max-width="1100"
                                    v-model="firewall_dialog"
                                >
                                    
                                    <template v-slot:default="dialog">
                                    <v-card>      
                                        <v-card-title>
                                            <span> รายละเอียดของการร้องขอ</span>
                                        </v-card-title>                      
                                        <v-card-text class="mt-4">
                                            <request-firewall 
                                                :request_id="request_id"
                                                @close_detail="close_detail"
                                            ></request-firewall>
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
                                            ปิด</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </template>
                                </v-dialog>
                                <!-- <v-expansion-panels 
                                    v-model="panel"                             
                                    multiple                                        
                                    dense
                                >
                                    <v-expansion-panel
                                        class="panel-detail"
                                            v-for="(detail,index) in detail_list" :key="index">
                                        <v-expansion-panel-header>
                                            <template v-slot:actions>
                                                <v-icon color="primary" large class="ml-2">
                                                    mdi-arrow-down-drop-circle
                                                </v-icon>
                                            </template>
                                            <v-row>
                                                <v-col cols="10"><h4 style="color:#212121">ข้อที่ {{(index+1) + ' ' + (detail.type == 1 ? '(เรื่องทั่วไป)' : '(Policy Firewall)')}}</h4></v-col>
                                                <v-col> 
                                                    <div class=text-right>
                                                        <v-btn
                                                            class="mr-2"                                            
                                                            outlined
                                                            x-small
                                                            fab
                                                            color="indigo"
                                                            v-if="detail.type == 1"
                                                            @click="edit_detail(detail)"
                                                            >
                                                            <v-icon>mdi-pencil</v-icon>
                                                        </v-btn>
                                                        <show-policy :detail="detail" v-if="detail.type == 2"></show-policy>
                                                        <v-btn   
                                                            fab
                                                            dark
                                                            x-small
                                                            color="error"
                                                            v-if="form_edit.status <= 1"
                                                            @click="delete_detail(detail,index)"
                                                            >
                                                            <v-icon>
                                                                mdi-close
                                                            </v-icon>
                                                        </v-btn>                                                            
                                                    </div>                                      
                                                    
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                {{detail.request_detail}}                                                    
                                            </v-expansion-panel-content>
                                    </v-expansion-panel>                                        
                                </v-expansion-panels> -->
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"></v-col>
                            <v-col cols="9">                                    
                                    
                                    <!-- <div v-for="(detail,index) in detail_list" :key="index">
                                    <v-alert             
                                        
                                        
                                        :color="detail.id ==0 ? 'success' : 'primary'"
                                        border="left"
                                        elevation="2"
                                        colored-border
                                        :icon="'mdi-numeric-' + (index+1) + '-circle-outline'"
                                        >
                                        <v-row>
                                            <v-col cols="10">{{detail.request_detail}}</v-col>
                                            <v-col> 
                                                <div class=text-right>
                                                    <v-btn
                                                        class="mr-2"                                            
                                                        outlined
                                                        x-small
                                                        fab
                                                        color="indigo"
                                                        v-if="detail.type == 1"
                                                        @click="edit_detail(detail)"
                                                        >
                                                        <v-icon>mdi-pencil</v-icon>
                                                    </v-btn>
                                                    <v-btn     
                                                                                            
                                                        fab
                                                        dark
                                                        x-small
                                                        color="error"
                                                        v-if="form_edit.status <= 1"
                                                        @click="delete_detail(detail,index)"
                                                        >
                                                        <v-icon>
                                                            mdi-close
                                                        </v-icon>
                                                    </v-btn>
                                                </div>                                       
                                                
                                            </v-col>
                                        </v-row>
                                        
                                    </v-alert>
                                    
                                </div>             -->
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">วัตถุประสงค์ :</p>
                            </v-col>     
                            <v-col cols="9">
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="เหตุผล"
                                    rules="required"
                                    
                                >
                                <v-textarea
                                    dense
                                    rows="2"
                                    v-model="form_edit.request_reason"
                                    :rules="rules"
                                    hide-details="auto"          
                                    :error-messages="errors"
                                    outlined
                                ></v-textarea>
                                </validation-provider>
                            </v-col>
                        </v-row> 
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">เอกสารประกอบ (ถ้ามี) :</p>
                            </v-col>     
                            <v-col cols="9 mb-2">                                
                                <div class="flex items-center justify-center w-full h-screen text-center" v-if="form_edit.status<2">
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
                                <v-chip                                     
                                    small
                                    v-for="(item,index) in file_list" 
                                    :key="index"
                                    class="ma-2"                                    
                                    label
                                    :close="form_edit.status>1 ? false : true"
                                    @click="downloadFile(item)"
                                    :color="item.id == 0 ? 'green' : 'primary'"    
                                    @click:close="deleteFile(item,index)"
                                    >
                                    {{ item.file_title }}
                                </v-chip>
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            <v-col cols="3">                                
                            </v-col>     
                            <v-col cols="9 pt-0 pl-0 mb-2">
                                
                                
                                
                            </v-col>
                        </v-row>
                        <v-row>    
                            
                        </v-row>
                        <!-- <v-row>    
                            <v-col cols="3">
                                <p class="topic">ผู้เกี่ยวข้อง :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="form_edit.person_relate" 
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
                                            :close="form_edit.status>1 ? false : true"
                                            :readonly="form_edit.status>1 ? true : false"
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
                        </v-row> -->

                    </v-card> 
            
                    <v-card class="mycard mb-5 mt-5">
                        <v-row>
                            <v-col cols="12" >ส่วนที่ 2 ระบบงานที่เกี่ยวข้อง</v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col cols="3">
                                <p class="topic">ประเภท :</p>
                            </v-col>     
                            <v-col cols="9">
                               
                                
                                <v-radio-group 
                                    v-model="form_edit.change_type"
                                    row
                                    dense
                                    mandatory
                                    :readonly="form_edit.status>1 ? true : false"
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
                        </v-row> -->
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">ระบบที่เกี่ยวข้อง :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="form_edit.system_relate" 
                                    :items="system_list"
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    :readonly="form_edit.status>1 ? true : false"
                                    hide-details="auto"
                                    label="เลือกระบบที่เกี่ยวข้อง ระบบอื่นๆ โปรดระบุ"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            :close="form_edit.status>1 ? false : true"
                                            
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
                                <p class="topic">สภาพแวดล้อม :</p>
                            </v-col>     
                            <v-col cols="9">
                                <validation-provider
                                    v-slot="{ errors }"
                                    name="env_impact"
                                    rules="required"
                                >                                  
                                    
                                    <v-row>
                                        <v-col cols="2">                                            
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="Production"
                                                :value="1"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="Training"
                                                :value="4"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="UAT"
                                                :value="5"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="IWT"
                                                :value="6"
                                            ></v-checkbox>
                                        </v-col>
                                        <!-- <v-col cols="4">
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="Test/QA"
                                                :value="3"
                                            ></v-checkbox>
                                        </v-col> -->
                                        <v-col cols="2">
                                            <v-checkbox
                                                :readonly="form_edit.status>1 ? true : false"
                                                v-model="form_edit.env_impact"
                                                label="Development"
                                                :value="2"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    
                                    
                                    
                                </validation-provider>                          
                            </v-col>
                        </v-row>
                        <!-- <v-row>    
                            <v-col cols="3">
                                <p class="topic">ส่งผลกระทบต่อระบบ :</p>
                            </v-col>     
                            <v-col cols="9">
                                <v-combobox multiple
                                    v-model="form_edit.system_impact" 
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    hide-details="auto"
                                    label="ระบบที่กระทบ กด tab เพื่อเพิ่มหลายระบบ"
                                    :readonly="form_edit.status>1 ? true : false"
                                    >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            class="mt-2"
                                            :close="form_edit.status>1 ? false : true"
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
                        </v-row> -->
                        <!-- <v-row>
                            <v-col cols="3">
                                <p class="topic">ระดับผลกระทบ :</p>
                            </v-col>     
                            <v-col cols="9">                                                                
                                <v-radio-group 
                                    v-model="form_edit.level_impact"
                                    row
                                    dense
                                    mandatory
                                    :readonly="form_edit.status>1 ? true : false"
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
                        </v-row> -->
                        <v-row>    
                            <v-col cols="3">
                                <p class="topic">วันที่มีผลบังคับใช้ :</p>
                            </v-col>
                            <v-col>
                                <v-menu
                                    ref="begin_date_menu"
                                    v-model="begin_date_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="form_edit.begin_date"
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
                                        :readonly="form_edit.status>1 ? true : false"
                                        v-model="form_edit.begin_date"
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
                                            @click="$refs.begin_date_menu.save(form_edit.begin_date)"
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
                                    :return-value.sync="form_edit.end_date"
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
                                            @click:clear="form_edit.end_date=null"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        :readonly="form_edit.status>1 ? true : false"
                                        v-model="form_edit.end_date"
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
                                            @click="$refs.end_date_menu.save(form_edit.end_date)"
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
                                            :return-value.sync="form_edit.begin_time"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                            
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="form_edit.begin_time"
                                                label="ตั้งแต่เวลา"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                outlined
                                                dense
                                                clearable
                                                @click:clear="form_edit.begin_time=null"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                :readonly="form_edit.status>1 ? true : false"
                                                format="24hr"
                                                v-if="begin_time_menu"
                                                v-model="form_edit.begin_time"
                                                full-width
                                                
                                                @click:minute="$refs.begin_time_menu.save(form_edit.begin_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>                        
                                    <v-col>  
                                        <v-menu
                                            ref="end_time_menu"
                                            v-model="end_time_menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="form_edit.end_time"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                            
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="form_edit.end_time"
                                                label="ถึงเวลา"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                outlined
                                                dense
                                                clearable
                                                @click:clear="form_edit.end_time=null"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                                :readonly="form_edit.status>1 ? true : false"
                                                format="24hr"
                                                v-if="end_time_menu"
                                                v-model="form_edit.end_time"
                                                full-width
                                                
                                                @click:minute="$refs.end_time_menu.save(form_edit.end_time)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <p class="topic"></p>
                            </v-col>     
                            <v-col cols="9">                                                               
                                <v-row>
                                    <v-col>                                            
                                        <v-checkbox
                                            :readonly="form_edit.status>1 ? true : false"
                                            v-model="form_edit.alert_expire"
                                            label="แจ้งเตือนก่อนหมดอายุ"                                            
                                        ></v-checkbox>
                                    </v-col>
                                    
                                    <v-spacer></v-spacer>
                                </v-row>
                                
                            </v-col>
                        </v-row>
                    </v-card>
                    
                    <v-card class="mycard mb-10 mt-5" > 
                        <v-row justify="center">                            
                            <v-col cols="12">
                                <div class="text-center"> 
                                    <v-btn
                                        v-if="form_edit.status==1"
                                        class="ma-3"
                                        rounded
                                        color="success"                                       
                                        @click="send_request"
                                        :disabled="form_edit.status != 1"
                                    >
                                        <v-icon left>
                                            mdi-send
                                        </v-icon>
                                        ส่ง
                                    </v-btn>                                   
                                    <v-btn
                                        class="ma-3"
                                        rounded
                                        color="primary"
                                        v-if="form_edit.status<=1"
                                        type="submit"
                                        :disabled="invalid"
                                    >
                                        <v-icon left>
                                            mdi-content-save-outline
                                        </v-icon>
                                        บันทึก
                                    </v-btn>
                                    <v-btn
                                        v-if="form_edit.status>=2"
                                        class="ma-3"
                                        rounded
                                        color="warning"                                       
                                        @click="undo_request"
                                        :disabled="form_edit.status != 2"
                                    >
                                        <v-icon left>
                                            mdi-file-undo
                                        </v-icon>
                                        ยกเลิกการส่ง
                                    </v-btn>
                                    <v-btn
                                        text
                                        @click="reset"
                                        color="error"
                                    >
                                        <v-icon left>
                                            mdi-arrow-u-left-top-bold
                                        </v-icon>
                                        ออก</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <new-alert :alert="alert" :message="message"></new-alert>
                        <my-alert :AlertType="show_alert"></my-alert>
                    </v-card>
                </form>
                </validation-observer>    
                            
            </v-col>
            <v-col cols="3">
                
                <request-flow   
                    :request_id = "request_id" 
                    :status = "form_edit.status"
                    :group_id = "form_edit.group_id"  
                    :form = "form_edit"                  
                    :user="user"                     
                    v-if="show_status"
                    @fetchRequest="fetchData"
                ></request-flow>
            </v-col>
        </v-row>
  </div>         
  
</template>

<script>
import Swal from 'sweetalert2';
// import MyAlert from '@/components/MyAlert.vue';
import NewAlert from '@/components/NewAlert';
import RequestFlow from '@/components/Request/RequestFlow';
import ShowPolicy from '@/components/Request/ShowPolicy';
import axios from 'axios';
import UploadButton from 'vuetify-upload-button';
import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import RequestFirewall from '@/components/Request/RequestFirewall';
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
        'new-alert':NewAlert,
        // 'my-alert':MyAlert,
      ValidationProvider,
      ValidationObserver,
      'upload-btn':UploadButton,
      'show-policy' : ShowPolicy,
      'request-flow' : RequestFlow,
      'request-firewall': RequestFirewall
        
    },
    delimiters: ['${', '}'], // Avoid Twig conflicts
    
    
    data(){
        return {
            request_id: this.$route.params.id,
            invalid: false,
            firewall_dialog: false,
            detail_dialog: false,
            policy_dialog : false,
            alert: true,
            rules: [v => v.length <= 250 || 'เกิน 250 ตัวอักษร'],
            title: '',
            detail: null,
            detail_item: {
                id : 0,
                order: 0,
                request_detail: '',
                type : 1,
                description : ''  
            },
            reason: '',
            
            
            document_files: [],
            file_list: [],
            document_list: [
                {value : 1, text: 'Action Plan'},
                {value : 2, text: 'Testing Plan'},
                {value : 3, text: 'Rollback Plan'},                             
            ],
            person_relate: [],
            change_type: 1,   
            system_relate: [],
            // system_list: [
            //     {value : 1, text: 'Data Center'},
            //     // {value : 2, text: 'Backup System'},
            //     {value : 3, text: 'Security System'},
            //     {value : 4, text: 'Hardware'},
            //     {value : 5, text: 'Network'},
            //     {value : 6, text: 'Operation System'},
            //     {value : 9, text: 'อื่น ๆ รายละเอียด'},                
            // ], 
            system_list: [
                {value : 1, text: 'ระบบบำเหน็จบำนาญฯ (DPS)'},
                {value : 2, text: 'ระบบจ่ายตรงเงินเดือนฯ (e-Payroll)'},
                {value : 3, text: 'ระบบจัดซื้อจัดจ้างภาครัฐฯ (e-GP)'},
                {value : 4, text: 'ระบบ Website Inter/Intra'},
                {value : 5, text: 'ระบบฐานข้อมูลรักษาพยาบาล (MBDB)'},
                {value : 6, text: 'ระบบบูรณาการฐานข้อมูลสวัสดิการสังคม (e-Social Welfare)'},
                {value : 7, text: 'ระบบการรับชำระเงินกลางของบริการภาครัฐ (e-Payment)'},
                {value : 8, text: 'ระบบเครื่องลูกข่ายบาทเนต (BAHTENT Client)'},
                {value : 9, text: 'ระบบเครือข่าย'},                
                {value : 10, text: 'ระบบรักษาความปลอดภัย'},                
                {value : 99, text: 'อื่น ๆ ระบุรายละเอียด'},                
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

            panel: [],
            detail_list: [],
            detail_type: [                
                {text: 'เรื่องทั่วไป',value: 1},
                {text: 'เกี่ยวกับ Policy Firewall',value: 2},
            ],
            form_default:{
                request_title:'',                
                request_reason: '',
                document_relate: [],                
                person_relate: [],
                change_type:0,
                system_relate:[],
                env_impact:[],
                system_impact:[],
                level_impact:1,
                begin_date: new Date().toISOString().substr(0, 10),                
                end_date: null,                
                begin_time: null,
                end_time: null,
                status:0,
                description: '',
                alert_expire: false                
            },
            form_edit:{
                request_title:'',                
                request_reason: '',
                document_relate: [],
                
                person_relate: [],
                change_type:0,
                system_relate:[],
                env_impact:[],
                system_impact:[],
                level_impact:1,
                begin_date: new Date().toISOString().substr(0, 10),                
                end_date: null,                
                begin_time: null,
                end_time: null,
                status:0,
                description: '',
                alert_expire: false
            },
            request_status: {},
            detail_status: 'new',
            status: 'new',            
            message: '',
            show_alert: '',
            user: this.$store.getters.user,
            show_status : false,
            group_cgd: this.$store.getters.group_cgd
        }
    },
    mounted(){
        
        this.fetchData();
    },
    watch: {
        document_files(){
            
        },
        request_id(){
            
        },
        alert(){
            if (this.alert){
                setTimeout(() => {
                    this.alert = false
                }, 2000);
                
            }
        },
        show_alert(){
            if (this.show_alert != ""){
                setTimeout(() => {
                    this.show_alert = ""
                }, 2000);
                
            }
        }
    },
    computed: {
        getBeginThaiDate(){
            var d = new Date(this.form_edit.begin_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
        getEndThaiDate(){
            if (this.form_edit.end_date){
                var d = new Date(this.form_edit.end_date);
                return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            }
            
            
            //return moment(String(value)).format('LL')
        },
    },
    methods: {
        get_flow(){
            switch (this.form_edit.status) {
                case 2:
                    return [0];
                    break;
                case 3:
                    return [1];
                    break;
                case 4:
                    return [2];
                    break;
                case 5:
                    return [3];
                    break;
                case 6:
                    return [4];
                    break;
                case 7:
                    return [5];
                    break;
                case 8:
                    return [];
                    break;
                default :
                    return [];
            }
        },
        getArray(item){
            try {
                return JSON.parse(item);    
            } catch (error) {
                return [];
            }
            
        },
        async fetchData(){
            if (this.request_id){
                
                this.status = 'edit'
                await this.getRequest();
                await this.getDetail();
                await this.getFile();
                await this.getStatus();
            }
        },
        async getDetail(){
            let path = await '/api/request_forms/' + this.request_id + '/request_details';
            try {
                let response = await axios.get(path);
                this.detail_list = await response.data.data;
                this.panel = [];//await [...Array(this.detail_list).keys()].map((k, i) => i)
                for (let i=0;i<this.detail_list.length;i++){
                    this.panel.push(i);
                }
            } catch (error) {
                
            }
            

        },
        async getStatus(){
            let path = await `/api/request_forms/${this.request_id}/request_status`;
            let response = await axios.get(`${path}`);
            this.request_status = await response.data.data[0];
        },
        async getRequest(){
            let path = await '/api/request_forms/' + this.request_id;
            let response = await axios.get(path);
            
            let request = await response.data.data;
            this.form_edit.user_id = await request.user_id;            
            this.form_edit.group_code = await request.group_code;
            this.form_edit.group_id = await request.group_id;
            this.form_edit.fullname = await request.fullname;
            this.form_edit.year = await request.year;
            this.form_edit.order_no = await request.order_no;
            this.form_edit.created_date = await request.created_date;
            this.form_edit.request_no = await request.request_no;
            this.form_edit.change_type = await request.change_type;
            this.form_edit.request_title = await request.request_title;
            this.form_edit.request_reason = await request.request_reason;
            this.form_edit.document_relate = await JSON.parse(request.document_relate);
            this.form_edit.person_relate = await JSON.parse(request.person_relate);
            this.form_edit.system_relate = await JSON.parse(request.system_relate);
            this.form_edit.env_impact = await JSON.parse(request.env_impact);
            this.form_edit.system_impact = await JSON.parse(request.system_impact);
            this.form_edit.level_impact = await request.level_impact;
            this.form_edit.begin_date = await request.begin_date;
            this.form_edit.end_date = await request.end_date;
            this.form_edit.begin_time = await request.begin_time;
            this.form_edit.end_time = await request.end_time;
            this.form_edit.status = await request.status;
            this.form_edit.description = await request.description;
            this.form_edit.alert_expire = await request.alert_expire;
            this.form_edit.updated_date = await request.updated_date;
            this.show_status = await true;
            await this.$forceUpdate();
            
            


        },
        async getFile(){
            let path = await `/api/request_forms/${this.request_id}/request_files`;
            try {
                let response = await axios.get(`${path}`);
                this.file_list = JSON.parse(JSON.stringify(response.data.data));
            } catch (error) {
                
            }
            
        },
        create_detail(value){
            if (value == 1){
                this.detail_status = 'new';
                this.detail = JSON.parse(JSON.stringify(this.detail_item));
                this.detail_dialog = true;
            }else if (value == 2){
                this.firewall_dialog = true;
            }
        },
        edit_detail(detail){
            if (detail.type==1){
                this.detail_status = 'edit';
                this.detail=JSON.parse(JSON.stringify(detail));
                this.detail_dialog = true;
            }
            
        },
        async close_detail(){
            this.show_alert = "success";
            this.detail_status = await 'new';
            await this.getDetail();
            this.firewall_dialog = await false;
        },
        async save_detail(){
            if (this.detail_status == 'new'){
                let path = await `/api/request_forms/${this.request_id}/request_details`;
                try {
                    let response = await axios.post(`${path}`,{
                        type: 1,
                        request_detail: this.detail.request_detail,
                        description: ''
                    })
                    this.show_alert = await "success";
                    await this.getDetail();
                    this.detail_dialog = false;
                } catch (error) {
                    this.show_alert = await "error";
                }
                
                // this.detail.order = this.detail_list.length + 1;
                // this.detail_list.push(JSON.parse(JSON.stringify(this.detail)));
                
            }else if (this.detail_status == 'edit'){
                let path = `/api/request_forms/${this.request_id}/request_details/${this.detail.id}`;
                try {
                    let response = await axios.put(`${path}`,{
                        
                        request_detail: this.detail.request_detail,
                        
                    })
                    this.show_alert = await "success";
                    await this.getDetail();
                    this.detail_dialog = false;
                } catch (error) {
                    this.show_alert = await "error";
                }
                // this.detail_list[this.detail_list.findIndex(x=>x.order == this.detail.order)].request_detail = this.detail.request_detail;
            }
            
            
            this.detail_dialog = false;
        },
        delete_detail(detail,index){
            if (detail.id == 0){
                this.detail_list.splice(index,1)
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
                        let path = `/api/request_forms/${this.request_id}/request_details/${detail.id}`;
                        try {
                            axios.delete(`${path}`);   
                            this.detail_list.splice(index,1)                 
                            this.show_alert="success";
                        } catch (error) {
                            this.show_alert = "error";
                            
                        }
                    } else if (result.isDenied) {
                        // Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                // this.$swal({
                //     title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",                
                //     icon: "warning",
                //     closeOnClickOutside: false,
                //     showCancelButton: `ยกเลิก`,
                //     confirmButtonText: `ยืนยัน`,
                // }).then(isConfirm =>{
                //     if (isConfirm.isConfirmed){
                //         let path = `/api/request_forms/${this.request_id}/request_details/${detail.id}`;
                //         try {
                //             axios.delete(`${path}`);   
                //             this.detail_list.splice(index,1)                 
                //             this.show_alert="success";
                //         } catch (error) {
                //             this.show_alert = "error";
                            
                //         }
                //     }
                // });
                
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
        async deleteFile(item,index) {
      // Prompt here with text if required
            // this.form_edit.document_relate.splice(index, 1)
            // this.form_edit.document_files.splice(index, 1)
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
                    fileLink.setAttribute('download', filename);
                    document.body.appendChild(fileLink);
                    window.open(fileLink, "_blank");
                    // fileLink.click();               
                })
                .catch(error=>{

                })
            }
        },
        onChange() {
            let files = [...this.$refs.file.files];
            if (files){
                for (let i=0;i<files.length;i++){
                    
                    if (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'application/pdf'){
                        // this.document_files.push(files[i]);
                        // this.form_edit.document_relate.push(files[i].name);
                        let file = {
                            id:0,
                            file_title: files[i].name,
                            file_content: files[i]
                        }
                        this.file_list.push(file);
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
            this.$router.go(-1);
            // this.$router.push('/remote/remote_list');
        },
        check_group(id){
            let group = this.$store.getters.group_cgd;
            let g = group.filter(x=>x.id == id)
            if (g.length>0){
                return g[0].group_name_short;
            }
        },
        get_group_name(id){
            let group = this.$store.getters.group_cgd;
            let g = group.filter(x=>x.id == id)
            if (g.length>0){
                return g[0].group_name;
            }
        },
        getDateTime(){
            let date = new Date();
            let text = new Date().toISOString().substring(0,19);
            return text.substring(0,10) + ' ' + date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        },
        async submit(){
            
            if (!this.detail_list || this.detail_list.length == 0){
                this.show_alert = "no_detail";
                return;
            }
            if (this.status == 'new'){
                
                this.check_group(this.user.group_id)
                
                try {
                    let response = await axios.post(path,{
                    user_id : this.user.id,
                    group_id : this.user.group_id,
                    group_code : this.check_group(this.user.group_id),
                    year : new Date().toISOString().substr(0, 4),
                    order_no : 0,
                    created_date : this.getDateTime(),
                    request_no : '',
                    change_type : this.form_edit.change_type,
                    request_title : this.form_edit.request_title,
                    request_reason : this.form_edit.request_reason,
                    document_relate : JSON.stringify(this.form_edit.document_relate),
                    person_relate : JSON.stringify(this.form_edit.person_relate),
                    system_relate : JSON.stringify(this.form_edit.system_relate),
                    env_impact : JSON.stringify(this.form_edit.env_impact),
                    system_impact : JSON.stringify(this.form_edit.system_impact),
                    level_impact : this.form_edit.level_impact,
                    begin_date : this.form_edit.begin_date,
                    end_date : this.form_edit.end_date,
                    begin_time : this.form_edit.begin_time,
                    end_time : this.form_edit.end_time,
                    status : 0,
                    description : this.form_edit.description,
                    alert_expire : this.form_edit.alert_expire,
                    updated_date : this.getDateTime()
                    
                })

                    this.request_id = await response.data.data.id;
                    this.status = await 'edit';
                    this.show_alert="success";
                    await this.uploadDetail();
                    await this.uploadFile();
                    await this.fetchData();
                } catch (error) {
                   
                    this.show_alert = "error";
                }
                
            }else if (this.status == 'edit'){
                let path = "/api/request_forms/" + this.request_id;
                try {
                    let response = await axios.put(path,{                    
                        change_type : this.form_edit.change_type,
                        request_title : this.form_edit.request_title,
                        request_reason : this.form_edit.request_reason,
                        document_relate : JSON.stringify(this.form_edit.document_relate),
                        person_relate : JSON.stringify(this.form_edit.person_relate),
                        system_relate : JSON.stringify(this.form_edit.system_relate),
                        env_impact : JSON.stringify(this.form_edit.env_impact),
                        system_impact : JSON.stringify(this.form_edit.system_impact),
                        level_impact : this.form_edit.level_impact,
                        begin_date : this.form_edit.begin_date,
                        end_date : this.form_edit.end_date,
                        begin_time : this.form_edit.begin_time,
                        end_time : this.form_edit.end_time,
                        status : 1,
                        description : this.form_edit.description,
                        alert_expire : this.form_edit.alert_expire,
                        updated_date : this.getDateTime()
                    })
                    this.show_alert="success";
                    await this.uploadDetail();
                    await this.uploadFile();
                    await this.fetchData();
                } catch (error) {
                    
                    this.show_alert = "error";
                }
                 

            }

        },
        async send_request(){
            let path = "/api/request_forms/" + this.request_id;
            try{
                let response = await axios.put(path,{
                    status: 2
                })
                
                this.show_alert = await "success";
                await this.fetchData();
            } catch (error) {   
                // console.log(error);
                this.show_alert = "error";
            }

        },
        async undo_request(){
            let path = "/api/request_forms/" + this.request_id;
            if (this.form_edit.status != 2){
                return;
            }
            try{
                let response = await axios.put(path,{
                    status: 1
                })
                
                this.show_alert = await "success";
                await this.fetchData();
            } catch (error) {                    
                this.show_alert = "error";
            }

        },
        async uploadFile(){
            let path = `/api/request_forms/${this.request_id}/request_files`;
            try {
                for (let i=0;i<this.file_list.length;i++){
                    let formData = new FormData();
                    if (this.file_list[i].id == 0){
                        
                        formData.append('file',this.file_list[i].file_content);
                        formData.append('file_title',this.file_list[i].file_title);
                        let response = axios.post(`${path}`,formData,
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
            } catch (error) {
                this.show_alert = "error";
            }
            
        },
        async uploadDetail(){
            let path = "/api/request_forms/" + this.request_id + "/request_details";
            let details = [];
            let response = null;
            for (let i=0;i<this.detail_list.length;i++){
                if (this.detail_list[i].id == 0){
                    response = await axios.post(path,{
                        order : this.detail_list[i].order,
                        type : this.detail_list[i].type,
                        request_detail : this.detail_list[i].request_detail                    
                        })
                   //details.push(JSON.parse(JSON.stringify(response.data.data)));
                }else if (this.detail_list[i].id > 0){
                    
                    response = await axios.put(path+'/'+this.detail_list[i].id,{                        
                        request_detail : this.detail_list[i].request_detail                    
                        })
                    //details.push(JSON.parse(JSON.stringify(response.data.data)));
                }
                
            }
            
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
.panel-detail{
    border-color: #1976d2!important;
}
.policy{
    margin: 2px;
    border: 1px solid rgb(219, 219, 219);
    background-color: rgb(255, 255, 255);
    padding: 5px;
    border-radius: 3px;
}
.request_detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-bottom: 10px;
}
.detail_top{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.detail_menu{
    width: 100%;
    display: flex;    
    justify-content: flex-end;
    
}
.request_detail .detail{
    width: 100%;
}
</style>>

