<template>
<div>
<v-expansion-panels
    multiple
    v-model="panel"
    
>
    <v-expansion-panel >  
        <v-expansion-panel-header>
        <template v-slot:default>
          <v-row no-gutters>
            <v-col cols="12">               
              <v-icon color="success">mdi-check</v-icon>รายละเอียด
            </v-col>
            
          </v-row>
        </template>
      </v-expansion-panel-header>    
      <v-expansion-panel-content>          
          <v-row>
              <v-col>
                  <v-row>
                      <v-col cols="4">เลขที่ใบคำขอ :</v-col>
                      <v-col cols="8">{{form.request_no ? form.request_no : '-'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่สร้างคำขอ :</v-col>
                        <v-col cols="8">{{getThaiDateTime(form.created_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{form.fullname}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
                     
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
<v-expansion-panels 
    multiple 
    v-model="step"
>
    
    <v-expansion-panel >
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
                
              <v-icon color="success" v-if="status > 2">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การรับรอง
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
            
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                
                  v-else
                  key="1"
                >
                  {{ status > 2 ? getThaiDateTime(request_status.ensure_date) : ''}}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-row v-if="user.roles.includes('ensure') && user.group_id == group_id && status ==2 ">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="ensure_dialog=true"
                >
                    บันทึกรับรอง
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="status > 2">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{ request_status.ensure_status == 1 ? 'รับรองแล้ว' : ''}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                        <v-col cols="8">{{getThaiDateTime(request_status.ensure_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.ensure_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="ensure_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการรับรอง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="request_status.ensure_status"
                                mandatory
                                row
                                >
                                <v-radio
                                    label="รับรองการร้องขอ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ส่งเรื่องคืน"
                                    value="0"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="request_status.ensure_detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('ensure')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
              <v-icon color="success" v-if="status > 3">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การพิจารณา
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ status > 3 ? getThaiDateTime(request_status.consider_date) : '' }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="status == 3 && getArray(user.roles).includes('consider')">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="consider_dialog=true"
                >
                    บันทึกการพิจารณา
                </v-btn>
                
              </v-col>
          </v-row>
          <v-row v-if="status > 3">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{ request_status.consider_status == 1 ? 'รับทราบการเปลี่ยงแปลงหรือแก้ไขระบบ' : 'แจ้งต่อผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">รายละเอียด :</v-col>
                      <v-col cols="8">{{request_status.consider_detail}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">{{getThaiDateTime(request_status.consider_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.consider_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="consider_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการพิจารณา</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                    v-model="consider.status"
                                    row
                                    >
                                    <v-radio
                                        label="รับทราบการเปลี่ยงแปลงหรือแก้ไขระบบ"
                                        value="1"
                                    ></v-radio>
                                    <v-radio
                                        label="แจ้งต่อผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
                                        value="2"
                                    ></v-radio>
                                </v-radio-group> 
                                
                                <v-combobox multiple
                                    v-model="consider.forward_to" 
                                    :items="group_cgd"
                                    dense
                                    append-icon
                                    chips
                                    deletable-chips
                                    class="tag-input"
                                    outlined
                                    
                                    hide-details="auto"
                                    label="เลือกกลุ่มผู้ดำเนินการ"
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
                                <v-textarea
                                    v-model="consider.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    class="mt-2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('consider')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกการพิจารณา
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-show="(status < 5 || (status >4 && request_status.approve_status))">
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
              <v-icon color="success" v-if="status > 4 && request_status.approve_status">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การอนุมัติ
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ request_status.approve_status ? getThaiDateTime(request_status.approve_date) : '' }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="status == 4 && getArray(user.roles).includes('approve')">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="approve_dialog=true"
                >
                    บันทึกอนุมัติการร้องขอ
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="status > 4">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{request_status.approve_status==1 ? 'อนุมัติ' : 'ไม่อนุมัติ'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">รายละเอียด :</v-col>
                      <v-col cols="8">{{request_status.approve_detail ? request_status.approve_detail : '-'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">{{getThaiDateTime(request_status.approve_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.approve_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="approve_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการอนุมัติ</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="approve.status"
                                mandatory
                                row
                                >
                                <v-radio
                                    label="อนุมัติ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ไม่อนุมัติ"
                                    value="0"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="approve.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('approve')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกการอนุมัติ
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
              <v-icon color="success" v-if="status > 5">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การดำเนินการ
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ status > 5 ? getThaiDateTime(request_status.operate_save_date) : '' }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="status == 5 && getArray(user.roles).includes('operate') && check_permiss('operate')">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="operate_dialog=true"
                >
                    บันทึกผลการดำเนินการ
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="status > 5">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{ request_status.operate_status==1 ? 'ดำเนินการแล้ว' : 'ไม่สามารถดำเนินการได้'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ดำเนินการ :</v-col>
                      <v-col cols="8">{{getThaiDate(request_status.operate_date)}}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">รายละเอียด :</v-col>
                    <v-col cols="8">{{(request_status.operate_detail ? request_status.operate_detail : '-') + (request_status.operator_name ? ' (' + request_status.operator_name + ')' : '')}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">วันที่ :</v-col>
                    <v-col cols="8">{{getThaiDateTime(request_status.operate_save_date)}}</v-col>
                </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.operate_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="operate_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการดำเนินการ</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">  
                                <v-row>
                                    <v-col>
                                        <v-radio-group
                                            v-model="operate.status"
                                            mandatory
                                            row
                                            >
                                            <v-radio
                                                label="ดำเนินการแล้ว"
                                                value="1"
                                            >                                
                                            </v-radio>
                                            <v-radio
                                                label="ไม่สามารถดำเนินการได้"
                                                value="0"
                                            ></v-radio>
                                            </v-radio-group>                                    
                                        </v-col>
                                    <v-col>
                                        <v-menu
                                            ref="date_menu"
                                            v-model="date_menu"
                                            :close-on-content-click="false"
                                            :return-value.sync="operate.operate_date"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field                                                        
                                                    :value="getDate"
                                                    label="เมื่อวันที่"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    outlined
                                                    dense
                                                    clearable
                                                    
                                                    @click:clear="operate.operate_date=null"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="operate.operate_date"
                                                no-title
                                                scrollable
                                                locale="th-TH"
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="date_menu = false"
                                                >
                                                    ยกเลิก
                                                </v-btn>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="$refs.date_menu.save(operate.operate_date)"
                                                >
                                                    ตกลง
                                                </v-btn>
                                            </v-date-picker>
                                        </v-menu>                                
                                        <v-text-field 
                                            v-model="operate.operator_name"
                                            hide-details="true" 
                                            outlined dense label="โดย"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>                      
                              <v-textarea
                                    v-model="operate.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    class="mt-3"
                                    
                                ></v-textarea>
                                        
                                
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('operate')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกผลการดำเนินการ
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
              <v-icon color="success" v-if="status > 6">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การติดตามผลฯ
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ status > 6 ? getThaiDateTime(request_status.follow_date) : '' }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="status == 6 && getArray(user.roles).includes('follow') && check_permiss('follow')">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="follow_dialog=true"
                >
                    บันทึกการติดตาม
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="status > 6" >
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{request_status.follow_status == 1 ? 'ดำเนินการแล้วเสร็จ' : ''}}
                          <br>{{request_status.follow_impact == 1 ? 'ไม่มีผลกระทบ' : request_status.follow_impact == 0 ? 'มีผลกระทบ' : ''}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่</v-col>
                      <v-col cols="8">{{getThaiDateTime(request_status.follow_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.follow_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="follow_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span>การติดตามผลการเปลี่ยนแปลง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">  
                            <v-col cols="12">
                              <v-checkbox
                                v-model="follow.status"
                                label="ดำเนินการเสร็จแล้ว"
                                hide-details="true"
                                dense
                              ></v-checkbox>
                            </v-col>       
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="follow.impact"
                                mandatory
                                row
                                >
                                <v-radio
                                    label="ไม่มีผลกระทบ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="มีผลกระทบ"
                                    value="0"
                                ></v-radio>
                                
                                </v-radio-group>           
                                <v-textarea
                                    v-model="follow.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('follow')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
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
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="6">
              <v-icon color="success" v-if="status > 7">mdi-check</v-icon>
              <v-icon color="default" v-else>mdi-timer-sand</v-icon> การตรวจสอบ
            </v-col>
            <v-col
              cols="6"
              class="text--secondary text-center mt-1"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ status > 7 ? getThaiDateTime(request_status.check_date) : '' }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="status == 7 && getArray(user.roles).includes('check')">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="check_dialog=true"
                >
                    บันทึกการตรวจสอบ
                </v-btn>
              </v-col>
          </v-row>
          <v-row  v-if="status > 7">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">{{request_status.check_status == 1 ? 'ดำเนินการตรวจสอบแล้ว' : 'ไม่สามารถตรวจสอบได้'}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">{{getThaiDateTime(request_status.check_date)}}</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">{{request_status.check_by}}</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="check_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span>การตรวจสอบผลการเปลี่ยนแปลง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">  
                                 
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="check.status"
                                mandatory
                                row
                                >
                                <v-radio
                                    label="ดำเนินการตรวจสอบแล้ว"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ไม่สามารถตรวจสอบได้"
                                    value="0"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="check.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_status('check')"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
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
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['request_id','status','user','group_id','form'],
    data: () => ({
        ensure_dialog: false,
        consider_dialog: false,
        approve_dialog:false,
        operate_dialog: false,
        follow_dialog: false,
        check_dialog: false,
        ensure:{
            status: 1,
            detail: 'รับรองให้ดำเนินการต่อ',
            date: '2021-03-24',
            ensure_by: 'siriluk.sir'
        },
        ensure_default:{
            status: null,
            detail: '',
            date: '',
            ensure_by: ''
        },
        consider: {
            status: 0,
            forward_to: [],
            detail : ''
        },
        approve:{
            status: null,
            detail: ''
        },
        date_menu: false,
        operate: {
            status: null,
            detail: '',
            operate_date :new Date().toISOString().substr(0, 10),
            operator_by: '',
        },
        follow: {
            status: 1,
            detail: '',
            impact: 1,

        },
        check: {
            status: null,
            detail: ''
        },
        
        date: null,
        request_status: {},        
        flow: [],
        step: [],
        panel:[0],
        group_cgd: []
    }),
    watch:{
        request_id(){
           
        },
        status(){
            // switch (this.status) {
            //     case 2:
            //         this.step=[0];
            //         break;
            //     case 3:
            //         this.step=[1];
            //         break;
            //     case 4:
            //         this.step=[2];
            //         break;
            //     case 5:
            //         this.step=[3];
            //         break;
            //     case 6:
            //         this.step=[4];
            //         break;
            //     case 7:
            //         this.step=[5];
            //         break;
            //     case 8:
            //         this.step=[];
            //         break;
            //     default:
            //         this.step=[];
            // }
        }
    },
    computed: {
        getDate(){
            var d = new Date(this.operate.operate_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
    },
    async mounted(){
            
            await this.fetchData();
            await this.getGroupCGD();
    },
    methods: {
        check_step(){
            this.step.slice(0);
            switch (this.status) {
                case 2:
                    this.step=[0];
                    break;
                case 3:
                    this.step=[1];
                    break;
                case 4:
                    this.step=[2];
                    break;
                case 5:
                    this.step=[3];
                    break;
                case 6:
                    this.step=[4];
                    break;
                case 7:
                    this.step=[5];
                    break;
                case 8:
                    this.step=[];
                    break;
                default:
                    this.step=[];
            }
        },
        async fetchData(){
            await this.check_step();
            if (this.status < 2){
                return;
            }
            let path = await `/api/request_forms/${this.request_id}/request_status`;
            let response = await axios.get(`${path}`);
            this.request_status = response.data.data[0];
            
            
            // if (this.request_status.ensure_status || this.user.roles.includes('ensure')){
            //     this.flow.push(0);
                
            // }
            // if (this.request_status.consider_status || this.user.roles.includes('consider')){
            //     this.flow.push(1);
            // }
            // if (this.request_status.approve_status || this.user.roles.includes('approve')){
            //     this.flow.push(2);
            // }
            // if (this.request_status.operate_status|| (this.user.roles.includes('operation') && JSON.parse(this.request_status.forward_to).includes(parseInt(this.user.group_id)))){
            //     this.flow.push(3);
            // }
            // if (this.request_status.follow_status || (this.user.roles.includes('follow') && this.user.group_id == this.group_id)){
            //     this.flow.push(4);
            // }
            // if (this.request_status.check_status || this.user.roles.includes('check')){
            //     this.flow.push(5);
            // }
        },
        async getGroupCGD(){
            this.$store.dispatch('get_group_cgd');
            let group = [];
            group = this.$store.getters.group_cgd;
            this.group_cgd = [];
            for (let i=0;i<group.length;i++){
                this.group_cgd.push({
                    text: group[i].group_name,
                    value: group[i].id
                })
            }

        },
        getArray(item){
            
            try {
                let arr = JSON.parse(item);
                return arr;    
            } catch (error) {
                
                console.log('error :' + error);
                return [];
            }
            
        },
        getArrayItem(item){
            let arr = [];
            for (let i=0;i<item.length;i++){
                arr.push(item[i].value);
            }
            return JSON.stringify(arr);
        },
        check_permiss(state){

            switch (state){
                case "operate":
                    let arr = this.getArray(this.request_status.forward_to);
                    return arr.includes(this.user.group_id);
                case "follow" :
                    return this.user.group_id == this.group_id;

            }
        },
        getDateTime(){
            let date = new Date();
            let text = new Date().toISOString().substring(0,19);
            return text.substring(0,10) + ' ' + date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        },
        async save_status(flow){
            let path = await `/api/request_forms/${this.request_id}/request_status/${this.request_status.id}`;
            let detail = {};
            switch (flow) {
                case "ensure":
                    detail = {
                        ensure_status : this.request_status.ensure_status,
                        ensure_detail : this.request_status.ensure_detail,
                        ensure_date : this.getDateTime(),
                        ensure_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    console.log('ensure date ' + detail.ensure_date)
                    break;
                case "consider":
                    detail = {
                        consider_status : this.consider.status,
                        forward_to : this.getArrayItem(this.consider.forward_to),
                        consider_detail : this.consider.detail,
                        consider_date : this.getDateTime(),
                        consider_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    break;
                case "approve":
                    detail = {
                        approve_status : this.approve.status,                        
                        approve_detail : this.approve.detail,
                        approve_date : this.getDateTime(),
                        approve_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    break;
                case "operate":
                    detail = {
                        operate_status : this.operate.status,
                        operator_name : this.operate.operator_name,
                        operate_detail : this.operate.detail,
                        operate_date : this.operate.operate_date,
                        operate_save_date : this.getDateTime(),
                        operate_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    break;
                case "follow":
                    detail = {
                        follow_status : this.follow.status,
                        follow_impact : this.follow.impact,
                        follow_detail : this.follow.detail,
                        follow_date : this.getDateTime(),
                        follow_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    break;
                case "check":
                    detail = {
                        check_status : this.check.status,                        
                        check_detail : this.check.detail,
                        check_date : this.getDateTime(),
                        check_by : this.user.firstname + ' ' + this.user.lastname
                    }
                    break;
            
                default:
                    break;
            }
            // console.log(detail)
            try {
                let response = await axios.put(`${path}`,detail)
                this.$parent.show_alert = await "success";
                await this.fetchData();
                await this.$store.dispatch('fetchRequest');
                await this.$emit('fetchRequest');
            } catch (error) {
                
            }
            
            
            this.ensure_dialog = await false;
            this.consider_dialog = await false;
            this.approve_dialog = await false;
            this.operate_dialog = await false;
            this.follow_dialog = await false;
            this.check_dialog = await false;
        },
        getThaiDate(item){
            if (item){
                var locale = window.navigator.userLanguage || window.navigator.language;
                var d = new Date(item);
            return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric'});
            }else{
                return "";
            }
        },
        getThaiDateTime(item){
            if (item){
                var locale = window.navigator.userLanguage || window.navigator.language;
                var d = new Date(item);
            return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'});
            }else{
                return "";
            }
        },
        // getThaiDate(item){
        //     if (item){
        //         var d = new Date(item);
        //     return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
        //     }else{
        //         return "";
        //     }            
        // },
    }
}
</script>

<style scoped>
.v-input--radio-group .v-input--radio-group--row{
    padding-top: 0px!important;
    margin-top: 0px!important;
}
.v-expansion-panel-header{
    padding-left: 5px!important;
    padding-right: 5px!important;
    font-size: 0.8rem;
}
.v-expansion-panel-content{
    font-size: 0.8rem;
}


</style>